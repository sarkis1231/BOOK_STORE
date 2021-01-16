import React from 'react';
import styled from 'styled-components';

const Button = ({ type, children, onClick, margin, width }) => {
  return (
    <>
      <StyledButton margin={margin} type={type} width={width} onClick={onClick ? () => onClick() : null}>
        {children}
      </StyledButton>
    </>
  );
};

const StyledButton = styled.button`
  width: ${({ width }) => width ? width : '100%'};
  border-radius: 10px;
  padding: 10px;
  outline: none;
  border: none;
  margin: ${({ margin }) => margin};
  color: ${({ theme }) => theme.button.color};
  background: ${({ theme }) => theme.button.bgColor};
  &:focus {
    outline: none;
  }
  
`

export default Button;