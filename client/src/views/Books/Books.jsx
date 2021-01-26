import React from "react";
import AuthorizationElem from "../../HOC/Auth/AuthorizationElem";
import Button from "../../components/Reusable/Button";
import {ADMIN_ROLE} from "../../constant";
import useModal from "../../hooks/useModal";

const Books = () => {
    const {openModal} = useModal()
    return (
       <>
           <AuthorizationElem allowedRoles={ADMIN_ROLE}>
               <Button width='200px' onClick={() => openModal()}>Add Books</Button>
           </AuthorizationElem>
       </>
    )

}


export default Books;