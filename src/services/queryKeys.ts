export const youtubeQueryKeys = {
    all: ["youtubeChannel"] as const,
    youtubeChannel: (id: string) => [...youtubeQueryKeys.all, id] as const
}

export const rewardQueryKeys = {
    all: ['reward'] as const,
    list: () => [...rewardQueryKeys.all, 'list'] as const,
    reward: (id: string) => [...rewardQueryKeys.all, id] as const,
}

export const redemptionQueryKeys = {
    all: ['redemption'] as const,
    list: () => [...redemptionQueryKeys.all, 'list'] as const,
    redemption: (id: string) => [...redemptionQueryKeys.all, id] as const,
}