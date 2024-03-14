import React from 'react'
import {
  AxiosHatchlingRepository
} from '../infrastructure/AxiosHatchlingRepository'
import { GetHatchlingStageService } from '../application/GetHatchlingStage/GetHatchlingStageService'
import { ConnectWalletService } from '../application/ConnectWallet/ConnectWalletService'
import { EthersWalletRepository } from '../infrastructure/EthersWalletRepository'
import { MintNFTService } from '../application/MintNFT/MintNFTService'

export interface ServicesContext {
  getHatchlingStageService: GetHatchlingStageService,
  connectWalletService: ConnectWalletService
  mintNFTService: MintNFTService
}

const hatchlingRepository = new AxiosHatchlingRepository()
const walletRepository = new EthersWalletRepository()

const getHatchlingStageService =
  new GetHatchlingStageService(hatchlingRepository)
const connectWalletService =
  new ConnectWalletService(walletRepository)
const mintNFTService =
  new MintNFTService(walletRepository)


export const defaultValue = {
  getHatchlingStageService,
  connectWalletService,
  mintNFTService
}

export const servicesContext =
  React.createContext<ServicesContext>(defaultValue)
