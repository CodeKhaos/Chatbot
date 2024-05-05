//import { CreateRedemptionRequest, CreateRedemptionResponse, CreateRewardRequest, CreateRewardResponse } from "./RewardState";
//import server  from './../../server/server.js'

export type Reward = {
    id: string,
    name: string,
    description: string
}
export type Redemption = {
    userId: string,
    rewardId: string,
    redemptionDate: Date,
    pointCost: number,
}
export type GetRewardsListResponse = Reward[]
export type GetRedemptionListResponse = Redemption[]

//const BASE_URL = 'http://localhost:5050/'

// export const getRewards = async (): Promise<Reward> => {
//     return (await server.get(BASE_URL + 'rewards')).data
// }

// export const getRewardsList = async (): Promise<GetRewardsListResponse> => {
// const res = (await server.get(BASE_URL+ 'rewards')).data
// return res satisfies GetRewardsListResponse as GetRewardsListResponse
// }

// export const createReward = async (request: CreateRewardRequest): Promise<CreateRewardResponse> => {
//     const data = (await server.post(BASE_URL + 'rewards', request))
//         .data satisfies CreateRewardResponse as CreateRewardResponse
//         return data
// }

// export const getRedemptionList = async (): Promise<GetRedemptionListResponse> => {
// const res = (await server.get(BASE_URL+ 'redemptions')).data
// return res satisfies GetRedemptionListResponse as GetRedemptionListResponse
// }


// export const createRedemption = async (request: CreateRedemptionRequest): Promise<CreateRedemptionResponse> => {
//     const data = (await server.post(BASE_URL + 'redemptions', request))
//         .data satisfies CreateRedemptionResponse as CreateRedemptionResponse
//         return data
// }