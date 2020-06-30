import {useState} from 'react'

const useFetch = url =>{

    const[response, setResponse] = useState({error: false, isLoading: false, data: null})

    const doFetch = ()=>{
        setResponse({error: false, isLoading: true, data: null})
        setTimeout(()=>{
            setResponse({error: false, isLoading: false, data: {min: 700, max: 1500}})
        }, 4500)
    }
    
    return [response, doFetch]
}

export default useFetch