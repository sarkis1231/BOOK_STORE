import React, {useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as ArrowIcon} from '../../assets/svg/dropdown-icon.svg';
import useOnClickOutside from "../../hooks/useOnClickOutside";



const DropDown = ({items, value, onCLickHandler, dropDownDisplay, mobileDisplay}) => {
    const [toggle, setToggle] = useState(false);
    const ref = useRef(null)
    useOnClickOutside(ref, () =>  setToggle(false))

    return (
        <StyledDropDownContainer
            ref={ref}
            toggleIcon={toggle}
            onClick={() => setToggle(prev => !prev)}
            mobileDisplay={mobileDisplay}
            dropDownDisplay={dropDownDisplay}
        >
            <StyledTitle>{value.name}</StyledTitle>
            <StyledListItemContainer toggleMenu={toggle}>
                {items.map(item => (
                <StyledItem
                    key={item.id}
                    onClick={() => onCLickHandler({name: item.name, value:item.value})}
                >
                    {item.name}
                </StyledItem>
                ))}
            </StyledListItemContainer>
            <ArrowIcon />
        </StyledDropDownContainer>
    );
};

const StyledDropDownContainer = styled(FlexContainer)`
  display: ${({dropDownDisplay}) => dropDownDisplay ? dropDownDisplay : 'flex'};
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  width: 80px;
   svg {
      ${({ toggleIcon }) => toggleIcon
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
export default React.memo(DropDown);


const StyledTitle = styled.p`
   color: ${({theme}) => theme.dropDown.color};
   font-size: 14px;
   text-align: center;
   margin: 0 auto;
`

const StyledListItemContainer = styled(FlexContainer)`
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 30px;
  left: 0;
  right: 0;
  width: 100%;
  background: ${({theme}) => theme.dropDown.bgColor};
  
  overflow: hidden;
   ${({toggleMenu}) => toggleMenu ?
    css` max-height: 220px; overflow: hidden;`
    :
    css`max-height: 0;`
};
    transition: all .3s ease;
`
const StyledItem = styled.p`
  color: ${({theme}) => theme.dropDown.color};
  margin: 0;
  padding: 10px;
  font-size: 14px;
`

