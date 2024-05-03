import { useParams } from "react-router-dom"
import { Button, } from "react-bootstrap"
import { CreateRedemptionRequest, useRewardListQuery } from "@/services/RewardState";
import { Reward } from "@/services/RewardApi";

import { useState } from "react";
import { useChannel } from "ably/react";
import { TextToSpeechReward } from "@/components/TextToSpeechReward";


export const Rewards = () => {
  const params = useParams()
  const [ttsMessage] = useState('')

  const {data } = useRewardListQuery()

   // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
   const { channel } = useChannel('rewards', 'redemption', (message) => {
      console.log('useChannel Callback -', message)
    });
  
  const sendCreateRedemptionMessage = (rewardId: string) => {
    const reward: CreateRedemptionRequest = {
      userId: '', rewardId: rewardId,  pointCost: 25, redemptionDate: new Date(), type: 'tts', value: ttsMessage 
    }
    console.log('Sending Message - ',reward)
    channel.publish('redemption', reward)
  }
  const getSortedRewards = (): Reward[]  => {
    if(!data) return new Array<{id: string, name: string, description: string}>()
    data.sort((a, b) => a.name.localeCompare(b.name))
    return data
  }

    return (
        <>
            <h1>Rewards for {params.forHandle}</h1>
                <TextToSpeechReward channel={channel}></TextToSpeechReward>
            {getSortedRewards().map((reward, idx) => {
                return (<Button key={idx} onClick={() => sendCreateRedemptionMessage(reward.id)}>{reward.name}</Button>)
            })} 
            
          
        </>
    )
}