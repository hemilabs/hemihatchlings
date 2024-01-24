import React from 'react'
import {
  AxiosBeastieRepository
} from '../infrastructure/AxiosBeastieRepository'
import { GetBeastieService } from '../application/GetBeastie/GetBeastieService'

export interface ServicesContext {
  getBeastieService: GetBeastieService
}

const beastieRepository = new AxiosBeastieRepository()

const getBeastieService =
  new GetBeastieService(beastieRepository)

export const defaultValue = {
  getBeastieService
}

export const servicesContext =
  React.createContext<ServicesContext>(defaultValue)
