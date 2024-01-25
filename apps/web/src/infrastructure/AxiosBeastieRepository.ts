import axios, { AxiosInstance } from 'axios'
import { Beastie } from '../domain/entities/Beastie'
import { BeastieRepository } from '../domain/repositories/BeastieRepository'

export class AxiosBeastieRepository implements BeastieRepository {
  private readonly api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 3000
    })
  }

  async find(account: string, transaction: string): Promise<Beastie | null> {
    const response = await this.api.get(
      `/beastie?account=${account}&hash=${transaction}`
    )

    const { transactionHash, stage } = response.data
    
    if (transactionHash == null) {
      return null
    }
  
    const beastie: Beastie = { account, transactionHash, stage }

    return beastie
  }
}
