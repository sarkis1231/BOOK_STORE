import React from 'react';
import {FlexContainer} from "../../styled/layout.styled";
import Button from "./Button";

const DeleteModalContent = ({value, closeModal, handleDelete}) => {
    return (
        <>
            <p>Are you sure you want to delete {value}</p>
            <FlexContainer justifyContent='space-between'>
                <Button width='48%' onClick={() => closeModal()}>Cancel</Button>
                <Button width='48%' onClick={() => handleDelete(value)}>Delete</Button>
            </FlexContainer>
        </>
    );
};

export default DeleteModalContent;