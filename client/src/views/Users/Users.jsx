import React, {useState} from 'react';
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Reusable/Table";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Reusable/Modal";
import DeleteModalContent from "../../components/Reusable/DeleteModalContent";
import axios from "axios";
import Input from "../../components/Reusable/Input";
import {useForm} from "react-hook-form";
import Button from "../../components/Reusable/Button";
import {yupResolver} from "@hookform/resolvers/yup";
import {ChangePasswordSchema} from "./config";
import {TABLE_ACTION_TYPES_ALL, USERS_HEADERS} from "../../constant";
import PermissionForm from "./PermissionForm";
import Alert from "../../components/Reusable/Alert";
import useAlert from "../../hooks/useAlert";
import {useTranslation} from "react-i18next";
import EditUsersForm from "./EditUsersForm";

const Users = () => {
    const {t} = useTranslation()
    const [reFetch, setReFetch] = useState(false)
    const [serverErrors, setServerErrors] = useState({});
    const users = useFetch('/users/all', reFetch);
    const {toggleModal, openModal, closeModal, value} = useModal()

    const {
        register: registerChangePassword,
        errors: errorsChangePassword,
        handleSubmit: handleSubmitChangePassword,
        reset: resetChangePassword
    } = useForm({
        resolver: yupResolver(ChangePasswordSchema),
    })
    const [alert, setAlert] = useAlert()

    const {
        toggleModal: editToggleModal,
        openModal: editOpenModal,
        closeModal: editCLoseModal,
        value: editValue
    } = useModal()

    const {
        toggleModal: permissionToggleModal,
        openModal: permissionOpenModal,
        closeModal: permissionCLoseModal,
        value: permissionValue
    } = useModal()

    const {
        toggleModal: changePasswordToggleModal,
        openModal: changePasswordOpenModal,
        closeModal: changePasswordCLoseModal,
        value: changePasswordValue
    } = useModal()

    const openDeleteModal = (item) => {
        openModal(item)
    }
    const openEditModal = (item) => {
        editOpenModal(item)
    }

    const openPermissionModal  = (item) => {
        permissionOpenModal(item)
    }
    const openChangePasswordModal  = (item) => {
        changePasswordOpenModal(item)
    }
    const onSubmit = (value) => {
        const {name, email} = value
        axios.put(`/users/${editValue._id}`, {name, email}).then(res => {
            setReFetch(prev => !prev)
            setServerErrors({})
            editCLoseModal()
            setAlert({show: true, message: res.data.message, severity: res.data.alert})
        }).catch(e => {
            setServerErrors(prev => ({...prev, ...e.response.data.data}))
        })

    }

    const handleDelete = () => {
        axios.delete(`/users/${value._id}`).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
        setReFetch(prev => !prev)
        closeModal();
    }

    const handleChangePassword = (value) => {
        axios.put(`/users/change-password/${changePasswordValue}`, value).then(res => {
            setAlert({show: true, message: res.data.message, severity: res.data.alert})
            resetChangePassword()
            changePasswordCLoseModal()
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <>
            <Table
                header={USERS_HEADERS}
                body={users}
                actionsTypes={TABLE_ACTION_TYPES_ALL}
                deleteAction={openDeleteModal}
                editAction={openEditModal}
                permissionAction={openPermissionModal}
                passwordAction={openChangePasswordModal}
            />
            <Modal toggleModal={toggleModal} handleCloseModal={closeModal} modalTitle='Delete users'>
                <DeleteModalContent
                    value={value?.email}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                />
            </Modal>
            <Modal toggleModal={editToggleModal} handleCloseModal={editCLoseModal} modalTitle='Edit users'>
                <EditUsersForm editValue={editValue} serverErrors={serverErrors} onSubmit={onSubmit}/>
            </Modal>
            <Modal maxWidth='550px' toggleModal={permissionToggleModal} handleCloseModal={permissionCLoseModal} modalTitle="Edit Permissions">
                <PermissionForm setAlert={setAlert} userId={permissionValue?._id} closeModal={permissionCLoseModal}/>
            </Modal>
            <Modal
                maxWidth='550px'
                toggleModal={changePasswordToggleModal}
                handleCloseModal={changePasswordCLoseModal}
                modalTitle="Change Password"
            >
                <form onSubmit={handleSubmitChangePassword(handleChangePassword)}>
                    <Input
                        name='password'
                        label='Change password'
                        placeHolder='Change password'
                        inputType="text"
                        error={errorsChangePassword}
                        ref={registerChangePassword}
                        margin="0 0 20px"
                    />
                    <Button type="submit">Change</Button>
                </form>
            </Modal>
            <Alert severity={alert.severity} message={t(`${alert.message}`)} setShow={setAlert} show={alert.show}/>
        </>
    );
};

export default Users;