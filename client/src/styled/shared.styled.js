import styled from 'styled-components';
import {FlexContainer} from "./layout.styled";


export const H1 = styled.h1`
  font-size: 36px;
  color: ${({theme}) => theme.text};
  text-align: ${({textAlign}) => textAlign ? textAlign : 'center'};
  margin: 0;
  font-weight: bold;
`

export const StyledForm = styled.form`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 360px;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px 0 15px;
`

export const Overlay = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({theme}) => theme.modal.overlayBackground};;
    z-index: ${({zIndex}) => zIndex ? zIndex : '2'};
`;

export const StyledLabel = styled.label`
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  margin-bottom: 2px;
  color: ${({theme}) => theme.color}
`

export const StyledSpan = styled.span`
  color: ${({theme}) => theme.error};
  margin-top: 2px;
  font-size: 12px;
  font-weight: 600;
  opacity: ${({errors}) => errors ? '1' : '0'};
  visibility: ${({errors}) => errors ? 'visible' : 'hidden'};
  transition: all .3s ease;
`

export const StyledPermissionContainer = styled(FlexContainer)`
  p {
    text-align: center;
  }

  @media only screen and (max-width: 500px) {
    p {
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    button {
      font-size: 12px;
      padding: 10px;
      width: 100px;
    }
  }
`

export const StyledFlexContainer = styled(FlexContainer)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
    width: 40%;
    text-align: center;
  }
`

export const StyledRow = styled(FlexContainer)`
  border-bottom: ${({theme, lastElement}) => lastElement ? '' : theme.table.border};
`
