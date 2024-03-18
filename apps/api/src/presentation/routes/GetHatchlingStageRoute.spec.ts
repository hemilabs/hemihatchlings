import { describe, it, expect, vi } from 'vitest'
import { GetHatchlingStageRoute } from './GetHatchlingStageRoute'
import { HatchlingRepository } from '../../domain/repositories/HatchlingRepository'
import { GetHatchlingStageService } from '../../application/GetHatchlingStage/GetHatchlingStageService'

describe('src/presentation/routes/GetHatchlingStageRoute', () => {
  it('should be defined', () => {
    expect(GetHatchlingStageRoute).toBeDefined()
  })

  it('should add the GET /hatchling route', () => {
    const hatchlingRepository: HatchlingRepository = {
      getStage: vi.fn()
    }
    const getHatchlingService = new GetHatchlingStageService(hatchlingRepository)
    const getHatchlingRoute = new GetHatchlingStageRoute(getHatchlingService)
    const routeAdded = getHatchlingRoute.router.stack[0].route

    expect(routeAdded.path).toBe('/hatchling/:hash/stage')
    expect(routeAdded.methods.get).toBeTruthy()
  })
})
