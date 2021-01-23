import React, {useState} from 'react';
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Reusable/Table";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Reusable/Modal";
import DeleteModalContent from "../../components/Reusable/DeleteModalContent";
import axios from "axios";
import Input from "../../components/Reusable/Input";
import {useForm} from "react-hook-form";
import Button from "../../components/Reusable/Button";
import {yupResolver} from "@hookform/resolvers/yup";
import {EditUsersSchema} from "./config";
import {TABLE_ACTION_TYPES, USERS_HEADERS} from "../../constant";

const Users = () => {
    const [reFetch, setReFetch] = useState(false)
    const [serverErrors, setServerErrors] = useState({});
    const users = useFetch('/users/all', reFetch);
    const {toggleModal, openModal, closeModal, value} = useModal()
    const {register, errors, handleSubmit} = useForm({
        resolver: yupResolver(EditUsersSchema),
    })

    const {
        toggleModal: editToggleModal,
        openModal: editOpenModal,
        closeModal: editCLoseModal,
        value: editValue
    } = useModal()
    const openDeleteModal = (item) => {
        openModal(item)
    }
    const openEditModal = (item) => {
        editOpenModal(item)
    }
    const onSubmit = (value) => {
        const {name, email} = value
        axios.put(`/users/${editValue._id}`, {name, email}).then(res => {
            console.log(res)
            setReFetch(prev => !prev)
            setServerErrors({})
            editCLoseModal()
        }).catch(e => {
            console.log(e)
            setServerErrors(prev => ({...prev, ...e.response.data.data}))
        })
    }

    const handleDelete = () => {
        axios.delete(`/users/${value._id}`).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
        setReFetch(prev => !prev)
        closeModal();
    }

    return (
        <>
            <Table
                header={USERS_HEADERS}
                body={users}
                actionsTypes={TABLE_ACTION_TYPES}
                deleteAction={openDeleteModal}
                editAction={openEditModal}
            />
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Delete users'>
                <DeleteModalContent
                    value={value?.email}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                />
            </Modal>
            <Modal toggleModal={editToggleModal} handleCloseModal={editCLoseModal} modalTitle='Edit users'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        name='name'
                        label='Name'
                        placeHolder='Name'
                        value={editValue?.name}
                        errors={errors || serverErrors}
                        ref={register}
                    />
                    <Input
                        name='email'
                        label='Email'
                        placeHolder='Email'
                        value={editValue?.email}
                        errors={errors}
                        serverError={serverErrors}
                        ref={register}
                        margin='20px 0'
                    />
                    <Button type='submit'>Edit</Button>
                </form>
            </Modal>
        </>
    );
};

export default Users;