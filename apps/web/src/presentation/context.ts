import React from 'react'
import {
  AxiosBeastieRepository
} from '../infrastructure/AxiosBeastieRepository'
import { GetBeastieService } from '../application/GetBeastie/GetBeastieService'
import { ConnectWalletService } from '../application/ConnectWallet/ConnectWalletService'
import { EthersWalletRepository } from '../infrastructure/EthersWalletRepository'
import { MintNFTService } from '../application/MintNFT/MintNFTService'

export interface ServicesContext {
  getBeastieService: GetBeastieService,
  connectWalletService: ConnectWalletService
  mintNFTService: MintNFTService
}

const beastieRepository = new AxiosBeastieRepository()
const walletRepository = new EthersWalletRepository()

const getBeastieService =
  new GetBeastieService(beastieRepository)
const connectWalletService =
  new ConnectWalletService(walletRepository)
const mintNFTService =
  new MintNFTService(walletRepository)


export const defaultValue = {
  getBeastieService,
  connectWalletService,
  mintNFTService
}

export const servicesContext =
  React.createContext<ServicesContext>(defaultValue)
