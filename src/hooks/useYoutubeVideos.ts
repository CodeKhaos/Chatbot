import { YoutubeVideo } from '@/types/YoutubeVideo';
import axios from 'axios';
import { useState, useEffect } from 'react';

export function useYoutubeVideos (accessToken: string = '', id: string, maxResults: number = 1) {
  const [videos, setVideos] = useState<YoutubeVideo[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return
    const fetchVideos = async () => {
      try {
        const { data: response } = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
            params: {
                part: 'player,snippet,contentDetails',
                id: id,
                access_token : accessToken,            
                maxResults: maxResults,
            },
        })

      if(!response || !response.items || response.items.length === 0) return;
      
      setVideos(response.items)
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchVideos();
  }, [accessToken, id, maxResults]);

  return {
    videos,
    loading,
  };
};