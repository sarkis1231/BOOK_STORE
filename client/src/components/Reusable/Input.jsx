import React, {useRef, useState, forwardRef} from 'react';
import styled, {css} from 'styled-components';
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as SearchIcon} from "../../assets/svg/search.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {StyledLabel, StyledSpan} from "../../styled/shared.styled";

const Input = forwardRef(({
                              label,
                              error,
                              name,
                              placeHolder,
                              type,
                              searchDisplay,
                              mobileDisplay,
                              margin,
                              inputType,
                              value,
                              serverError,
                              onFileChange,
                          }, ref) => {

    const [expandInput, setExpandInput] = useState(false);
    const dropDownRf = useRef(null)
    useOnClickOutside(dropDownRf, () => setExpandInput(false))
    switch (type) {
        case 'searchBar':
            return (
                <StyledFlexContainer
                    ref={dropDownRf}
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
                    <StyledLine expandInput={expandInput}/>
                </StyledFlexContainer>
            )
        case 'file':
            return (
                <FlexContainer flexDirection='column' margin={margin} width='100%'>
                    {label && <StyledLabel>{label}</StyledLabel>}
                    <StyledInputFileLabel>
                        <StyledInputFile type={type} onChange={onFileChange ? (e) => onFileChange(e) : null} name={name} ref={ref}/>
                        <StyledInputFileSpan>{placeHolder}...</StyledInputFileSpan>
                    </StyledInputFileLabel>
                    <StyledSpan errors={error || serverError}>
                        {error && error[name] &&  error[name].message}
                    </StyledSpan>
                </FlexContainer>
            )
        default:
            return (
                <FlexContainer flexDirection='column' width='100%' margin={margin}>
                    {label && <StyledLabel>{label}</StyledLabel>}
                    <StyledInput ref={ref} type={inputType} opacity='0' defaultValue={value} name={name} placeholder={placeHolder}/>
                    <StyledSpan errors={error || serverError}>
                        {(error && error[name] && error[name].message) || (serverError && serverError[name])}
                    </StyledSpan>
                </FlexContainer>
            );
    }

});


export default Input;


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
  }
;
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
    }

  ;
  }
`


const StyledInput = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: ${({theme}) => `2px solid ${theme.input.border}`};
  outline: none;
  color: ${({theme}) => theme.input.color};
  background: ${({theme}) => theme.input.bgColor};

  &::placeholder {
    color: ${({theme}) => theme.input.color};
    opacity: 0.7;
  }

  &:focus {
    border: ${({theme}) => `2px solid ${theme.input.focused}`};

    &::placeholder {
      color: ${({theme}) => theme.input.color};
      opacity: 0;
    }
  }

  transition: all .3s ease;

`


const StyledSearch = styled.input`
  padding: 10px 0 10px 0;
  border: 0;
  outline: none;
  color: ${({theme}) => theme.input.color};
  background: transparent;
  font-size: 16px;

  &::placeholder {
    color: ${({theme}) => theme.input.color};
    opacity: 0.7;
  }

  @media only screen and (max-width: 970px) {
    width: 70%;
  }


  ${({expandInput}) => expandInput ?
          css`
            max-width: 155px;
            opacity: 1;
            visibility: visible;`
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
          css`max-width: 155px;
            opacity: 1;
            right: 24px;`
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


const StyledInputFileLabel = styled.label`
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 2.5rem;
  width: 100%;
`

const StyledInputFileSpan = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: 2.5rem;
  padding: .5rem 1rem;
  line-height: 1.5;
  color: ${({theme}) => theme.inputFile.color};
  background-color: ${({theme}) => theme.inputFile.bgColor};
  border: ${({theme}) => `1px solid ${theme.inputFile.border}`};
  border-radius: .25rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    content: "Browse";
    padding: 15px;
    color: ${({theme}) => theme.inputFile.button.color};
    background: ${({theme}) => theme.inputFile.button.bgColor};
    border-radius: 0 .25rem .25rem 0;
    font-size: 12px;
    display: flex;
    align-items: center;
  }

  &:after {
    content:"";
  }
`

const StyledInputFile = styled.input.attrs('file')`
  visibility: hidden;
  opacity: 0;
  &:before {
    visibility: visible;
    content: 'Select some files';
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }

`