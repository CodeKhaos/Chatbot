import { useYoutubeSearch } from '@/hooks/useYoutubeSearch.ts'
import { YoutubeVideo } from '@/components/YoutubeVideos'
import { YoutubeSearch as YTSearch } from '@/types/YoutubeSearch'

export type YoutubeSearchProps = {
    accessToken: string | undefined
    channelId: string | undefined
    maxResults: number
}
export const YoutubeSearch = ({accessToken, channelId, maxResults}: YoutubeSearchProps) => {  
    const { searches, loading } = useYoutubeSearch(accessToken, channelId, maxResults)
    
    if (loading) {
        return (
            <>
                <h3>loading videos...</h3>
            </>
        )
    }
    
    return (
        <>
        <div className="card">
            {searches && searches.map(function(data: YTSearch) {
                return (
                        <YoutubeVideo key={data.id.videoId} accessToken={accessToken} videoId={data.id.videoId} maxResults={1}></YoutubeVideo>     
                    )
            })}               
        </div>
        </>
    )
}


