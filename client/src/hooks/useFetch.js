import {useState, useEffect} from 'react'
import axios from "axios";
export default function useFetch(url){
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url).then(res => {
            if(res) {
                setData(prev => [...prev, ...res.data])
            }
        }).catch(e => {
            console.log(e)
        })
    },[url])

    return data;
}