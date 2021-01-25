import React from "react";
import AuthorizationElem from "../../HOC/Auth/AuthorizationElem";
import Button from "../../components/Reusable/Button";
import {ADMIN_ROLE} from "../../constant";

const Books = () => {
    return (
       <>
           <AuthorizationElem allowedRoles={ADMIN_ROLE}>
               <Button width='200px'>Add Books</Button>
           </AuthorizationElem>
       </>
    )

}


export default Books;