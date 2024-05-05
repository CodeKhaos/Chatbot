import { useParams } from "react-router-dom"
import { useRedemptionListQuery } from "@/services/RewardState"


import { useQueryClient } from "@tanstack/react-query";
import { useChannel, useConnectionStateListener } from "ably/react";
import { redemptionQueryKeys } from "@/services/queryKeys";
import { handlePlay } from "@/components/TextToSpeech";

export const RewardRedemption = () => {  
  const queryClient = useQueryClient()
  const params = useParams()
  useRedemptionListQuery()

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
    useChannel('rewards', 'redemption', (message) => {
    console.log(message.data.type + ' - ' + message.data.value)
    if (message.data.type === 'tts') {
        console.log('Message Received - ', message.data)
        handlePlay(message.data.value, message.data.voice, message.data.pitch, message.data.rate, message.data.volume)
       // createRedemption(message.data)
    }
        void queryClient.invalidateQueries({queryKey: redemptionQueryKeys.list()})
  });

  // const createRedemption = (data: CreateRedemptionRequest) => {
  //   mutate(data, {
  //     // onSuccess: (data) => {
  //     //   console.log("Reward Redeemed", data)
  //     // }
  //   })    
  // }

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });



  
    return (
        <>
            <h1>Rewards Redeemed for {params.forHandle}</h1>
           

        </>
    )
}