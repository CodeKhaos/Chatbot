import { useParams } from "react-router-dom"

import { useChannel } from "ably/react";
import { handlePlay } from "@/components/TextToSpeech";
import { useState } from "react";
import { rewardTTS } from "@/types/rewardTTS";

export const Redemptions = () => {  
  const params = useParams()
  const [message, setMessage] = useState<rewardTTS>()
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)

  const channelName = 'redemption' + (params.forHandle ? '-' + params.forHandle : '')
  useChannel('rewards', channelName, (message) => {
    console.log(message.data.type + ' - ' + message.data.value)
    if (message.data.type === 'tts') {
        console.log('Message Received - ', message.data)
        setMessage(message.data)
        // is speaking
        setIsSpeaking(true)
        handlePlay(message.data.value, message.data.voice, message.data.pitch, message.data.rate, message.data.volume)    
        setTimeout(() => {
          console.log("Timeout")
          setIsSpeaking(false)}, 5000)
    }
  });

  if (!message) return (<></>)
    return (
        <>
        {isSpeaking && 
                  <div>
                    <h1>Rewards Redeemed for {params.forHandle}</h1>
                    <h3>by: {message!.userId}</h3> 
                    <span>{message!.value}</span>
                  </div>
}
        </>
    )
}