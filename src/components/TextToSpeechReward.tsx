
import { CreateRedemptionRequest, useCreateRedemptionMutation } from "@/services/RewardState"
import { RealtimeChannel } from "ably"
import { useEffect, useState } from "react"
import { Button, Form, InputGroup, Spinner } from "react-bootstrap"
import { handlePlay } from "./TextToSpeech"

export type TextToSpeechRewardProps = {
    channel: RealtimeChannel
    forHandle: string
}
export const TextToSpeechReward = ({channel, forHandle}: TextToSpeechRewardProps) => {
    const [ttsMessage, setTTSMessage] = useState<string>()
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>();
    const [voice, setVoice] = useState<string>("Microsoft David - English (United States)");
    const [pitch, setPitch] = useState<string>("1");
    const [rate, setRate] = useState<string>("1");
    //const [volume, setVolume] = useState<string>("1");
    const { mutate } = useCreateRedemptionMutation()
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false)    
    
    const synth = window.speechSynthesis;

    useEffect(() => { 
        setVoices(synth.getVoices());
    }, [])

    const sendTTSMessage = () => {
        if (!ttsMessage) return
        const reward: CreateRedemptionRequest = {
            userId: '', rewardId: "1",  pointCost: 25, redemptionDate: new Date(), type: 'tts', value: ttsMessage 
        }
        const rewardTTS =  {...reward, voice: voice, pitch: pitch, rate: rate, volume: 1}

        channel.publish('redemption' + '-' + forHandle, rewardTTS)
        createRedemption(reward)
        setBtnDisabled(true)

        setTimeout(() => {
            setBtnDisabled(false)
          }, 10000);
    } 
    
    const createRedemption = (data: CreateRedemptionRequest) => {
        mutate(data, {
          onSuccess: (data: any) => {
            console.log("Reward Redeemed", data)
          }
        })    
      }

      const testTTSMessage = () => {
        if (!ttsMessage) return

        const u = new SpeechSynthesisUtterance(ttsMessage);
        
        const voices = window.speechSynthesis.getVoices();
        const synthVoice = voices.find((v) => v.name ===  voice);
        
        u.voice = synthVoice ? synthVoice : voices[0]
        u.pitch = parseFloat(( pitch ||  pitch !== '') ?  pitch : "1")
        u.rate = parseFloat((rate ||  rate !== '') ?  rate : "1")
        u.volume = 1

        handlePlay(synth, u)
      }

        const voiceChanged = (newVoice:string) => {       
            const voices = window.speechSynthesis.getVoices();
            const synthVoice = voices.find((v) => v.name === newVoice);
            console.log(voices)
            setVoice(synthVoice ? synthVoice.name : voices[0].name)    
        }

    return (
        <InputGroup className="formControlFindChannel">
        <div>
            <Form.Control
                role="formControlTTSMessage"
                aria-label="TTS Message"
                aria-describedby="basic-addon1"
                placeholder='TTS Message'
                onChange={(e) => setTTSMessage(e.target.value)}
                as='textarea'
                max='200'
            />
            <Form.Label>Voice Pitch</Form.Label>
            <Form.Range min={'0.5'} max={'2.0'} step={'0.1'}
                onChange={(e) => setPitch(e.target.value)}/>
                <Form.Label>Voice Rate</Form.Label>
            <Form.Range min={'0.5'} max={'2.0'} step={'0.1'}
                onChange={(e) => setRate(e.target.value)}/>
            <Form.Select aria-label="Set Voice" className="primarySelect"
                onChange={(e) => voiceChanged(e.target.value)}>
                    {voices && voices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {voice.name}
                        </option>
                    ))}
            </Form.Select>
            
            <Button className="primaryButton" role="sendTTSMessage" disabled={btnDisabled} onClick={sendTTSMessage}>
                Redeem TTS {btnDisabled && <Spinner size="sm" /> } 
            </Button>
            <Button className="primaryButton" role="testTTSMessage" onClick={testTTSMessage}>Test TTS</Button>
       
            </div>
        </InputGroup>
    )
}
