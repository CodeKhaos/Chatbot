import { redemptionQueryKeys, rewardQueryKeys } from "@/services/queryKeys";
import {  UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRewardsList, createReward, createRedemption, getRedemptionList } from "./RewardApi";

type UseRewardQueryOptions = {
    staleTime?: number
    refetchInterval?: number | false
    throwOnError?: boolean | ((error: Error) => boolean)
}
export const useRewardListQuery = () => 
    useQuery({
        queryKey: rewardQueryKeys.list(),
        queryFn: getRewardsList,
    })

    export const useRedemptionListQuery = () => 
        useQuery({
            queryKey: redemptionQueryKeys.list(),
            queryFn: getRedemptionList,
        })
    
export type CreateRewardRequest = {
    name: string
    description: string
}

export type CreateRewardResponse = {
    id: string
    name: string
    description: string
}

export type CreateRedemptionRequest = {
    userId: string,
    rewardId: string,
    redemptionDate: Date,
    pointCost: number,    
    type: string,
    value: string
}

export type CreateRedemptionResponse = {
    id: string
    userId: string,
    rewardId: string,
    redemptionDate: Date,
    pointCost: number,    
    type: string,
    value: string
}

export type UseCreateRewardMutateVariables = CreateRewardRequest

export type UseCreateRewardMutationResult = UseMutationResult<
CreateRewardResponse,
Error,
UseCreateRewardMutateVariables,
unknown>

export type UseCreateRedemptionMutateVariables = CreateRedemptionRequest

export type UseCreateRedemptionMutationResult = UseMutationResult<
CreateRedemptionResponse,
Error,
UseCreateRedemptionMutateVariables,
unknown>


export const useCreateRewardMutation = (): UseCreateRewardMutationResult => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (vars: UseCreateRewardMutateVariables) => createReward(vars),
        onSuccess: (response: CreateRewardResponse) => {            
            queryClient.setQueryData(rewardQueryKeys.reward(response.id), response)
            void queryClient.invalidateQueries({queryKey: rewardQueryKeys.list()})
        }
    })
}


export const useCreateRedemptionMutation = (): UseCreateRedemptionMutationResult => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (vars: UseCreateRedemptionMutateVariables) => createRedemption(vars),
        onSuccess: (response: CreateRedemptionResponse) => {            
            queryClient.setQueryData(rewardQueryKeys.reward(response.id), response)
            void queryClient.invalidateQueries({queryKey: rewardQueryKeys.list()})
        }
    })
}