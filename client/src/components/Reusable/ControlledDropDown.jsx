import React, {useState, useEffect, forwardRef} from 'react';
import {ReactComponent as ArrowIcon} from '../../assets/svg/dropdown-icon.svg';
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {StyledDropDownContainer, StyledItem, StyledListItemContainer, StyledTitle} from "../../styled/dropDown.styled";


const ControlledDropDown = forwardRef(({dropDownDisplay, mobileDisplay, control, name, defaultValue}, ref) => {
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState(() => defaultValue);

    useOnClickOutside(ref, () => setToggle(false))
    useEffect(() => {
        setData(prev => [...prev, {id: 0, name: 'Math', value: 'math'}, {id: 1, name: 'Sex', value: 'sex'}])
    }, [])

    return (
        <>
            <input name={name} type="hidden" value={value.value} ref={ref}/>
            <StyledDropDownContainer
                ref={ref}
                toggleIcon={toggle}
                onClick={() => setToggle(prev => !prev)}
                mobileDisplay={mobileDisplay}
                dropDownDisplay={dropDownDisplay}
            >
                <StyledTitle>{value.name}</StyledTitle>
                <StyledListItemContainer toggleMenu={toggle}>
                    {data.map(({id, value, name}) => (
                        <StyledItem
                            key={id}
                            onClick={() => setValue((prev) => ({...prev, value, name}))}
                        >
                            {name}
                        </StyledItem>
                    ))}
                </StyledListItemContainer>
                <ArrowIcon/>
            </StyledDropDownContainer>
        </>
    );
});


export default ControlledDropDown;


