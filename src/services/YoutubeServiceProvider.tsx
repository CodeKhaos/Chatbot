import { YoutubeChannel } from "@/types/YoutubeChannel"
import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react"
import { useQueryClient} from '@tanstack/react-query'

import { useYoutubeChannel } from "@/hooks/useYoutubeChannel"


export type YoutubeChannelData = {
    forHandle: string,
    youtubeChannel: YoutubeChannel
}

const nullContext = {
    data: undefined as YoutubeChannelData | undefined,
    clear: () => {},
}

type AddYoutubeChannelContext = typeof nullContext
const AddYoutubeChannelContext = createContext<AddYoutubeChannelContext>(nullContext)

// type useYoutubeChannelQueryOptions = {
//     staleTime? : number
//     refetchInterval?: number | false
//     throwOnErrors?: boolean | ((error: Error) => boolean)
// }


const updateQueryData = (
    // queryClient: QueryClient,
    // forHandle: string,
    // data: YoutubeChannelData | undefined,
    // setData: (_: SetStateAction<YoutubeChannelData | undefined>) => void,
    // youtubeChannel: YoutubeChannel
) => {
    // const addYoutubeChannelToQueryData = (addYoutubeChannel: YoutubeChannel) => {
    //     queryClient.setQueryData<YoutubeChannel>(youtubeQueryKeys.youtubeChannel(forHandle), (stateYoutubeChannel) => {
    //         if(!stateYoutubeChannel) return
    //         return produce(stateYoutubeChannel, (draft) => {
    //             draft = addYoutubeChannel
    //         })
    //     })
    // }

    // const removeYoutubeChannelToQueryData = () => {
    //     queryClient.setQueryData<YoutubeChannel>(youtubeQueryKeys.youtubeChannel(forHandle), (stateYoutubeChannel) => {
    //         if(!stateYoutubeChannel) return
    //         return produce(stateYoutubeChannel, (draft) => {
    //             draft = undefined as unknown as YoutubeChannel
    //         })
    //     })
    // }
}
    export type AddYoutubeChannelProviderProps = {
        accessToken: string
        forHandle: string
        mine: boolean
    }
    export const AddYoutubeChannelProvider = ({
        accessToken,
        forHandle,
        mine,
        children,        
    }: PropsWithChildren<AddYoutubeChannelProviderProps>) => {
        useQueryClient()
        const {data: youtubeChannel} = useYoutubeChannel(accessToken, forHandle, mine)
        const [data, setData] = useState<YoutubeChannelData | undefined>(undefined)

        const clear = useCallback(() => {
            setData(undefined)
        }, [setData])

        const context: AddYoutubeChannelContext = useMemo(() => ({data, clear}), [data, clear])

        if (youtubeChannel !== undefined) {
            //updateQueryData(queryClient, forHandle, data, setData, youtubeChannel)
            updateQueryData()
        }

        return <AddYoutubeChannelContext.Provider value={context}>{children}</AddYoutubeChannelContext.Provider>
    }
export const useAddYoutubeChannel = () => {
    const context = useContext(AddYoutubeChannelContext)
    if(!context) {
        throw new Error('Internal Error: useAddChannelMust be used within addYoutubeChannelContext.Provider')
    }
    return context
}
// later...

// later...
