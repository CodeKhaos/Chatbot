import { useParams } from "react-router-dom"

import { useChannel } from "ably/react";
import { TextToSpeechReward } from "@/components/TextToSpeechReward";


export const Rewards = () => {
  const params = useParams()

   // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
   const { channel } = useChannel('rewards', 'redemption', (message) => {
      console.log('useChannel Callback -', message)
    });

    return (
        <>
            <h1>Rewards for {params.forHandle}</h1>
                <TextToSpeechReward channel={channel}></TextToSpeechReward>
        </>
    )
}