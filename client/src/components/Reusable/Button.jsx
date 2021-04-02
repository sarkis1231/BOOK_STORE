import React from 'react';
import styled from 'styled-components';

const Button = ({ type, children, onClick, margin, width,alignSelf, disabled }) => {
  return (
    <>
      <StyledButton margin={margin} disabled={disabled} type={type} width={width} alignSelf={alignSelf} onClick={onClick ? () => onClick() : null}>
        {children}
      </StyledButton>
    </>
  );
};

const StyledButton = styled.button`
  width: ${({ width }) => width ? width : '100%'};
  border-radius: 20px;
  padding: 15px;
  outline: none;
  border: none;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  margin: ${({ margin }) => margin};
  color: ${({ theme }) => theme.button.color};
  background: ${({ theme }) => theme.button.bgColor};
  box-shadow: ${({theme}) => theme.button.boxShadow};
  align-self: ${({alignSelf})=>alignSelf};
  &:focus {
    outline: none;
  }
  
  &:disabled{
    opacity: .7;
    cursor: not-allowed;
  }
  
`

export default Button;