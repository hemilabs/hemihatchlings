import { expect, describe, it, vi } from 'vitest'
import { handleError } from './ErrorHandler'
import { DomainError } from '@bitbeasties/shared'

describe('src/presentation/helpers/ErrorHandler', () => {
  it('should be defined', () => {
    expect(handleError).toBeDefined()
  })

  describe('when error is an instance of DomainError and exposable is true', () => {
    const error = new DomainError('TEST_ERROR', true)
    const sendMock = vi.fn()

    const res = {
      status: vi.fn().mockReturnValue({
        send: sendMock
      })
    }

    // @ts-ignore
    handleError(error, res)

    it('should call Response status method with 400', () => {
      expect(res.status).toHaveBeenCalledWith(400)
    })

    it('should call Response send method with the error code', () => {
      expect(sendMock).toHaveBeenCalledWith({
        code: error.code
      })
    })
  })

  describe('when error is not an instance of DomainError or is not exposable', () => {
    const error = new Error('NOT_DOMAIN_ERROR')
    const sendMock = vi.fn()

    const res = {
      status: vi.fn().mockReturnValue({
        send: sendMock
      })
    }

    // @ts-expect-error
    handleError(error, res)

    it('should call Response status method with 500', () => {
      expect(res.status).toHaveBeenCalledWith(500)
    })

    it('should call Response send method with the INTERNAL_SERVER_ERROR code', () => {
      expect(sendMock).toHaveBeenCalledWith({
        code: 'INTERNAL_SERVER_ERROR'
      })
    })
  })
})
