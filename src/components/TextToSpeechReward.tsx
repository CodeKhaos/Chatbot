
import { CreateRedemptionRequest, useCreateRedemptionMutation } from "@/services/RewardState"
import { RealtimeChannel } from "ably"
import { useState } from "react"
import { Button, Col, Form, FormGroup, Row, Spinner} from "react-bootstrap"
import { handlePlay } from "./TextToSpeech"
import { getSpeechVoices } from "@/utils/SpeechSynth"

export type TextToSpeechRewardProps = {
    channel: RealtimeChannel
    forHandle: string
}

export const TextToSpeechReward = ({channel, forHandle}: TextToSpeechRewardProps) => {
    const [ttsMessage, setTTSMessage] = useState<string>()
    const [voice, setVoice] = useState<string>();
    const [pitch, setPitch] = useState<string>("1");
    const [rate, setRate] = useState<string>("1");
    const { mutate } = useCreateRedemptionMutation()
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false)    
    const synth = window.speechSynthesis;

    const onSubmit = () => {
        console.log("submit")
        if (!ttsMessage) return
        
        const reward: CreateRedemptionRequest = {
            userId: '', rewardId: "1",  pointCost: 25, redemptionDate: new Date(), type: 'tts', value: ttsMessage 
        }
        const rewardTTS =  {...reward, voice: voice, pitch: pitch, rate: rate, volume: 1}

        channel.publish('redemption' + '-' + forHandle, rewardTTS)
        createRedemption(reward)
        setBtnDisabled(true)
        setTTSMessage(undefined)
        setTimeout(() => {
            setBtnDisabled(false)
          }, 60000);
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
        u.volume = 0.75

        handlePlay(synth, u)
      }

        const voiceChanged = (newVoice:string) => {       
            const voices = window.speechSynthesis.getVoices();
            const synthVoice = voices.find((v) => v.name === newVoice);
            console.log(voices)
            setVoice(synthVoice ? synthVoice.name : voices[0].name)    
        }

    return (
        <div>
            <Form
                onSubmit={onSubmit}
                className='formControlFindChannel'>
                <Row>
                    <FormGroup 
                        as={Col} 
                        controlId="ttsMessage">
                        <Form.Control
                            value={ttsMessage}
                            role="formControlTTSMessage"
                            aria-label="TTS Message"
                            aria-describedby="basic-addon1"
                            placeholder='TTS Message'
                            onChange={(e) => setTTSMessage(e.target.value)}
                            as='textarea'
                            max='200'
                        />
                    </FormGroup>
                </Row>                
                <Row>
                    <FormGroup as={Col} controlId="voicePitch">
                            <Form.Label>Voice Pitch</Form.Label>
                            <Form.Range  
                                min={'0.5'} 
                                max={'2.0'} 
                                step={'0.1'}
                                onChange={(e) => setPitch(e.target.value)}/>
                        </FormGroup>
                    <FormGroup as={Col} controlId="voiceRate">
                        <Form.Label>Voice Rate</Form.Label>
                        <Form.Range 
                            min={'0.5'} 
                            max={'2.0'} 
                            step={'0.1'}
                            onChange={(e) => setRate(e.target.value)}/>
                    </FormGroup>                
                </Row>                
                <Row>
                    <FormGroup as={Col} controlId="voice">
                        <Form.Select 
                            aria-label="Set Voice" 
                            className="primarySelect"
                            value={voice}
                            onChange={(e) => voiceChanged(e.target.value)}>
                                {getSpeechVoices().map((voice) => (
                                    <option key={voice} value={voice}>
                                        {voice}
                                    </option>
                                ))}
                        </Form.Select>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup as={Col} controlId="voice">
                        <Button className="primaryButton" role="sendTTSMessage" disabled={!synth && btnDisabled} type='submit'>
                            Redeem TTS {btnDisabled && <Spinner size="sm" /> } 
                        </Button>
                        <Button className="primaryButton" role="testTTSMessage" onClick={testTTSMessage}>Test TTS</Button>
                    </FormGroup>
                </Row>
            </Form>
            {/* <Form
                onSubmit={ onSubmit.bind( this ) }      
                className='formControlFindChannel'>
                <FormGroup controlId="formControlTTSMessage">
                    <Form.Control
                        value={ttsMessage}
                        role="formControlTTSMessage"
                        aria-label="TTS Message"
                        aria-describedby="basic-addon1"
                        placeholder='TTS Message'
                        onChange={(e) => setTTSMessage(e.target.value)}
                        as='textarea'
                        max='200'
                    />
                </FormGroup>

                <FormGroup controlId="voicePitch">
                    <Form.Label>Voice Pitch</Form.Label>
                    <Form.Range  min={'0.5'} max={'2.0'} step={'0.1'}
                        onChange={(e) => setPitch(e.target.value)}/>
                </FormGroup>
                
                <FormGroup controlId="voiceRate">
                    <Form.Label>Voice Rate</Form.Label>
                    <Form.Range min={'0.5'} max={'2.0'} step={'0.1'}
                        onChange={(e) => setRate(e.target.value)}/>
                </FormGroup>
                
                <FormGroup controlId="voice">
                    <Form.Select aria-label="Set Voice" className="primarySelect"
                        onChange={(e) => voiceChanged(e.target.value)}>
                            {voices && voices.map((voice) => (
                                <option key={voice.name} value={voice.name}>
                                    {voice.name}
                                </option>
                            ))}
                    </Form.Select>
                </FormGroup>
                <Button className="primaryButton" role="sendTTSMessage" disabled={btnDisabled} type='submit'>
                    Redeem TTS {btnDisabled && <Spinner size="sm" /> } 
                </Button>
                <Button className="primaryButton" role="testTTSMessage" onClick={testTTSMessage}>Test TTS</Button>
            </Form> */}
        </div>
    )
}
