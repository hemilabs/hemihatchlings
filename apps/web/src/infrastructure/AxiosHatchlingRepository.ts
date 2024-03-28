import axios, { AxiosInstance } from 'axios'
import { HatchlingRepository } from '../domain/repositories/HatchlingRepository'
import { Hatchling, HatchlingFactory, Stage, TransactionHash } from '@hemihatchlings/shared'

export class AxiosHatchlingRepository implements HatchlingRepository {
  private storageKey = 'hatchling'
  private readonly api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: this.getApiUrl(),
      timeout: 3000
    })
  }

  getApiUrl() {
    const url = import.meta.env.VITE_API_URL
    if (!url) {
      throw new Error('VITE_API_URL is not defined')
    }
  
    // replaces ${host} with the host address ignoring spaces and tabs within the brackets
    const regex = /\$\{[ \t]*host[ \t]*\}/i 
    return url.replace(regex, document.location.host)
  }

  create(hatchling: Hatchling): void {
    const { account, transactionHash, stage, element } = hatchling

    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        account: account.value,
        transactionHash: transactionHash.value,
        stage: stage.value,
        element: element?.value
      })
    )
  }

  async find(): Promise<Hatchling | null> {
    const localHatchling = localStorage.getItem(this.storageKey)

    if(!localHatchling) {
      return null
    }

    let {
      account,
      transactionHash,
      stage,
      element
    } = JSON.parse(localHatchling)

    const response = await this.api.get(
      `/hatchling/${transactionHash}/stage`
    )

    if (response.data.stage != null) {
      stage = response.data.stage
    }

    return HatchlingFactory.createWithStage({
      account,
      transactionHash,
      element,
      stage
    })
  }
}
