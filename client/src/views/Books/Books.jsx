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
import booksFormData, {filteredValue} from "../../utils";
import DeleteModalContent from "../../components/Reusable/DeleteModalContent";
import FilterForm from "./FilterForm";
import styled from "styled-components";
import {ReactComponent as DeleteIcon} from '../../assets/svg/delete.svg';
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {ReactComponent as AddIcon} from "../../assets/svg/Add.svg";
import {loginUser} from "../../actions/authActions";

const Books = () => {
    const {openModal, closeModal, toggleModal} = useModal();
    const {openModal: searchOpenModal, closeModal: searchCloseModal, toggleModal: searchToggleModal} = useModal();
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
    const {register: editRegister, handleSubmit: editHandleSubmit, errors: editErrors} = useForm({
        resolver: yupResolver(EditBookSchema),
    });
    const [data, setData] = useState([])
    const {
        register: searchRegister,
        handleSubmit: searchHandleSubmit,
        errors: searchErrors,
        reset: searchReset
    } = useForm();
    const [reFetch, setReFetch] = useState(false)
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
        axios.post('/books', formData).then(() => {
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
        console.log(value)
        console.log(booksFormData(value))
        axios.put(`/books/${editValue.id}`, booksFormData(value)).then(res => {
            console.log(res)
            setReFetch(prev => !prev)
        }).catch(e => {
            console.log(e)
        })
        editCloseModal()
    }

    let [check,setCheck] = useState(undefined);
    let handleChangeCheck = (e)=>{

        return setCheck(e.target.checked)
    };



    const [fields, setFields] = useState([]);

    function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }
    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }


    return (
        <>
            <AuthorizationElem allowedRoles={ADMIN_ROLE}>
                <Button width='200px' onClick={() => openModal(undefined)}>Add Books</Button>
            </AuthorizationElem>
            <Button margin='20px 0 0' onClick={() => searchOpenModal(undefined)}>Search</Button>
            <FlexContainer maxWidth='1440px' margin='30px auto 0' width='100%' justifyContent='space-between'
                           flexWrap='wrap'>
                {data.length ? data.map(({_id: id, file, image, name, author, pageCount, genre}) => (
                    <Card image={image} bookName={name} id={id} key={id} file={file} author={author}
                          pageCount={pageCount}
                          genre={genre} onDelete={deleteOpenModal} onEdit={editOpenModal}/>
                )) : null}
                    <FlexContainer width='100%' flexDirection='column'>
                    <FlexContainer width='100%' justifyContent='space-between' alignItems='center'>
                      <StyledCheckboxContainer>
                          <StyledCheckbox type='checkbox' value="false" onChange={handleChangeCheck}></StyledCheckbox>
                      </StyledCheckboxContainer>

                        <ControlledDropDown disabled ref={register} name='sameer' url={'/genre'}
                                            defaultValue={'sameer' ? {
                                                name: 'sameer',
                                                value: 'sameer'
                                            } : {name: 'none', value: ''}}
                                            width='40%'
                                            error={errors}
                                            opacity={ check ? '0.4': '100'}
                                            pointerEvents={check ? 'none':''}
                        />
                        <ControlledDropDown disabled ref={register} name='sameer' url={'/genre'}
                                            defaultValue={'sameer' ? {
                                                name: 'sameer',
                                                value: 'sameer'
                                            } : {name: 'none', value: ''}}
                                            width='40%'
                                            error={errors}
                                            opacity={ check ? '0.4': '100'}
                                            pointerEvents={check ? 'none':''}
                        />
                        <StyledIconContainer opacity={ check ? '0.4': '100'}
                                             pointerEvents={check ? 'none':''} onClick={()=> handleAdd()} ><AddIcon></AddIcon></StyledIconContainer>

                    </FlexContainer>
                        {fields.map((field, idx) => {
                            return (
                                <FlexContainer width='100%' justifyContent='space-between' alignItems='center' padding='10px 0 0 0' key={`${field}-${idx}`}>
                                    <StyledCheckboxContainer margin='0 30px 0 0'>
                                        <StyledCheckbox type='checkbox' value="false" display='none'></StyledCheckbox>
                                    </StyledCheckboxContainer>
                                    <ControlledDropDown disabled ref={register} name='sameer' url={'/genre'}
                                                        defaultValue={'sameer' ? {
                                                            name: 'sameer',
                                                            value: 'sameer'
                                                        } : {name: 'none', value: ''}}
                                                        width='40%'
                                                        error={errors}
                                    />
                                    <ControlledDropDown disabled ref={register} name='sameer' url={'/genre'}
                                                        defaultValue={'sameer' ? {
                                                            name: 'sameer',
                                                            value: 'sameer'
                                                        } : {name: 'none', value: ''}}
                                                        width='40%'
                                                        error={errors}
                                    />
                                    <StyledIconContainer onClick={()=> handleRemove(idx)}><DeleteIcon /></StyledIconContainer>
                                </FlexContainer>
                            );
                        })}
                    </FlexContainer>
            </FlexContainer>
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Add Book'>
                <BooksFrom buttonName='Add Book' onSubmit={onSubmit} register={register} errors={errors}
                           handleSubmit={handleSubmit}/>
            </Modal>
            <Modal toggleModal={searchToggleModal} handleCloseModal={searchCloseModal} modalTitle='Search Book'>
                <FilterForm onSearchSubmit={onSearchSubmit} searchHandleSubmit={searchHandleSubmit}
                            searchErrors={searchErrors} searchRegister={searchRegister}/>
            </Modal>
            <Modal toggleModal={deleteToggleModal} handleCloseModal={deleteCloseModal} modalTitle='Delete Book'>
                <DeleteModalContent closeModal={deleteCloseModal} value={deleteValue?.bookName}
                                    handleDelete={onDelete}/>
            </Modal>
            <Modal toggleModal={editToggleModal} modalTitle='Edit Books' handleCloseModal={editCloseModal}>
                <BooksFrom handleSubmit={editHandleSubmit} errors={editErrors} register={editRegister}
                           onSubmit={onEdit} values={editValue} buttonName='Edit Book'/>
            </Modal>
        </>
    )
}


export default Books;

const StyledCheckboxContainer = styled.label`
  display: inline-block;
  vertical-align: middle;
  margin: ${({margin})=> margin? margin: '0'};
`

const StyledCheckbox = styled.input`
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${({theme}) => theme.checkBox};
  cursor: pointer;
  display: ${({display})=> display? display: ''};
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border:none;
  border-radius: 4px;
  outline: none;
  background-color:${({theme}) => theme.checkBox};
  &:checked:before{
    content: '\\2713';
    display: block;
    font-weight: bold;
    text-align: center;
    border: none;
    color:${({theme}) =>theme.checkMark};
    position: absolute;
    font-size: 20px;
    left: 0.5rem;
  }
  
`
const StyledIconContainer = styled.button`
  border: none;
  background: none;
  opacity: ${({ opacity }) => opacity};
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  &:focus{
    outline: none;
  }
  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
    fill: ${({theme}) => theme.editDeleteIcon};
    path{
      fill: ${({theme}) => theme.editDeleteIcon};
  }
  }

`
