import { Router, Request, Response } from 'express'
import { handleError } from '../helpers/ErrorHandler'
import { GetHatchlingStageService } from '../../application/GetHatchlingStage/GetHatchlingStageService'
import { GetHatchlingStageRequestDto } from '../../application/GetHatchlingStage/GetHatchlingStageDtos'

export class GetHatchlingStageRoute {
  private readonly route = Router()
  private readonly getHatchlingStageService: GetHatchlingStageService

  constructor(getHatchlingStageService: GetHatchlingStageService) {
    this.getHatchlingStageService = getHatchlingStageService
    this.buildRoute()
  }

  get router(): Router {
    return this.route
  }

  private buildRoute(): void {
    this.route.get('/hatchling/:hash/stage', async (req: Request, res: Response) => {
      try {
        const requestDto = this.getDtoFromRequest(req)
        const stage = await this.getHatchlingStageService.execute(requestDto)

        return res.status(200).send(stage)
      } catch (error) {
        return handleError(error, res)
      }
    })
  }

  private getDtoFromRequest(req: Request): GetHatchlingStageRequestDto {
    return {
      transactionHash: req.params['hash']?.toString() ?? '',
    }
  }
}
