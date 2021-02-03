import React, {useState, useEffect} from "react";
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
// import useFetch from "../../hooks/useFetch";
import Card from "../../components/Reusable/Card";
import {FlexContainer} from "../../styled/layout.styled";
import Input from "../../components/Reusable/Input";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {filteredValue} from "../../utils";

const Books = () => {
    const {openModal, closeModal, toggleModal} = useModal();
    const {openModal: searchOpenModal, closeModal: searchCloseModal, toggleModal: searchToggleModal} = useModal();
    const {register, handleSubmit, errors, reset} = useForm({
        resolver: yupResolver(AddBookSchema),
    });
    const [data, setData] = useState([])
    const {
        register: searchRegister,
        handleSubmit: searchHandleSubmit,
        errors: searchErrors,
        reset: searchReset
    } = useForm();
    const [reFetch, setReFetch] = useState(false)
    // const books = useFetch('/books/filter', reFetch)
    useEffect(() => {
        axios.get('/books/filter').then(res => {
            res.data.empty ? setData(() => []) : setData(() => [...res.data])

        }).catch(e => {
            console.log(e)
        })
    }, [reFetch])

    const onSubmit = (value) => {
        if (value.publishedDate.length === 0) {
            delete value.publishedDate
        }
        let formData = new FormData();
        Object.keys(value).forEach((key) => {
            if (key === 'file' || key === 'image') {
                formData.append(key, value[key][0])
            } else {
                formData.append(key, value[key])
            }
        })
        axios.post('/books', formData).then(res => {
            reset();
            setReFetch(prev => !prev)
        }).catch(e => {
            console.log(e)
        });
        closeModal()
    }

    const onSearchSubmit = (value) => {
        axios.get('/books/filter', {
            params: filteredValue(value)
        }).then(res => {
            if (res.data.empty) {
                setData(prev => prev);
            } else {
                setData(() => res.data)
            }
            searchReset()
        })
    }

    return (
        <>
            <AuthorizationElem allowedRoles={ADMIN_ROLE}>
                <Button width='200px' onClick={() => openModal(undefined)}>Add Books</Button>
            </AuthorizationElem>
            <Button margin='20px 0 0' onClick={() => searchOpenModal()}>Search</Button>
            <FlexContainer maxWidth='1440px' margin='30px auto 0' width='100%' justifyContent='space-between'
                           flexWrap='wrap'>
                {data.length ? data.map(({_id: id, file, image, name, author}) => (
                    <Card image={image} bookName={name} key={id} file={file} author={author}/>
                )) : null}
            </FlexContainer>
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Add Book'>
                <BooksFrom onSubmit={onSubmit} register={register} errors={errors} handleSubmit={handleSubmit}/>
            </Modal>
            <Modal toggleModal={searchToggleModal} handleCloseModal={searchCloseModal} modalTitle='Search Book'>
                <form onSubmit={searchHandleSubmit(onSearchSubmit)}>
                    <Input ref={searchRegister} label='Book name' placeHolder='Book Name' error={searchErrors}
                           name='name'
                           onInputChange={e => e.target.value.trim()}/>
                    <Input ref={searchRegister} label='Book page count' placeHolder='count' margin='20px 0'
                           error={searchErrors}
                           name='pageCount'
                           onInputChange={e => e.target.value.trim()}/>

                    <Input ref={searchRegister} label='Published Date' name='publishedDate' placeHolder='YYYY-MM-DD'
                           error={searchErrors}
                           onInputChange={e => e.target.value.trim()}
                    />
                    <FlexContainer justifyContent='space-between' margin='20px 0'>
                        <ControlledDropDown ref={searchRegister} name='genre' url={'/genre'}
                                            defaultValue={{name: 'none', value: ''}}
                                            label='Genre'
                                            width='49%'
                                            error={searchErrors}
                        />
                        <ControlledDropDown ref={searchRegister} name='author' url={'/authors'}
                                            defaultValue={{name: 'none', value: ''}}
                                            label='Authors'
                                            width='49%'
                                            error={searchErrors}
                        />
                    </FlexContainer>
                    <Button type='submit' margin='20px 0'>Search Books</Button>
                </form>
            </Modal>
        </>
    )

}


export default Books;