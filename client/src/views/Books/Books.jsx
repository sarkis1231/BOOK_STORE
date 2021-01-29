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
import useFile from "../../hooks/useFile";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddBookSchema} from "./config";
import axios from "axios";

const Books = () => {
    const {openModal, closeModal, toggleModal} = useModal();
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(AddBookSchema)
    });
    const [
        handleBookFileChange,
        fileName,
        file,
        fileError,
    ] = useFile('Choose a Book', ['application/pdf'], 'The file type should be PDF');
    const [
        handleImageFileChange,
        imageFileName,
        image,
        imageFileError,
    ] = useFile(
        'Choose an Image',
        ['image/png', 'image/jpeg'],
        'The file type should be png/jpeg'
    );
    console.log(errors)

    const onSubmit = (value, e) => {
        console.log(file, image)
            axios.post('/books', {file:value.file[0].name}).then(res => {
                console.log(res)
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input ref={register} label='Book name' placeHolder='Book Name' error={errors} name='name'/>
                    <FlexContainer justifyContent='space-between' margin='20px 0'>
                        <ControlledDropDown ref={register} name='genre' url={'/genre'}
                                            defaultValue={{name: 'none', value: ''}}
                      file                      label='Genre'
                                            width='49%'
                                            error={errors}
                        />
                        <ControlledDropDown ref={register} name='authors' url={'/authors'}
                                            defaultValue={{name: 'none', value: ''}}
                                            label='Authors'
                                            width='49%'
                                            error={errors}
                        />
                    </FlexContainer>
                    <Input name='file' ref={register} type='file' label='Choose a book' placeHolder={fileName}
                           onFileChange={handleBookFileChange} error={fileError}/>
                    <Input name='image' ref={register} type='file' label='Choose an Image' placeHolder={imageFileName}
                           onFileChange={handleImageFileChange} error={imageFileError}/>
                    <Button type='submit' margin='20px 0 0 0'>Add Books</Button>
                </form>
            </Modal>
        </>
    )

}


export default Books;