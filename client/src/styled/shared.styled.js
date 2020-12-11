import styled from 'styled-components';


export const H1 = styled.h1`
  font-size: 36px;
  color: ${({theme}) => theme.text};
  text-align: ${({textAlign}) => textAlign ? textAlign : 'center'};
  margin: 0;
  font-weight: bold;
`

export const StyledForm = styled.form`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 360px;
  flex-direction: column;
  align-items: center;
  padding: 60px 15px 0 15px;
`