import React, {useRef, useState} from 'react';
import {FlexContainer} from "../../styled/layout.styled";
import {StyledLabel} from "../../styled/shared.styled";
import {StyledDropDownContainer, StyledItem, StyledListItemContainer, StyledTitle} from "../../styled/dropDown.styled";
import {ReactComponent as ArrowIcon} from "../../assets/svg/dropdown-icon.svg";
import styled from "styled-components";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const PermissionDropDown = ({
                                handleClick,
                                label,
                                list,
                                opacity,
                                mobileDisplay,
                                dropDownDisplay,
                                pointerEvents,
                                width,
                                defaultName,
                                disabled,
                                idx
                            }) => {
    const [toggle, setToggle] = useState(false)
    const [nameS, setName] = useState(defaultName)
    const REF = useRef(null)
    useOnClickOutside(REF, () => setToggle(false))
    const click = (name, value, index) => {
        setName(name)
        handleClick(name,value, index)
    }
    return (
        <>
            <FlexContainer flexDirection='column' width={width ? width : '100%'}>
                {label && <StyledLabel>{label}</StyledLabel>}
                <StyledControlledDropDownContainer
                    type='button'
                    disabled={disabled}
                    ref={REF}
                    toggleIcon={toggle}
                    onClick={() => setToggle(prev => !prev)}
                    mobileDisplay={mobileDisplay}
                    dropDownDisplay={dropDownDisplay}
                    pointerEvents={pointerEvents}
                    opacity={opacity}
                >
                    <StyledControlledTitle>{nameS}</StyledControlledTitle>
                    <StyledControlledListItemContainer top='45px' borderRadius toggleMenu={toggle}>
                        {list.map(({value, name}) => (
                            <StyledItem
                                key={name}
                                onClick={() => click(name, value, idx)}
                            >
                                {name}
                            </StyledItem>
                        ))}
                    </StyledControlledListItemContainer>
                    <ArrowIcon/>
                </StyledControlledDropDownContainer>
            </FlexContainer>
        </>
    );
};

export default PermissionDropDown;

const StyledControlledDropDownContainer = styled(StyledDropDownContainer)`
  justify-content: space-between;
  width: 90%;
  position: relative;
  background: ${({theme}) => theme.input.bgColor};
  border: ${({theme}) => `1px solid ${theme.input.border}`};
  padding: 10px;
  border-radius: 10px;
  margin: 0;
  opacity: ${({opacity}) => opacity};
  pointer-events: ${({pointerEvents}) => pointerEvents};
`
const StyledControlledTitle = styled(StyledTitle)`
  color: ${({theme}) => theme.input.color};
`
const StyledControlledListItemContainer = styled(StyledListItemContainer)`
  background: ${({theme}) => theme.dropDown.bgColor};

`