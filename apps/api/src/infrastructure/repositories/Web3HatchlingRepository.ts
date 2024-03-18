import Web3 from 'web3'
import { HatchlingRepository } from '../../domain/repositories/HatchlingRepository'
import {
  HatchlingFactory,
  Stage,
  TransactionHash,
  TransactionStatusEnum
} from '@hemihatchlings/shared'

export class Web3HatchlingRepository implements HatchlingRepository {
  private web3: Web3

  constructor() {
    this.web3 = new Web3(process.env['RPC_URL'])
  }

  async getStage(transactionHash: TransactionHash): Promise<Stage | null> {
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

    const hatchling = HatchlingFactory.create({
      account: transaction.from,
      transactionHash: transaction.hash,
      transactionStatus
    })

    return hatchling.stage
    
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

    console.log(`diffInMinutes: ${diffInMinutes}`)
    return diffInMinutes > 100
  }
}
