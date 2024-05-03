import { youtubeQueryKeys } from "@/services/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getYoutubeChannel } from "./YoutubeApi";

type UseYoutubeChannelQueryOptions = {
    staleTime?: number
    refetchInterval?: number | false
    throwOnError?: boolean | ((error: Error) => boolean)
}
export const useYoutubeChannelQuery = (accessToken: string, forHandle: string, mine?: boolean, options?: UseYoutubeChannelQueryOptions) => 
    useQuery({
        queryKey: youtubeQueryKeys.youtubeChannel(forHandle),
        queryFn: () => getYoutubeChannel(accessToken, forHandle, mine),
        ...options,
    })

