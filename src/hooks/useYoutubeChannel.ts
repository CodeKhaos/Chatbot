import axios from 'axios';
import { useState, useEffect } from 'react';
import { YoutubeChannel, YoutubeChannelSnippet } from '@/types/YoutubeChannel';
import { produce } from 'immer';
import { YoutubeThumbnails } from '@/types/YoutubeThumbnail';

export function useYoutubeChannel (accessToken: string = '', forHandle: string = '', mine: boolean = false) {
  const [data, setData] = useState({    
      id: "0",
      kind: '',
      snippet: {
        title: '',
        country: '',
        customUrl: '',
        description: '',
        thumbnails: [{
          height: 0,
          width: 0,
          url:'',
        } as YoutubeThumbnails]
      } as YoutubeChannelSnippet
    } as YoutubeChannel);

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!accessToken) return
    const fetchChannel = async () => {
      try {
        const { data: response } = mine ? 
          await axios.get("https://www.googleapis.com/youtube/v3/channels", {
            params: {
                part: 'snippet',
                mine: mine,     
                access_token : accessToken,                
            },
        }) : 
        await axios.get("https://www.googleapis.com/youtube/v3/channels", {
          params: {
              part: 'snippet',
              forHandle: forHandle,
              access_token : accessToken,                
          },
      })
      if(!response || !response.items || response.items.length === 0) return;
      
      localStorage.setItem("youtubeChannel", response.items[0].channelId)        
      
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchChannel();
  }, [accessToken]);

  return {
    data,
    loading,
  };
};