import styled from 'styled-components'

export const FlexContainer = styled.div`
  display: flex;
  width: ${({ width }) => width};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-wrap: ${({ flexWrap }) => (flexWrap ? 'wrap' : 'nowrap')};
  flex-grow: ${({ flexGrow }) => (flexGrow ? 1 : 'initial')};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  cursor: ${({ cursor }) => cursor};
  position: relative;
@media only screen and (max-width: 970px) {
width: ${({ mobileWidth }) => mobileWidth};
padding: ${({ mobilePadding }) => mobilePadding};
flex-direction: ${({ mobileFlexDirection }) => mobileFlexDirection};   
justify-content: ${({ mobileJustifyContent }) => mobileJustifyContent};
align-items: ${({ mobileAlignItems }) => mobileAlignItems};   
}
@media only screen and (max-width: 500px) {
width: ${({ miniWidth }) => miniWidth};
}
`;

export const FlexItem = styled.div`
  flex: ${({ flex }) => flex};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width};
@media only screen and (max-width: 970px) {
    width: ${({ mobileWidth }) => mobileWidth};
    padding: ${({ mobilePadding }) => mobilePadding};
    flex-direction: ${({ mobileFlexDirection }) => mobileFlexDirection};   
    justify-content: ${({ mobileJustifyContent }) => mobileJustifyContent}; 
    margin: ${({ mobileMargin }) => mobileMargin};  
  }
`;

export const FixedContainer = styled(FlexContainer)`
  max-width: 1440px;
  flex-grow: 1;
  justify-content: center;
`;