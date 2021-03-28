import React, {Fragment} from 'react';
import styled from 'styled-components';
import {ReactComponent as NextIcon} from '../.././assets/svg/nextArrow.svg'
import {FlexContainer} from "../../styled/layout.styled";


const PaginationBar = ({pageNumber, next, prev, changePage}) => {
    console.log(next)
    return (

            <FlexContainer width="40%" justifyContent='space-around' alignItems="center">
            <StyledPrevIconContainer>
            <NextIcon onClick={(e)=> prev(e)}/>
            </StyledPrevIconContainer>
                {pageNumber.map( ({id, current, ellipsis}) => (
                    <Fragment key={id}>
                    <StyledNumber onClick={(e) =>  changePage(id, e)} current={current}>{id}</StyledNumber>
                        {ellipsis && <Span onClick={(e) => changePage(id, e)}>.....</Span>}
                    </Fragment>
                    ))}
                <StyledNextIconContainer>
                    <NextIcon onClick={(e)=> next(e)} />
                </StyledNextIconContainer>
            </FlexContainer>

    );
};

export default PaginationBar;

const StyledNextIconContainer = styled.div`
  height: 30px;
  cursor: pointer;
    svg{
      width: 30px;
      height: 30px;
      path{
        fill: ${({theme})=>theme.nextPrevIcon};
      }
    }
`
const StyledPrevIconContainer = styled(StyledNextIconContainer)`
  transform: rotateY(180deg);
`

const StyledNumber = styled.p`
  font-weight: ${({current}) => current ? "bold" : "normal"};
  border: ${({current, theme}) => current ? `3px solid ${theme.nextPrevIcon}` : `normal`};
  border-radius: ${({current}) => current ? `50%` : `0`};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const Span = styled.span`
  cursor: pointer;
  color:  ${({theme})=>theme.nextPrevIcon};
`