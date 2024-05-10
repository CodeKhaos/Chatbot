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

  const synth = window.speechSynthesis;
  
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

        const u = new SpeechSynthesisUtterance( message.data.text);
        
        const voices = window.speechSynthesis.getVoices();
        const synthVoice = voices.find((v) => v.name ===  message.data.voice);
        
        u.voice = synthVoice ? synthVoice : voices[0]
        u.pitch = parseFloat(( message.data.pitch ||  message.data.pitch !== '') ?  message.data.pitch : "1")
        u.rate = parseFloat(( message.data.rate ||  message.data.rate !== '') ?  message.data.rate : "1")
        u.volume = parseFloat(( message.data.volume ||  message.data.volume !== '') ?  message.data.volume : ".5")

        handlePlay(synth, u)

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