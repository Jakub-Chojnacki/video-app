import {useEffect,useState} from 'react'
import axios from 'axios'
const useFetchVideo =  (type,identifier) => {
    const [res,setRes] = useState()
    const [isPending,setIsPending] = useState(true)
    const [error,setError] = useState()
    useEffect(()=> {
        const getVideoData = async (TYPE,ID) => {
            let yourHeaders;
            let url;
            if(TYPE=='YOUTUBE'){
              url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ID}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
              yourHeaders = null;
            }else if(TYPE == 'VIMEO'){
              url =`https://api.vimeo.com/videos/${ID}`
              yourHeaders =  {Authorization: `Bearer ${import.meta.env.VITE_VIMEO_API_TOKEN}`}
            }
            const response = await axios.get(url, {headers: yourHeaders});
            setRes(response)
            setIsPending(false) 
          }

          getVideoData(type,identifier)

          
    },[])

    return {res,isPending,error}
}

export default useFetchVideo;