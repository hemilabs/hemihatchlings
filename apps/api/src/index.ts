import { GetHatchlingStageService } from './application/GetHatchlingStage/GetHatchlingStageService'
import { Web3HatchlingRepository } from './infrastructure/repositories/Web3HatchlingRepository'
import { ExpressServer } from './presentation/ExpressServer'
import { GetHatchlingStageRoute } from './presentation/routes/GetHatchlingStageRoute'

// Repositories
const hatchlingRepository = new Web3HatchlingRepository()

// Services
const getHatchlingService = new GetHatchlingStageService(hatchlingRepository)

// Routes
const getHatchlingRoute = new GetHatchlingStageRoute(getHatchlingService)

const server = new ExpressServer([
  getHatchlingRoute.router
])

const startServer = async (): Promise<void> => {
  await server.start()
}

const stopServer = async (): Promise<void> => {
  await server.stop()
}

process.on('SIGTERM', async () => {
  await stopServer()
})

process.on('SIGINT', async () => {
  await stopServer()
})

startServer()
