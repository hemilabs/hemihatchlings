import React from 'react'
import {
  AxiosHatchlingRepository
} from '../infrastructure/AxiosHatchlingRepository'
import { FindHatchlingService } from '../application/FindHatchling/FindHatchlingService'
import { CreateHatchlingService } from '../application/CreateHatchling/CreateHatchlingService'
import { EthersWalletRepository } from '../infrastructure/EthersWalletRepository'

export interface ServicesContext {
  findHatchlingService: FindHatchlingService,
  createHatchlingService: CreateHatchlingService
}

const hatchlingRepository = new AxiosHatchlingRepository()
const walletRepository = new EthersWalletRepository()

const findHatchlingService =
  new FindHatchlingService(hatchlingRepository)
const createHatchlingService =
  new CreateHatchlingService(walletRepository, hatchlingRepository)

export const defaultValue = {
  findHatchlingService,
  createHatchlingService
}

export const servicesContext =
  React.createContext<ServicesContext>(defaultValue)
