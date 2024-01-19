import { Router, Request, Response } from 'express'
import { handleError } from '../helpers/ErrorHandler'
import {
  GetBeastieService
} from '../../application/GetBeastie/GetBeastieService'
import { GetBeastieRequestDto } from '../../application/GetBeastie/GetBeastieDtos'

export class GetBeastieRoute {
  private readonly route = Router()
  private readonly getBeastieService: GetBeastieService

  constructor(getBeastieService: GetBeastieService) {
    this.getBeastieService = getBeastieService
    this.buildRoute()
  }

  get router(): Router {
    return this.route
  }

  private buildRoute(): void {
    this.route.get('/beastie', async (req: Request, res: Response) => {
      try {
        const requestDto = this.getDtoFromRequest(req)
        const beastie = await this.getBeastieService.execute(requestDto)

        return res.status(200).send(beastie)
      } catch (error) {
        return handleError(error, res)
      }
    })
  }

  private getDtoFromRequest(req: Request): GetBeastieRequestDto {
    return {
      account: req.query['account']?.toString() ?? '',
      transactionHash: req.query['hash']?.toString() ?? '',
    }
  }
}
