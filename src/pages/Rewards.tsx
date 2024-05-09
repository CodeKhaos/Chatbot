import { useParams } from "react-router-dom"

import { useChannel } from "ably/react";
import { TextToSpeechReward } from "@/components/TextToSpeechReward";


export const Rewards = () => {
    const params = useParams()

    const channelName = 'redemption' + (params.forHandle ? '-' + params.forHandle : '')

    const { channel } = useChannel('rewards', channelName, () => {})

    return (
        <>
            <h1 role='rewardsHeader' className='pageHeader'>Rewards for {params.forHandle}</h1>
            <TextToSpeechReward channel={channel} forHandle={params.forHandle ? params.forHandle : ''}></TextToSpeechReward>
        </>
    )
}