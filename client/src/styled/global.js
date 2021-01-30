import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
html{
  height: 100%;
}
  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    transition: all 0.25s linear;
    min-height: 100%;
    position: relative;
    overflow-x: hidden;
  }
`