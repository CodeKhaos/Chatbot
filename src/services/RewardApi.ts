import { CreateRedemptionRequest, CreateRedemptionResponse, CreateRewardRequest, CreateRewardResponse } from './RewardState'
import axios from "axios"

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

const server = axios.create()
export const getRewards = async (): Promise<Reward> => {
     return (await server.get('/rewards')).data
 }
 export const getRewardsList = async (): Promise<GetRewardsListResponse> => {
 const res = (await server.get('/rewards')).data
 return res satisfies GetRewardsListResponse as GetRewardsListResponse
 }
 export const createReward = async (request: CreateRewardRequest): Promise<CreateRewardResponse> => {
     const data = (await server.post('/rewards', request))
         .data satisfies CreateRewardResponse as CreateRewardResponse
         return data
 }
 export const getRedemptionList = async (): Promise<GetRedemptionListResponse> => {
 const res = (await server.get('/redemptions')).data
 return res satisfies GetRedemptionListResponse as GetRedemptionListResponse
 }
 export const createRedemption = async (request: CreateRedemptionRequest): Promise<CreateRedemptionResponse> => {
     const data = (await server.post('/redemptions', request))
         .data satisfies CreateRedemptionResponse as CreateRedemptionResponse
         return data
 }