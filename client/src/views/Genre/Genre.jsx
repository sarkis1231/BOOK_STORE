import React, {useState} from 'react';
import Form from "../../components/Reusable/Form";
import {GENRE_INPUTS, GenreSchema} from "./config";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Reusable/Table";
import {GENRE_HEADERS, TABLE_ACTION_TYPES} from "../../constant";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Reusable/Modal";
import DeleteModalContent from "../../components/Reusable/DeleteModalContent";
import Input from "../../components/Reusable/Input";
import Button from "../../components/Reusable/Button";
import {useTranslation} from "react-i18next";

const Genre = () => {
    const {t} = useTranslation()
    const [reFetch, setReFetch] = useState(false);
    const genre = useFetch('/genre', reFetch);
    const {errors, handleSubmit, register, reset} = useForm({
        resolver: yupResolver(GenreSchema)
    });
    const {
        errors: editErrors,
        handleSubmit: editHandleSubmit,
        register: editRegister,
        reset: editReset
    } = useForm({
        resolver: yupResolver(GenreSchema)
    });

    const {toggleModal, openModal, closeModal, value} = useModal()
    const {
        toggleModal: editToggleModal,
        openModal: editOpenModal,
        closeModal: editCLoseModal,
        value: editValue
    } = useModal();

    const onSubmit = (value) => {
        axios.post('/genre', value).then(res => {
            console.log(res)
            reset();
            setReFetch(prev => !prev);
        }).catch(e => {
            console.log(e);
        })
    }
    const openDeleteModal = (item) => {
        openModal(item);
    };
    const openEditModal = (item) => {
        editOpenModal(item);
    };

    const handleDelete = () => {
        axios.delete(`/genre/${value._id}`).then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e);
        })
        setReFetch(prev => !prev);
        closeModal();
    }
    const handleEdit = (value) => {

        axios.put(`/genre/${editValue._id}`, {...value, genre: editValue._id}).then(res => {
            console.log(res)
            setReFetch(prev => !prev);
            editReset();
            editCLoseModal();
        }).catch(e => {
            console.log(e);
        });
    };

    return (
        <>
            <Form
                inputs={GENRE_INPUTS}
                btnName={t("genre.addGenre")}
                register={register}
                errors={errors}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                id="add_genre"
            />
            <Table
                header={GENRE_HEADERS}
                body={genre}
                actionsTypes={TABLE_ACTION_TYPES}
                deleteAction={openDeleteModal}
                editAction={openEditModal}
            />
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Delete Genre'>
                <DeleteModalContent value={value?.name} closeModal={closeModal} handleDelete={handleDelete}/>
            </Modal>
            <Modal modalTitle='Edit Genre' handleCloseModal={editCLoseModal} toggleModal={editToggleModal}>
                <form onSubmit={editHandleSubmit(handleEdit)} id="genre_add_form">
                    <Input
                        name='name'
                        label='Genre'
                        value={editValue?.name}
                        error={editErrors}
                        margin='0 0 20px'
                        ref={editRegister}
                        id="genre_add_input"
                    />
                    <Button type='submit'>Edit Genre</Button>
                </form>
            </Modal>
        </>
    );
};

export default Genre;