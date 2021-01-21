import React from 'react';
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Reusable/Table";


const Users = () => {
    const users = useFetch('/users/all');

    return (
       <>
           <Table
               header={{createdAt:'Created-At',name:'Name',email:'Email',role:'Role'}}
               body={users}
               actionsTypes={['EDIT', 'DELETE']}
           />
       </>
    );
};

export default Users;