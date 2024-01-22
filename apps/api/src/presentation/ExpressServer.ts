/* eslint-disable no-console */
import express, { Express, Router } from 'express'
import { json } from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import { Server } from 'http'

export class ExpressServer {
  app: Express
  server: Server | null = null
  port = process.env['PORT'] ?? 3000

  constructor(routers: Router[]) {
    this.app = express()

    this.app.use(helmet())
    this.app.use(cors())
    this.app.use(json())

    routers.forEach(router => this.app.use(router))
  }

  start(): void {
    this.server = this.app.listen(this.port, () => {
      console.info(`Bit Beasties API | Listening on Port ${this.port}`)
    })
  }

  async stop(): Promise<void> {
    console.info('Bit Beasties API | Closing HTTP Server')

    return await new Promise((resolve, reject) => {
      this.server?.close((error) => {
        if (error) {
          console.error(
            `Bit Beasties API | Error Closing HTTP Server: ${error.message}`)
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }
}
