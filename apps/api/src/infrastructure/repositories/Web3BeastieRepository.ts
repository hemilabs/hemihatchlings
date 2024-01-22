import Web3 from 'web3'
import { Beastie } from '../../domain/entities/Beastie'
import { BeastieFactory } from '../../domain/factories/BeastieFactory'
import { BeastieRepository } from '../../domain/repositories/BeastieRepository'
import { TransactionHash } from '../../domain/valueObjects/TransactionHash'
import { TransactionStatusEnum } from '../../domain/enums/TransactionStatusEnum'

export class Web3BeastieRepository implements BeastieRepository {
  private web3: Web3

  constructor() {
    this.web3 = new Web3(process.env['RPC_URL'])
  }

  async findByTransaction(transactionHash: TransactionHash): Promise<Beastie | null> {
    let block = null
    let transactionStatus = TransactionStatusEnum.Minted

    const transaction = await this.web3.eth.getTransaction(transactionHash.value)

    if (transaction == null) {
      return null
    }

    if (this.transactionReachedEthFinality(transaction)) {
      transactionStatus = TransactionStatusEnum.EthFinality
    }

    if (transaction.blockNumber != null) {
      block = await this.web3.eth.getBlock(transaction.blockNumber)
    }

    if (block != null && this.transactionReachedBtcFinality(block)) {
      transactionStatus = TransactionStatusEnum.BtcFinality
    }

    return BeastieFactory.create({
      account: transaction.from,
      transactionHash: transaction.hash,
      transactionStatus
    })
    
  }

  private transactionReachedEthFinality(transaction: any): boolean {    
    return transaction.blockNumber != null
  }

  /*
    We are faking the BTC finality check here because
    we don't have an endpoint to check that on the BVM yet
  */
  private transactionReachedBtcFinality(block: any): boolean {
    const timestamp = parseInt(block.timestamp)
    const blockDate = new Date(timestamp * 1000)
    const now = new Date()

    const diffInMinutes = (now.getTime() - blockDate.getTime()) / 60000

    return diffInMinutes > 100
  }
}
