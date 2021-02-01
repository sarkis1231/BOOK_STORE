import React, {useState} from "react";
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
import useFetch from "../../hooks/useFetch";
import Card from "../../components/Reusable/Card";
import {FlexContainer} from "../../styled/layout.styled";

const Books = () => {
    const {openModal, closeModal, toggleModal} = useModal();
    const {register, handleSubmit, errors, reset} = useForm({
        resolver: yupResolver(AddBookSchema),
    });
    const [reFetch, setReFetch] = useState(false)
    const books = useFetch('/books', reFetch)
    const onSubmit = (value) => {
        if(value.publishedDate.length === 0) {
            delete value.publishedDate
        }
        let formData = new FormData();
        Object.keys(value).forEach((key) => {
            console.log(value['publishedDate'] === '')
            if (key === 'file' || key === 'image') {
                formData.append(key, value[key][0])
            } else {
                formData.append(key, value[key])
            }
        })
        axios.post('/books', formData).then(res => {
            console.log(res)
            reset();
            setReFetch(prev => !prev)
        }).catch(e => {
            console.log(e)
        });
        closeModal()
    }

    return (
        <>
            <AuthorizationElem allowedRoles={ADMIN_ROLE}>
                <Button width='200px' onClick={() => openModal(undefined)}>Add Books</Button>
            </AuthorizationElem>
            <FlexContainer maxWidth='1440px' margin='30px auto 0' width='100%' justifyContent='space-between'
                           flexWrap='wrap'>
                {books.length ? books.map(({_id: id, file, image, name, author}) => (
                    <Card image={image} bookName={name} key={id} file={file} author={author}/>
                )) : null}
            </FlexContainer>
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Add Book'>
                <BooksFrom onSubmit={onSubmit} register={register} errors={errors} handleSubmit={handleSubmit}/>
            </Modal>
        </>
    )

}


export default Books;