import { DomainError } from '@hemihatchlings/shared'
import { Response } from 'express'

export const handleError = (error: any, res: Response): Response => {
  if (error instanceof DomainError && error.exposable) {
    return res.status(400).send({
      code: error.code
    })
  }

  console.dir(error)

  return res.status(500).send({
    code: 'INTERNAL_SERVER_ERROR'
  })
}
