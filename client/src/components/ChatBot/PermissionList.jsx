import React from 'react';
import useFetch from "../../hooks/useFetch";

const PermissionList = () => {
    const genre = useFetch('/genre');
    console.log(genre)
    return (
        <div>
        <p>Hello</p>
        </div>
    );
};
export default PermissionList;