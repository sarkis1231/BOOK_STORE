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

const Books = () => {
    const {openModal, closeModal, toggleModal} = useModal();
    const {register, handleSubmit} = useForm();
    const [handleBookFileChange, fileName,file,  fileError] = useFile();

    const onSubmit = (value) => {
        console.log(value)
    }

    console.log(fileError, file)
    return (
        <>
            <AuthorizationElem allowedRoles={ADMIN_ROLE}>
                <Button width='200px' onClick={() => openModal(undefined)}>Add Books</Button>
            </AuthorizationElem>
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Add Book'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input label='Book name' placeHolder='Book Name' name='name'/>
                    <FlexContainer justifyContent='space-between'>
                        <ControlledDropDown ref={register} name='genre' url={'/genre'}
                                            defaultValue={{name: 'none', value: 'none'}}
                                            label='Genre'
                                            width='49%'
                        />
                        <ControlledDropDown ref={register} name='authors' url={'/authors'}
                                            defaultValue={{name: 'none', value: 'none'}}
                                            label='Authors'
                                            width='49%'
                        />
                    </FlexContainer>
                    <Input type='file' label='Choose a book' placeHolder={fileName}
                           onFileChange={handleBookFileChange} error={fileError}/>
                    <Button type='submit' margin='20px 0 0 0'>Add Books</Button>
                </form>
            </Modal>
        </>
    )

}


export default Books;