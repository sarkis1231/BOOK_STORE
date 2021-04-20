import React, {useEffect, useState} from 'react';
import usePrevious from "../../hooks/usePrevious";
import axios from "axios";

const PermissionList = ({steps}) => {
    const {permissionValue} = steps
    const prevPermission = usePrevious(permissionValue.message)
    const [error, setError] = useState("")

    useEffect(() => {
        if(prevPermission !== permissionValue.message) {
            console.log(permissionValue.message)
               axios.post("/chatBot", {message: permissionValue.message}).then(res => {
                   console.log(res)
               }).catch(e => {
                   const {response} = e
                   console.log(response)
                   if(response.status === 401) {
                      setError("Please Login")
                   }
               })
        }
    }, [prevPermission, permissionValue.message])
    return (
        <>
            {error.length ? <p style={{color:"#DC004E"}}>{error}</p> : <p> Wait for our message we will get back to you ASAP</p>}
        </>
    );
}
export default PermissionList;