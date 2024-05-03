import { useYoutubeVideos } from '@/hooks/useYoutubeVideos.ts' 
import YouTube from "react-youtube";

 export type YoutubeVideoProps = {
     accessToken: string | undefined
     videoId: string
     maxResults: number
 }
 export const YoutubeVideo = ({accessToken, videoId, maxResults}: YoutubeVideoProps) => {  
     const { videos, loading } = useYoutubeVideos(accessToken, videoId, maxResults)
  
     if (loading) {
         return (
             <>
                 <h3>loading videos...</h3>
             </>
         )
     }

    const options = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 0,
        },
    };
  
     return (
         <>
            {videos && videos.map(function(data) {   
                return (          
                        <YouTube
                            key={data.id}
                            videoId={data.id} 
                            opts={options} />
                    
                )
            })}
         </>
     )
 }


