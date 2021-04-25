import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
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

    const handleDeleteMessage = (messageId) => {
        const filteredModalContent = modalContent.length && modalContent.filter(({_id}) =>_id !== messageId)
        axios.delete(`/chatBot/${messageId}`).then(res => {
            console.log(res)
        }).catch(err =>  {
            console.log(err.response)
            setModalContent(filteredModalContent)
        })
    }

    return (
        <>
            <StyledPermissionContainer flexDirection="column" width='50%' mobileWidth="100%" miniWidth="100%" >
                {!Object.keys(formatMessages(messages)).length ? <><p>No messages</p></>
                    :
                    Object.keys(formatMessages(messages)).map( key => (
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
                    {!modalContent.length ? <p>No messages</p>:
                        modalContent.map(({_id, message, name}) => (
                       <StyledRow
                           lastElement
                           key={_id}
                           justifyContent='space-between'
                           width="100%"
                           alignItems='center'
                           margin="0 0 10px"
                       >
                           <StyledMessageContainer onClick={() => handleDeleteMessage(_id)}>
                               <span>{name}</span>
                               <p className="message">{message}</p>
                           </StyledMessageContainer>
                        </StyledRow>
                    ) )}

                </StyledFlexContainer>
            </Modal>
        </>
    );
};

export default Messages;

const StyledMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  border-radius: 20px 0 20px 0;
  padding: 20px;
  border: 1px solid ${({theme}) => theme.border};
  span {
    font-size: 12px;
  } 
  .message {
    margin: 0;
    font-size: 14px;
    width: 100%;
    text-align: left;
  }
`