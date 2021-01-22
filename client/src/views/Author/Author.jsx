import React, {useState} from 'react';
import Form from "../../components/Reusable/Form";
import {AUTHOR_INPUTS, AuthorSchema, EditAuthorSchema} from "./config";
import {useForm} from "react-hook-form";
import axios from "axios";
import {yupResolver} from "@hookform/resolvers/yup";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Reusable/Table";
import {AUTHORS_HEADERS, TABLE_ACTION_TYPES} from "../../constant";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Reusable/Modal";
import DeleteModalContent from "../../components/Reusable/DeleteModalContent";
import Input from "../../components/Reusable/Input";
import Button from "../../components/Reusable/Button";


const Author = () => {
    const [reFetch, setReFetch] = useState(false)
    const authors = useFetch('/authors', reFetch)
    const {register, errors, handleSubmit, reset} = useForm({
        resolver: yupResolver(AuthorSchema)
    })
    const {
        errors: editErrors,
        handleSubmit: editHandleSubmit,
        register: editRegister,
        reset: editReset
    } = useForm({
        resolver: yupResolver(EditAuthorSchema)
    })
    const {toggleModal, openModal, closeModal, value} = useModal()
    const {
        toggleModal: editToggleModal,
        openModal: editOpenModal,
        closeModal: editCLoseModal,
        value: editValue
    } = useModal()

    const onSubmit = (value) => {
        console.log(value)
        axios.post('/authors', {...value}).then(res => {
            console.log(res)
            reset()
        }).catch(e => {
            console.log(e)
        })
    }

    const openDeleteModal = (item) => {
        openModal(item)
    }
    const openEditModal = (item) => {
        editOpenModal(item)
    }

    const handleDelete = () => {
        axios.delete(`/authors/${value._id}`).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
        setReFetch(prev => !prev)
        closeModal()
    }
    const handleEdit = (value) => {
        axios.put(`/authors/${editValue._id}`, {...value}).then(res => {
            console.log(res)
            setReFetch(prev => !prev);
            editReset()
            editCLoseModal()
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <>
            <Form
                inputs={AUTHOR_INPUTS}
                errors={errors}
                register={register}
                btnName='Add Author'
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
            />
            <Table
                body={authors}
                header={AUTHORS_HEADERS}
                actionsTypes={TABLE_ACTION_TYPES}
                deleteAction={openDeleteModal}
                editAction={openEditModal}
            />
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Delete Genre'>
                <DeleteModalContent value={value?.name} closeModal={closeModal} handleDelete={handleDelete}/>
            </Modal>
            <Modal modalTitle='Edit Author' handleCloseModal={editCLoseModal} toggleModal={editToggleModal}>
                <form onSubmit={editHandleSubmit(handleEdit)}>
                    <Input
                        name='name'
                        label='Author'
                        value={editValue?.name}
                        error={editErrors}
                        margin='0 0 20px'
                        ref={editRegister}
                    />
                    <Button type='submit'>Edit Author</Button>
                </form>
            </Modal>
        </>
    );
};

export default Author;