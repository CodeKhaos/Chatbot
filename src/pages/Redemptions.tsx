import { useParams } from "react-router-dom"

import { useChannel } from "ably/react";
import { handlePlay } from "@/components/TextToSpeech";
import { useEffect, useState } from "react";
import { rewardTTS } from "@/types/rewardTTS";

import '@/Redemptions.css'

export const Redemptions = () => {  
  const params = useParams()
  const [message, setMessage] = useState<rewardTTS>()
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)

  useEffect(() => {    
    document.getElementsByTagName("html")[0]!.className = "redemption"
  })

  const channelName = 'redemption' + (params.forHandle ? '-' + params.forHandle : '')
  useChannel('rewards', channelName, (message) => {
    if (message.data.type === 'tts') {
        console.log('Message Received - ', message.data)
        setMessage(message.data)
        // is speaking
        setIsSpeaking(true)
        handlePlay(message.data.value, message.data.voice, message.data.pitch, message.data.rate, message.data.volume)    
        setTimeout(() => {
          console.log("Timeout")
          setIsSpeaking(false)          
        }, 5000)
    }
  });

  if (!message) return (<></>)
    return (
        <>
        {isSpeaking && 
          <div className={'redemptionBackground'}>
            <h3 className={'redemptionText'}>{message!.value}</h3>
          </div>}
        </>
    )
}