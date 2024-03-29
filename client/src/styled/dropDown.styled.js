import styled, {css} from "styled-components";
import {FlexContainer} from "./layout.styled";

const StyledDropDownContainer = styled(FlexContainer)`
  display: ${({dropDownDisplay}) => dropDownDisplay ? dropDownDisplay : 'flex'};
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  width: 80px;

  svg {
    margin-left: 5px;
    ${({toggleIcon}) => toggleIcon
            ? css`
              transform: rotateZ(-180deg);
            `
            : css`
              transform: rotateZ(-360deg);
            `};
    transition: all .3s ease;

    path {
      fill: ${({theme}) => theme.dropDown.color};
    }
  }

  @media only screen and (max-width: 970px) {
    display: ${({mobileDisplay}) => mobileDisplay};
  }
`


const StyledTitle = styled.p`
  color: ${({theme}) => theme.dropDown.color};
  font-size: 14px;
  text-align: center;
  margin: 0;
`

const StyledListItemContainer = styled(FlexContainer)`
  flex-direction: column;
  position: absolute;
  justify-content: flex-start;
  align-items: center;
  top: ${({top}) => top ? top : '30px'};
  left: 0;
  right: 0;
  width: 100%;
  border-radius: ${({borderRadius}) => borderRadius ? "10px" : '10px'};
  background: ${({theme}) => theme.dropDown.bgColor};
  z-index: 2;

  overflow: hidden;
  ${({toggleMenu}) => toggleMenu ?
          css` max-height: 220px;
            overflow: auto;
            border: ${({theme}) => `1px solid ${theme.dropDown.border}`};
          ;
          `
          :
          css`max-height: 0;   border: 0 solid transparent;`
  };
  transition: all .3s ease;
`
const StyledItem = styled.p`
  color: ${({theme}) => theme.dropDown.color};
  margin: 0;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  text-align: center;
  font-weight: bold;
`

export {StyledDropDownContainer, StyledTitle, StyledListItemContainer, StyledItem}

