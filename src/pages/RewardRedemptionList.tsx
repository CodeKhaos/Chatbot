import { useParams } from "react-router-dom"
import { useRedemptionListQuery } from "@/services/RewardState"
import { Redemption } from "@/services/RewardApi"
import { useChannel } from "ably/react"
import { handlePlay } from "@/components/TextToSpeech"

export const RewardRedemptionList = () => {  
  //const queryClient = useQueryClient()
  const params = useParams()
 // const { mutate } = useCreateRedemptionMutation()

  
  const channelName = 'redemption' + params.forHandle ? '-' + params.forHandle : ''
  useChannel('rewards', channelName, (message) => {
    console.log(message.data.type + ' - ' + message.data.value)
    if (message.data.type === 'tts') {
        console.log('Message Received - ', message.data)
        handlePlay(message.data.value, message.data.voice, message.data.pitch, message.data.rate, message.data.volume)
    }
  });

  // const getSortedRewards = (): Redemption[]  => {
  //   if(!data) return new Array<{userId: string, rewardId: string, pointCost: number, redemptionDate: Date}>()    
  //     data.sort((a: any, b: any) => (new Date(b.redemptionDate).getTime()) - new Date(a.redemptionDate).getTime() )
  //   return data
  // }

    return (
        <>
            <h1>Rewards Redeemed for {params.forHandle}</h1>
            {/* {getSortedRewards().map((reward, idx) => {
                return (<div key={idx}>{reward.rewardId + '(' + reward.pointCost + ')'}</div>)
            })} */}
        </>
    )
}