import {useState} from 'react';

export default function useAlert(initialState = {show: false, message: '', severity: 'success'}) {
    const [alert, setAlert] = useState(initialState)

    return [alert, setAlert]

}