import { ValueObject } from '@bitbeasties/shared'
import { InvalidStageError } from '../errors/InvalidStageError'
import { StageEnum } from '../enums/StageEnum'

interface StageProps {
  value: StageEnum
}

export class Stage extends ValueObject<StageProps> {
  private constructor(stage: StageEnum) {
    super({ value: stage })
  }

  static create(stage: StageEnum): Stage {
    if (typeof stage !== 'string' ||
      !Object.values(StageEnum).includes(stage)) {
      throw new InvalidStageError()
    }

    return new Stage(stage)
  }

  get value(): string {
    return this.props.value
  }
}
