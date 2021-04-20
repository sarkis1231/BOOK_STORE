import React, {useEffect} from 'react';
import usePrevious from "../../hooks/usePrevious";

const PermissionList = ({steps}) => {
    const {permissionValue} = steps
    const prevPermission = usePrevious(permissionValue.message)

    useEffect(() => {
        if(prevPermission !== permissionValue.message) {
            console.log(permissionValue.message)
        }
    }, [prevPermission, permissionValue.message])
    return (
        <div>
        <p>Wait for our message we will get back to you ASAP</p>
        </div>
    );
};
export default PermissionList;