import React from 'react'
import {
  AxiosBeastieRepository
} from '../infrastructure/AxiosBeastieRepository'
import { GetBeastieService } from '../application/GetBeastie/GetBeastieService'
import { ConnectWalletService } from '../application/ConnectWallet/ConnectWalletService'
import { EthersWalletRepository } from '../infrastructure/EthersWalletRepository'

export interface ServicesContext {
  getBeastieService: GetBeastieService,
  connectWalletService: ConnectWalletService
}

const beastieRepository = new AxiosBeastieRepository()
const walletRepository = new EthersWalletRepository()

const getBeastieService =
  new GetBeastieService(beastieRepository)
const connectWalletService =
  new ConnectWalletService(walletRepository)

export const defaultValue = {
  getBeastieService,
  connectWalletService
}

export const servicesContext =
  React.createContext<ServicesContext>(defaultValue)
