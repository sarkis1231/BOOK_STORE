import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components'
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as SuccessIcon} from '../../assets/svg/checked.svg'
import {ReactComponent as ErrorIcon} from '../../assets/svg/error.svg'
import {ReactComponent as WarningIcon} from '../../assets/svg/warning.svg'

const Alert = ({show, setShow, message, severity, delay = 3000}) => {

    const handleShow = useCallback(() => {
        setShow(false)
    }, [setShow])

    useEffect(() => {
        let timerId = null;
        if (show) {
            timerId = setTimeout(() => {
                handleShow()
            }, delay)
        }
        return () => clearTimeout(timerId)
    }, [show, handleShow, delay])

    return (
        <StyledFlexContainer show={show} severity={severity}>
            {severity === 'error' && <ErrorIcon/>}
            {severity === 'success' && <SuccessIcon/>}
            {severity === 'warning' && <WarningIcon/>}
            <p>{message}</p>
        </StyledFlexContainer>
    );
};

export default Alert;

const StyledFlexContainer = styled(FlexContainer)`
  position: fixed;
  align-items: center;
  top: 20px;
  right: 10px;
  border-radius: 10px;
  width: 400px;
  padding: 20px;
  transform: ${({show}) => show ? 'translateX(-10px)' : 'translateX(800px)'};
  transition: all 0.3s ease;
  ${({severity, theme}) => severity === 'error' && `background:${theme.alert.errorBg}`};
  ${({severity, theme}) => severity === 'success' && `background:${theme.alert.successBg}`};
  ${({severity, theme}) => severity === 'warning' && `background:${theme.alert.warningBg}`};
  z-index: 1000;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    fill: ${({theme}) => theme.alert.color};
  }

  p {
    margin: 0;
    font-size: 14px;
    color: ${({theme}) => theme.alert.color};;
  }
`