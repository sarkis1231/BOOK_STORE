import React, {useState} from "react";
import AuthorizationElem from "../../HOC/Auth/AuthorizationElem";
import Button from "../../components/Reusable/Button";
import {ADMIN_ROLE} from "../../constant";
import useModal from "../../hooks/useModal";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {useForm} from "react-hook-form";
import Modal from "../../components/Reusable/Modal";
import {FlexContainer} from "../../styled/layout.styled";
import Input from "../../components/Reusable/Input";

const Books = () => {
    const {openModal, closeModal, toggleModal} = useModal()
    const {register, handleSubmit} = useForm()
    const [fileName, setFileName] = useState('Choose a book')
    const [file, setFile] = useState({})
    const onSubmit = (value) => {
        console.log(value)
    }
    const handleBookFileChange = (e) => {
        if(e.target.files[0].name.length > 12) {
            console.log('working')
            // console.log(`${e.target.files[0].name.match(/\.[0-9a-z]+$/i)}`)
            console.log(`${e.target?.files[0].name.substring(0, 9)}`)
        }
        if(e.target.files[0].type === 'application/pdf') {
            setFileName(e.target.files[0].name)

            setFile(() =>  e.target.files[0])
        }

    }
    console.log(file)
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
                    <Input type='file' label='Choose a book' placeHolder={fileName} onFileChange={handleBookFileChange}/>
                    <Button type='submit' margin='20px 0 0 0'>Add Books</Button>
                </form>
            </Modal>
        </>
    )

}


export default Books;