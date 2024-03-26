import axios, { AxiosInstance } from 'axios'
import { HatchlingRepository } from '../domain/repositories/HatchlingRepository'
import { Hatchling, HatchlingFactory, Stage, TransactionHash } from '@hemihatchlings/shared'

export class AxiosHatchlingRepository implements HatchlingRepository {
  private storageKey = 'hatchling'
  private readonly api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 3000
    })
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
