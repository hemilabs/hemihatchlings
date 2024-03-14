import axios, { AxiosInstance } from 'axios'
import { HatchlingRepository } from '../domain/repositories/HatchlingRepository'
import { Stage, TransactionHash } from '@hemihatchlings/shared'

export class AxiosHatchlingRepository implements HatchlingRepository {
  private readonly api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 3000
    })
  }

  async getStage(transactionHash: TransactionHash): Promise<Stage | null> {
    const response = await this.api.get(
      `/hatchling/${transactionHash.value}/stage`
    )

    const { stage } = response.data
    
    if (stage == null) {
      return null
    }

    return Stage.create(stage)
  }
}
