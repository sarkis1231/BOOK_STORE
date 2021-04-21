import React, {useEffect, useRef, useState} from 'react';
import {formatMessages} from "../../utils";
import {StyledFlexContainer, StyledPermissionContainer, StyledRow} from "../../styled/shared.styled";
import {FlexContainer} from "../../styled/layout.styled";
import Button from "../../components/Reusable/Button";
import Modal from "../../components/Reusable/Modal";
import useModal from "../../hooks/useModal";
import axios from "axios";

const Messages = () => {
    const [messages, setMessages] = useState([])
    const [modalContent, setModalContent] = useState([])
    const {toggleModal, openModal, closeModal} = useModal()
    const intervalId = useRef(null)


    useEffect(() => {
        axios.get("/chatBot").then(res => {
            setMessages(() => res.data)
        })
        intervalId.current = setInterval(() => {
            axios.get("/chatBot").then(res => {
                const {data} = res
                setMessages(() => data)
            })
        }, 2000)

        return () => clearInterval(intervalId.current)

    }, [])


    const handleOpenModal = (content) => {
        setModalContent(content)
        openModal()
    }


    return (
        <>
            <StyledPermissionContainer flexDirection="column" width='50%' mobileWidth="100%" miniWidth="100%" >
                {Object.keys(formatMessages(messages)).map( key => (
                    <FlexContainer key={key}  justifyContent='space-between' margin='0 0 10px'>
                        <p>{key}</p>
                        <Button
                            width='40%'
                            type='button'
                            onClick={() => handleOpenModal(formatMessages(messages)[key])}
                        >
                            Open Message
                        </Button>
                    </FlexContainer>)
                )}
            </StyledPermissionContainer>
            <Modal modalTitle="View messages" handleCloseModal={closeModal} toggleModal={toggleModal}>
                <StyledFlexContainer width="100%">
                    {modalContent.map(({_id, message, name}) => (
                       <StyledRow
                           lastElement={modalContent[modalContent.length - 1].message === message}
                           key={_id}
                           justifyContent='space-between'
                           width="100%"
                           alignItems='center'
                       >
                           <p>{name}</p>
                           <p>{message}</p>
                        </StyledRow>
                    ) )}



                </StyledFlexContainer>
            </Modal>
        </>
    );
};

export default Messages;