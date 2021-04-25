import React, {useState, useEffect} from "react";
import AuthorizationElem from "../../HOC/Auth/AuthorizationElem";
import Button from "../../components/Reusable/Button";
import {ADMIN_ROLE} from "../../constant";
import useModal from "../../hooks/useModal";
import {useForm} from "react-hook-form";
import Modal from "../../components/Reusable/Modal";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddBookSchema, EditBookSchema} from "./config";
import axios from "axios";
import BooksFrom from "./BooksFrom";
import Card from "../../components/Reusable/Card";
import {FlexContainer} from "../../styled/layout.styled";
import booksFormData, {filteredValue, formatFileName} from "../../utils";
import DeleteModalContent from "../../components/Reusable/DeleteModalContent";
import FilterForm from "./FilterForm";
import styled from "styled-components";
import PaginationBar from "../../components/Reusable/PaginationBar";
import usePagination from "../../hooks/usePagination";
import {useTranslation} from "react-i18next";

const Books = () => {
    const {t} = useTranslation()
    const {openModal, closeModal, toggleModal} = useModal();
    const {
        openModal: editOpenModal,
        closeModal: editCloseModal,
        toggleModal: editToggleModal,
        value: editValue
    } = useModal();
    const {
        openModal: deleteOpenModal,
        closeModal: deleteCloseModal,
        toggleModal: deleteToggleModal,
        value: deleteValue
    } = useModal();
    const {register, handleSubmit, errors, reset} = useForm({
        resolver: yupResolver(AddBookSchema),
    });
    const [filePlaceHolder, setFilePlaceHolder] = useState({addBook: 'Choose a Book', addImage: 'Choose an Image'})
    const {register: editRegister, handleSubmit: editHandleSubmit, errors: editErrors} = useForm({
        resolver: yupResolver(EditBookSchema),
    });
    const [data, setData] = useState([])
    const [totalLength, setTotalLength] = useState(0)
    const {
        register: searchRegister,
        handleSubmit: searchHandleSubmit,
        errors: searchErrors,
        reset: searchReset
    } = useForm();
    const [reFetch, setReFetch] = useState(false)
    const {
        slicedData,
        pagination,
        prevPage: goToPrevPage,
        nextPage: goToNextPage,
        changePage,
    } = usePagination(3, data?.empty ? [] : data, 1, false, totalLength);
    useEffect(() => {
        axios.get(`/books/filter`, {}).then(res => {
            setTotalLength(res.data.totalLength)
            res.data.empty ? setData(() => []) : setData(() => [...res.data.data])

        }).catch(e => {
            console.log(e)
        })
    }, [reFetch])

    const onSubmit = (value) => {
        if (value.publishedDate.length === 0) {
            delete value.publishedDate
        }
        const formData = new FormData();
        Object.keys(value).forEach((key) => {
            if (key === 'file' || key === 'image') {
                formData.append(key, value[key][0])
            } else {
                formData.append(key, value[key])
            }
        })
        axios.post('/books', formData).then(() => {
            reset();
            setReFetch(prev => !prev)
            setFilePlaceHolder(prev => ({...prev, addBook: 'Choose a Book', addImage: 'Choose an Image'}))
        }).catch(e => {
            console.log(e)
        });
        closeModal()
    }

    const onSearchSubmit = (value) => {
        console.log(value)
        axios.get(`/books/filter`, {
            params: filteredValue(value)
        }).then(res => {
            if (res.data.empty) {
                setData(() => res.data)
            } else {
                setData(() => res.data.data);
                setTotalLength(() => res.data.totalLength);
            }
        })
        searchReset()
    }

    const onDelete = () => {
        axios.delete(`/books/${deleteValue.id}`).then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e)
        })
        setReFetch(prev => !prev)
        deleteCloseModal();
    }

    const onEdit = (value) => {
        axios.put(`/books/${editValue.id}`, booksFormData(value)).then(res => {
            console.log(res)
            setReFetch(prev => !prev)
        }).catch(e => {
            console.log(e)
        })
        editCloseModal()
    }
    const handleAddBookFile = (e) => {
        const {files} = e.target
        setFilePlaceHolder(prev => ({...prev, addBook: formatFileName(files[0].name)}))
    }
    const handleAddImageFile = (e) => {
        const {files} = e.target
        setFilePlaceHolder(prev => ({...prev, addImage: formatFileName(files[0].name)}))
    }

    return (
        <>
            <AuthorizationElem allowedRoles={ADMIN_ROLE}>
                <Button width='200px' margin='10px' onClick={() => openModal(undefined)}>{t('books.addBook')}</Button>
            </AuthorizationElem>
            <StyledFilterFormContainer>
                <FilterForm onSearchSubmit={onSearchSubmit} searchHandleSubmit={searchHandleSubmit}
                            searchErrors={searchErrors} searchRegister={searchRegister}/>
            </StyledFilterFormContainer>
            <FlexContainer maxWidth='1440px' margin='30px auto 0' width='100%' justifyContent='space-between'
                           flexWrap='wrap'>
                {!data.empty ? slicedData.map(({_id: id, file, image, name, author, pageCount, genre}) => (
                    <Card image={image} bookName={name} id={id} key={id} file={file} author={author}
                          pageCount={pageCount}
                          genre={genre} onDelete={deleteOpenModal} onEdit={editOpenModal}/>
                )) : "No result found"}
            </FlexContainer>
            <PaginationBar changePage={changePage} pageNumber={pagination} next={goToNextPage} prev={goToPrevPage}/>
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Add Book'>
                <BooksFrom addImageFile={filePlaceHolder.addImage} addBookFilePlaceHolder={filePlaceHolder.addBook}
                           handleAddImageFile={handleAddImageFile}
                           handleAddBookFile={handleAddBookFile}
                           buttonName='Add Book' onSubmit={onSubmit} register={register} errors={errors}
                           handleSubmit={handleSubmit}/>
            </Modal>
            <Modal toggleModal={deleteToggleModal} handleCloseModal={deleteCloseModal} modalTitle='Delete Book'>
                <DeleteModalContent closeModal={deleteCloseModal} value={deleteValue?.bookName}
                                    handleDelete={onDelete}/>
            </Modal>
            <Modal toggleModal={editToggleModal} modalTitle='Edit Books' handleCloseModal={editCloseModal}>
                <BooksFrom handleSubmit={editHandleSubmit} errors={editErrors} register={editRegister}
                           onSubmit={onEdit} values={editValue} buttonName='Edit Book'
                           addImageFile={filePlaceHolder.addImage} addBookFilePlaceHolder={filePlaceHolder.addBook}
                           handleAddImageFile={handleAddImageFile}
                           handleAddBookFile={handleAddBookFile}
                />
            </Modal>
        </>
    )

}


export default Books;

const StyledFilterFormContainer = styled.div`
  width: 50%;

`