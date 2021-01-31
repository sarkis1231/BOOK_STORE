import React from "react";
import AuthorizationElem from "../../HOC/Auth/AuthorizationElem";
import Button from "../../components/Reusable/Button";
import {ADMIN_ROLE} from "../../constant";
import useModal from "../../hooks/useModal";
import {useForm} from "react-hook-form";
import Modal from "../../components/Reusable/Modal";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddBookSchema} from "./config";
import axios from "axios";
import BooksFrom from "./BooksFrom";

const Books = () => {
    const {openModal, closeModal, toggleModal} = useModal();
    const {register, handleSubmit, errors, reset} = useForm({
        resolver: yupResolver(AddBookSchema),
    });

    const onSubmit = (value, e) => {
        let formData = new FormData();
        Object.keys(value).forEach((key) => {
            console.log(key)
            if(key === 'file' || key === 'image') {
            formData.append(key, value[key][0])
            }else {
                formData.append(key, value[key])
            }
        })
        axios.post('/books', formData).then(res => {
            console.log(res)
            reset();
            closeModal()
        }).catch(e => {
            console.log(e)
        });
    }

    return (
        <>
            <AuthorizationElem allowedRoles={ADMIN_ROLE}>
                <Button width='200px' onClick={() => openModal(undefined)}>Add Books</Button>
            </AuthorizationElem>
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Add Book'>
                <BooksFrom onSubmit={onSubmit} register={register} errors={errors} handleSubmit={handleSubmit}/>
            </Modal>
        </>
    )

}


export default Books;