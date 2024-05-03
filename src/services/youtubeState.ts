import { YoutubeChannel } from "@/types/YoutubeChannel"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getYoutubeChannel } from "./YoutubeApi"
import { produce } from "immer"


type UseUpdateYoutubeChannelMutation = {
  accessToken: string,
  forHandle: string,
  mine: boolean,
}
export const useUpdateYoutubeChannelMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (vars: UseUpdateYoutubeChannelMutation) => getYoutubeChannel(vars.accessToken, vars.forHandle, vars.mine),
    // When mutate is called:
    onSuccess: async (newYoutubeChannel: YoutubeChannel) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['youtubeChannels', newYoutubeChannel.id] })
  
      // Snapshot the previous value
      queryClient.getQueryData(['youtubeChannels', newYoutubeChannel.id])
  
      // Optimistically update to the new value
      queryClient.setQueryData<YoutubeChannel>(['youtubeChannels', newYoutubeChannel.id], (oldData) => {
          if (!oldData) return
          return produce(oldData, () => {
            //draft = oldData
          })
      })
    },
  })
}