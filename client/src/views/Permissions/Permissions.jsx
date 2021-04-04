import React, {useState} from 'react';
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import {FlexContainer} from "../../styled/layout.styled";
import Button from "../../components/Reusable/Button";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Reusable/Modal";

const Permissions = () => {
    const usersPermission = useFetch('/permissions');
    const [genre, setGenre] = useState([])
    const {toggleModal, openModal, closeModal} = useModal()
    console.log(usersPermission)
    const handleOpenModal = (genre) => {
        setGenre(genre)
        openModal()
    }
    console.log(genre)
    return (
        <>
            <FlexContainer flexDirection="column" width='50%'>
                {usersPermission.map(({_id, uid, genre}) => (
              uid && uid._id !== "60605074f89e2605888850f7" ?
                        <FlexContainer key={_id} justifyContent='space-between' margin='0 0 10px'>
                        <p>{uid && uid.email}</p>
                        <Button width='40%' type='button' onClick={() => handleOpenModal(genre)}>Permissions</Button>
                    </FlexContainer> : null
                ))}
            </FlexContainer>
            <Modal modalTitle="View Permissions" handleCloseModal={closeModal} toggleModal={toggleModal}>
                <StyledFlexContainer width="100%">
                    <StyledRow justifyContent='space-between' width="100%" alignItems='center'>
                        <p>Genre</p>
                        <p>Limit</p>
                    </StyledRow>
                    {genre.map(({id:{name}, limit}) => (
                        <StyledRow lastElement={genre[genre.length - 1].id.name === name}  key={name} justifyContent='space-between' width="100%" alignItems='center'>
                            <p>{name}</p>
                            <p>{limit}</p>
                        </StyledRow>
                    ))}

                </StyledFlexContainer>
            </Modal>
        </>
    );
};

export default Permissions;

const StyledFlexContainer = styled(FlexContainer)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 600px;
  overflow-y: auto;
  p{
    width: 40%;
    text-align: center;
  }
`

const StyledRow = styled(FlexContainer)`
  border-bottom: ${({theme, lastElement}) => lastElement ? '' : theme.table.border};
`