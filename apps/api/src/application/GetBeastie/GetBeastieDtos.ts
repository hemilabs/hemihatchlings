export interface GetBeastieRequestDto {
  account: string
  transactionHash: string
}

export interface GetBeastieResponseDto {
  account: string
  transactionHash: string
  stage: string
}
