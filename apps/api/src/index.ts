import { Web3BeastieRepository } from './infrastructure/repositories/Web3BeastieRepository'
import { GetBeastieService } from './application/GetBeastie/GetBeastieService'
import { GetBeastieRoute } from './presentation/routes/GetBeastieRoute'
import { ExpressServer } from './presentation/ExpressServer'

// Repositories
const beastieRepository = new Web3BeastieRepository()

// Services
const getBeastieService = new GetBeastieService(beastieRepository)

// Routes
const getBeastieRoute = new GetBeastieRoute(getBeastieService)

const server = new ExpressServer([
  getBeastieRoute.router
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
