import React, {useRef} from 'react';
import styled, {css} from 'styled-components';
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as CloseIcon} from '../../assets/svg/close.svg';
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {Overlay} from "../../styled/shared.styled";

const Modal = ({toggleModal, handleCloseModal, modalTitle, children, maxWidth, id}) => {
    const ref = useRef(null);
    useOnClickOutside(ref, () => handleCloseModal() ? handleCloseModal() : null);
    return (
            <StyledOverlay toggleModal={toggleModal}>
                <StyledModalContainer maxWidth={maxWidth} ref={ref} toggleModal={toggleModal} id={id}>
                    <ModalTitle>{modalTitle}</ModalTitle>
                    <CloseIcon className='close-icon' onClick={() => handleCloseModal()}/>
                    <StyledModalContent>
                        {children}
                    </StyledModalContent>
                </StyledModalContainer>
            </StyledOverlay>
    );
};

export default Modal;


const StyledOverlay = styled(Overlay)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({theme}) => theme.modal.overlayBackground};;
  z-index: 999;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  ${({toggleModal}) => toggleModal ? css`
            opacity: 1;
            visibility: visible;
          `
          :
          ''};
  transition: all .3s ease;

  .close-icon {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 15px;

    path {
      fill: ${({theme}) => theme.text};
    }
  }

  @media only screen and (max-width: 500px) {
    transform: unset;
    visibility: hidden;
    ${({toggleModal}) => toggleModal ? css`
              visibility: visible;
            `
            :
            ''};
  }

`;

const StyledModalContainer = styled(FlexContainer)`
  flex-direction: column;
  background: ${({theme}) => theme.modal.bgColor};
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  max-width: ${({maxWidth}) => maxWidth || '400px'};
  transform: translateY(-1000px);
  ${({toggleModal}) => toggleModal ?  css`
           transform: translateY(0);
       `
          :
          ''};
  transition: all .3s ease;
}
   @media only screen and (max-width: 500px) {
   transform: translateY(547px);
   max-width: unset;
   bottom: 0;
   width: 100%;
   ${({toggleModal}) => toggleModal ?  css`
           transform: translateY(0);
       `
    :
    ''};
   transition: all .3s ease;
   }
`

const ModalTitle = styled.h3`
  margin: 0;
  text-align: center;
  font-size: 23px;
  font-weight: 600;
  color: ${({theme}) => theme.modal.color};
`

const StyledModalContent = styled.div`
  margin-top: 30px;
  max-height: 600px;
  overflow-y: auto;
  @media only screen and (max-width: 500px) {
    max-height: 1000px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

`