
import { CreateRedemptionRequest } from "@/services/RewardState"
import { RealtimeChannel } from "ably"
import { useEffect, useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { handlePlay } from "./TextToSpeech"

type TextToSpeechRewardProps = {
    channel: RealtimeChannel
}
export const TextToSpeechReward = ({channel}: TextToSpeechRewardProps) => {
    const [ttsMessage, setTTSMessage] = useState<string>()
    const [voice, setVoice] = useState<string>("Microsoft David - English (United States)");
    const [pitch, setPitch] = useState<string>("1");
    const [rate, setRate] = useState<string>("1");
    const [volume, setVolume] = useState<string>("1");
    //const { mutate } = useCreateRedemptionMutation()

    useEffect(() => {
        const synth = window.speechSynthesis;    
        synth.getVoices();
    }, [])
    

    const sendTTSMessage = () => {
        if (!ttsMessage) return
        const reward: CreateRedemptionRequest = {
            userId: '', rewardId: "1",  pointCost: 25, redemptionDate: new Date(), type: 'tts', value: ttsMessage 
        }
        console.log('Sending Message - ', {...reward, voice: voice, pitch: pitch, rate: rate, volume: volume})
        channel.publish('redemption', {...reward, voice: voice, pitch: pitch, rate: rate, volume: volume})
    }

      const testTTSMessage = () => {
        if (!ttsMessage) return
                   
        handlePlay(ttsMessage, voice, pitch, rate, volume)
      }

        const voiceChanged = (newVoice:string) => {       
            const voices = window.speechSynthesis.getVoices();
            const synthVoice = voices.find((v) => v.name === newVoice);
            console.log(voices)
            setVoice(synthVoice ? synthVoice.name : voices[0].name)    
        }
    return (
        <InputGroup className="formControlFindChannel">
            <Form.Control
                role="formControlTTSMessage"
                aria-label="TTS Message"
                aria-describedby="basic-addon1"
                placeholder='TTS Message'
                onChange={(e) => setTTSMessage(e.target.value)}
                as='textarea'
            />

            <Form.Label>Voice Pitch</Form.Label>
            <Form.Range min={'0.5'} max={'2.0'} step={'0.1'}
                onChange={(e) => setPitch(e.target.value)}/>
                <Form.Label>Voice Rate</Form.Label>
            <Form.Range min={'0.5'} max={'2.0'} step={'0.1'}
                onChange={(e) => setRate(e.target.value)}/>
            <Form.Label>Voice Volume</Form.Label>
            <Form.Range min={'0.2'} max={'1.0'} step={'0.1'}
                onChange={(e) => setVolume(e.target.value)}/>
            <Form.Select aria-label="Set Voice" 
                onChange={(e) => voiceChanged(e.target.value)}>
                    {window.speechSynthesis.getVoices().map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {voice.name}
                        </option>
                    ))}
            </Form.Select>
            <Button role="sendTTSMessage" onClick={sendTTSMessage}>Redeem TTS Message</Button>
            <Button role="testTTSMessage" onClick={testTTSMessage}>Test TTS</Button>
        </InputGroup>
    )
}
