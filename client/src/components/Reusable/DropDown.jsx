import React, {useRef, useState} from 'react';
import {ReactComponent as ArrowIcon} from '../../assets/svg/dropdown-icon.svg';
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {StyledDropDownContainer, StyledItem, StyledListItemContainer, StyledTitle} from "../../styled/dropDown.styled";


const DropDown = ({items, value, onCLickHandler, dropDownDisplay, mobileDisplay}) => {
    const [toggle, setToggle] = useState(false);
    const ref = useRef(null)
    useOnClickOutside(ref, () => setToggle(false))

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
                        onClick={() => onCLickHandler({name: item.name, value: item.value})}
                    >
                        {item.name}
                    </StyledItem>
                ))}
            </StyledListItemContainer>
            <ArrowIcon/>
        </StyledDropDownContainer>
    );
};

export default React.memo(DropDown);


