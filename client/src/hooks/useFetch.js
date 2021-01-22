import {useState, useEffect} from 'react'
import axios from "axios";
export default function useFetch(url, reFetch){
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url).then(res => {
            res.data.empty ?  setData(() => []) :   setData(() => [...res.data])

        }).catch(e => {
            console.log(e)
        })
    },[url, reFetch])

    return data;
}