import React, {useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as SearchIcon } from "../../assets/svg/search.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Input = ({label, error, name, placeHolder, type, searchDisplay, mobileDisplay, margin, inputType}) => {
    const [expandInput, setExpandInput] = useState(false);
    const ref = useRef(null)
    useOnClickOutside(ref, () =>  setExpandInput(false))
    switch (type) {
        case 'searchBar':
            return (
                <StyledFlexContainer
                    ref={ref}
                    expandInput={expandInput}
                    searchDisplay={searchDisplay}
                    mobileDisplay={mobileDisplay}
                >
                    <StyledSearch
                        expandInput={expandInput}
                        name={name}
                        placeholder={placeHolder}
                    />
                    <SearchIcon
                        onClick={() => setExpandInput(() => true)}
                    />
                    <StyledLine  expandInput={expandInput}/>
                </StyledFlexContainer>
            )
        default:
            return (
                <FlexContainer flexDirection='column' width='100%' margin={margin}>
                    {label && <StyledLabel>{label}</StyledLabel>}
                    <StyledInput type={inputType} name={name} placeholder={placeHolder}/>
                    {error && <StyledSpan>{error}</StyledSpan>}
                </FlexContainer>
            );
    }

};


const StyledFlexContainer = styled(FlexContainer)`
  display: ${({searchDisplay}) => searchDisplay};
  align-items: center;
  width: 200px;
  justify-content: flex-end;
  svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
    fill: ${({theme}) => theme.input.color};
    transform: rotate(75deg);
  };
  transition: all .3s ease;
  @media only screen and (max-width: 970px) {
   display: ${({mobileDisplay}) => mobileDisplay};
    width: 70%;
    svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill: ${({theme}) => theme.input.color};
    transform: rotate(75deg);
  };
  }
`


const StyledLabel = styled.label`
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  margin-bottom: 2px;
  color: ${({theme}) => theme.color}
`

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: ${({theme}) => `2px solid ${theme.input.border}`};
  outline: none;
  color: ${({theme}) => theme.input.color};
  background: ${({theme}) => theme.input.bgColor};
    &::placeholder{
    color: ${({theme}) => theme.input.color};
    opacity: 0.7;
  }
  &:focus {
    border: ${({theme}) => `2px solid ${theme.input.focused}`};
    &::placeholder{
        color: ${({theme}) => theme.input.color};
        opacity: 0;
    }
  }
  transition: all .3s ease;

`

const StyledSpan = styled.span`
  color: ${({theme}) => theme.error};
  margin-top: 2px;
  font-size: 12px;
  font-weight: 600;
`

const StyledSearch = styled.input`
  padding: 10px 0 10px 0;
  border: 0;
  outline: none;
  color: ${({theme}) => theme.input.color};
  background: transparent;
  font-size: 16px;
    &::placeholder{
    color: ${({theme}) => theme.input.color};
    opacity: 0.7;
  }
  
  @media only screen and (max-width: 970px) {
     width: 70%;
  }

  
  ${({expandInput}) => expandInput ? 
    css`
    max-width: 155px; opacity: 1; visibility: visible;` 
    :
    css`  
      max-width: 0;
      opacity: 0;
      visibility: hidden;
    `
  };
  transition: all .3s ease;
`

const StyledLine = styled.div`
  position: absolute;
  height: 2px;
  width: 100%;
  bottom: 0;
  background: ${({theme}) => theme.input.color};;
   ${({expandInput}) => expandInput ?
    css`max-width: 155px; opacity: 1; right: 24px;`
    :
    css`  
      max-width: 0;
      opacity: 0;
      right: 0;
    `
};
    
   @media only screen and (max-width: 970px) {
      width: 70%;
   }
  transition: all .3s ease;
`

export default Input;