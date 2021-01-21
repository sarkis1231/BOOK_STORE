import React from 'react';
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Reusable/Table";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Reusable/Modal";
import Button from "../../components/Reusable/Button";
import {FlexContainer} from "../../styled/layout.styled";


const Users = () => {
    const users = useFetch('/users/all');
   const {toggleModal, openModal, closeModal, value} =  useModal()
    const openDeleteModal = (id) => {
        openModal(id)
        console.log(id)
    }

    const handleDelete = (value) => {
        console.log(value)
        closeModal();
    }
    return (
       <>
           <Table
               header={{createdAt:'Created-At',name:'Name',email:'Email',role:'Role'}}
               body={users}
               actionsTypes={['EDIT', 'DELETE']}
               deleteAction={openDeleteModal}
           />
           <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Delete'>
               <FlexContainer justifyContent='space-between'>
                   <Button width='48%' onClick={() => closeModal()}>Cancel</Button>
                   <Button width='48%' onClick={() => handleDelete(value)}>Delete</Button>
               </FlexContainer>

           </Modal>
       </>
    );
};

export default Users;