import { describe, it, expect} from 'vitest'
import { RenderResult, render } from '@testing-library/react'
import StatusMessage from './StatusMessage'
import { StageEnum } from '@hemihatchlings/shared'

interface StatusMessageProps {
  stage: StageEnum
  account: string
  transactionHash: string
}

const renderComponent = ({
  stage, account, transactionHash
}:StatusMessageProps): RenderResult => {
    return render(
      <StatusMessage
        stage={stage}
        account={account}
        transactionHash={transactionHash} />
    )
  }

describe('src/presentation/StatusMessage', () => {
  const stage = StageEnum.Baby
  const account = '0x52908400098527886E0F7030069857D2E4169EE7'
  const transactionHash = '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'

  it('renders correctly', () => {
    const { asFragment } = renderComponent({ stage, account, transactionHash })

    expect(asFragment()).toMatchSnapshot()
  })
})
