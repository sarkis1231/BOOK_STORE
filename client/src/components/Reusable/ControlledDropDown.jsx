import React, {useState, useEffect, forwardRef, useRef} from 'react';
import {ReactComponent as ArrowIcon} from '../../assets/svg/dropdown-icon.svg';
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {StyledDropDownContainer, StyledItem, StyledListItemContainer, StyledTitle} from "../../styled/dropDown.styled";
import axios from "axios";
import {filterDataControlledDropDown} from "../../utils";
import {FlexContainer} from "../../styled/layout.styled";
import {StyledLabel, StyledSpan} from "../../styled/shared.styled";
import styled from 'styled-components';


const ControlledDropDown = forwardRef(({
                                           dropDownDisplay,
                                           label,
                                           mobileDisplay,
                                           control,
                                           name,
                                           defaultValue,
                                           url,
                                           width,
                                           error,
    opacity,pointerEvents,
                                       }, ref) => {
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState(() => defaultValue);
    useEffect(() => {
        if(defaultValue) {
            setValue(() => defaultValue)
        }
        // eslint-disable-next-line
    }, [])
    const inputRef = useRef(null)
    useOnClickOutside(inputRef, () => setToggle(false))
    useEffect(() => {
        axios.get(url).then(res => {
            res.data.empty ? setData(() => []) : setData(() => filterDataControlledDropDown(res.data))
        }).catch(e => {
            console.log(e)
        })
    }, [url])

    return (
        <>
            <input name={name} type="hidden" value={value?.value} ref={ref}/>
            <FlexContainer flexDirection='column' width={width ? width : '100%'}>
                {label && <StyledLabel>{label}</StyledLabel>}
                <StyledControlledDropDownContainer
                    ref={inputRef}
                    toggleIcon={toggle}
                    type="button"
                    onClick={() => setToggle(prev => !prev)}
                    mobileDisplay={mobileDisplay}
                    dropDownDisplay={dropDownDisplay}
                    pointerEvents={pointerEvents}
                    opacity={opacity}
                >
                    <StyledControlledTitle>{value.name}</StyledControlledTitle>
                    <StyledControlledListItemContainer top='45px' borderRadius toggleMenu={toggle}>
                        {data.map(({value, name}) => (
                            <StyledItem
                                key={name}
                                onClick={() => setValue((prev) => ({...prev, value, name}))}
                            >
                                {name}
                            </StyledItem>
                        ))}
                    </StyledControlledListItemContainer>
                    <ArrowIcon/>
                </StyledControlledDropDownContainer>
                <StyledSpan errors={error}>{error && error[name] && error[name].message}</StyledSpan>
            </FlexContainer>
        </>
    );
});


export default ControlledDropDown;

const StyledControlledDropDownContainer = styled(StyledDropDownContainer)`
  justify-content: space-between;
  width: 100%;
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