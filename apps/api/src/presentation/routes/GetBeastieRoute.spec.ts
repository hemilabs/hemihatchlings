import { describe, it, expect, vi } from 'vitest'
import { GetBeastieRoute } from './GetBeastieRoute'
import { GetBeastieService } from '../../application/GetBeastie/GetBeastieService'
import { BeastieRepository } from '../../domain/repositories/BeastieRepository'

describe('src/presentation/routes/GetBeastieRoute', () => {
  it('should be defined', () => {
    expect(GetBeastieRoute).toBeDefined()
  })

  it('should add the GET /beastie route', () => {
    const beastieRepository: BeastieRepository = {
      findByTransaction: vi.fn()
    }
    const getBeastieService = new GetBeastieService(beastieRepository)
    const getBeastieRoute = new GetBeastieRoute(getBeastieService)
    const routeAdded = getBeastieRoute.router.stack[0].route

    expect(routeAdded.path).toBe('/beastie')
    expect(routeAdded.methods.get).toBeTruthy()
  })
})
