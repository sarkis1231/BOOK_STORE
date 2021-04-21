import React, {useState} from 'react';
import useFetch from "../../hooks/useFetch";
import {formatMessages} from "../../utils";
import {StyledFlexContainer, StyledPermissionContainer, StyledRow} from "../../styled/shared.styled";
import {FlexContainer} from "../../styled/layout.styled";
import Button from "../../components/Reusable/Button";
import Modal from "../../components/Reusable/Modal";
import useModal from "../../hooks/useModal";

const Messages = () => {
    const messages = useFetch('/chatBot')
    const [modalContent, setModalContent] = useState({})
    const {toggleModal, openModal, closeModal} = useModal()

    const handleOpenModal = (id,name, message) => {
        setModalContent({id, name, message})
        openModal()
    }
    console.log(formatMessages(messages))


    return (
        <>
            <StyledPermissionContainer flexDirection="column" width='50%' mobileWidth="100%" miniWidth="100%" >
                {formatMessages(messages).map(({_id, name, email, message}) => (
                        <FlexContainer key={_id}  justifyContent='space-between' margin='0 0 10px'>
                            <p>{email}</p>
                          <Button width='40%' type='button' onClick={() => handleOpenModal(_id, name, message)}>Open Message</Button>
                        </FlexContainer>
                ))}
            </StyledPermissionContainer>
            <Modal modalTitle="View messages" handleCloseModal={closeModal} toggleModal={toggleModal}>
                <StyledFlexContainer width="100%">
                        <StyledRow justifyContent='center' width="100%" alignItems='center'>
                            <p style={{textAlign:"center"}}>{modalContent.name}</p>
                        </StyledRow>
                    <StyledRow lastElement  justifyContent='center' width="100%" alignItems='center'>
                      <p>{modalContent.message}</p>
                    </StyledRow>

                </StyledFlexContainer>
            </Modal>
        </>
    );
};

export default Messages;