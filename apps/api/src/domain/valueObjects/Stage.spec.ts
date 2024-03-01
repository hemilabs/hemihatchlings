import { describe, it, expect } from 'vitest'
import { ValueObject } from '@hemihatchlings/shared'
import { InvalidStageError } from '../errors/InvalidStageError'
import { Stage } from './Stage'
import { StageEnum } from '../enums/StageEnum'

describe('src/domain/valueObjects/Stage', () => {
  it('should be defined', () => {
    expect(Stage).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    const stage = Stage.create(StageEnum.Baby)

    expect(stage).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should throw an error if the stage is not a string', () => {
      const test = (): void => {
        // @ts-expect-error
        Stage.create(123)
      }

      expect(test).toThrowError(InvalidStageError)
    })

    it('should throw an error if the stage is not a valid', () => {
      const test = (): void => {
        // @ts-expect-error
        Stage.create('not-a-valid-stage')
      }

      expect(test).toThrowError(InvalidStageError)
    })

    it('should return a new Stage instance if the stage is valid', () => {
      const stage = Stage.create(StageEnum.Adolescent)

      expect(stage).toBeInstanceOf(Stage)
    })

    it('should set the stage in the value property', () => {
      const expectedStage = StageEnum.Adult
      const stage = Stage.create(expectedStage)

      expect(stage.value).toBe(expectedStage)
    })
  })
})
