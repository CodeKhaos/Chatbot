import { YoutubeSearch } from '@/types/YoutubeSearch';
import axios from 'axios';
import { useState, useEffect } from 'react';

export function useYoutubeSearch (accessToken: string = '', channelId: string = 'UCjI1wrvGXMB-qhSJjSXYumA', maxResults: number = 1) {
  const [searches, setSearches] = useState<YoutubeSearch[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return
    const fetchSearch = async () => {
      try {
        const { data: response } = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: 'snippet',
                type: 'video',
                channelId: channelId,
                access_token : accessToken,            
                maxResults: maxResults,
                order: 'date',
                videoDuration: 'medium'
            },
        })

      if(!response || !response.items || response.items.length === 0) return;
      
      setSearches(response.items)
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchSearch();
  }, [accessToken, channelId, maxResults]);

  return {
    searches,
    loading,
  };
};