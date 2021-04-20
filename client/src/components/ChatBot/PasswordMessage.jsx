import React, {useEffect} from 'react';
import usePrevious from "../../hooks/usePrevious";

const PasswordMessage = ({steps}) => {
    const {passwordValue} = steps
    const prevPassword = usePrevious(passwordValue.message)
    useEffect(() => {
        if(prevPassword !== passwordValue.message) {
            console.log(passwordValue.message)
        }
    }, [prevPassword, passwordValue.message])
    return (
        <div>
            <p>Wait for our message we will get back to you ASAP</p>
        </div>
    );
};

export default PasswordMessage;