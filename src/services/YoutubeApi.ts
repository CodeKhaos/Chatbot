import axios from "axios";

export const getYoutubeChannel = async (accessToken: string, forHandle: string, mine: boolean = false) => {
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
    return response.items[0]
    } catch (error) {
        console.error(error)
    }
}
