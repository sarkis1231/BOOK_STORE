import React from "react";
import AuthorizationElem from "../../HOC/Auth/AuthorizationElem";
import Button from "../../components/Reusable/Button";
import {ADMIN_ROLE} from "../../constant";
import useModal from "../../hooks/useModal";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {useForm} from "react-hook-form";
import Modal from "../../components/Reusable/Modal";
import {FlexContainer} from "../../styled/layout.styled";
import Input from "../../components/Reusable/Input";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddBookSchema} from "./config";
import axios from "axios";

const Books = () => {
    const {openModal, closeModal, toggleModal} = useModal();
    const {register, handleSubmit, errors} = useForm({
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
        }).catch(e => {
            console.log(e)
        });

    }
    console.log(errors)
    return (
        <>
            <AuthorizationElem allowedRoles={ADMIN_ROLE}>
                <Button width='200px' onClick={() => openModal(undefined)}>Add Books</Button>
            </AuthorizationElem>
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Add Book'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input ref={register} label='Book name' placeHolder='Book Name' error={errors} name='name'/>
                    <Input ref={register} label='Book page count' placeHolder='count' margin='20px 0 0' error={errors}
                           name='pageCount'/>
                    <FlexContainer justifyContent='space-between' margin='20px 0'>
                        <ControlledDropDown ref={register} name='genre' url={'/genre'}
                                            defaultValue={{name: 'none', value: ''}}
                                            label='Genre'
                                            width='49%'
                                            error={errors}
                        />
                        <ControlledDropDown ref={register} name='author' url={'/authors'}
                                            defaultValue={{name: 'none', value: ''}}
                                            label='Authors'
                                            width='49%'
                                            error={errors}
                        />
                    </FlexContainer>
                    <Input name='file' ref={register} type='file' label='Choose a book' placeHolder={'Choose a Book'}
                           error={errors}/>
                    <Input name='image' ref={register} type='file' label='Choose an Image' placeHolder={'Choose an Image'}
                           error={errors}/>
                    <Button type='submit' margin='20px 0 0 0'>Add Books</Button>
                </form>
            </Modal>
        </>
    )

}


export default Books;