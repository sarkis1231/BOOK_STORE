import React from 'react';
import styled from 'styled-components';
import {dateYearFormat} from "../../utils";
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as EditIcon} from '../../assets/svg/edit.svg'
import {ReactComponent as DeleteIcon} from '../../assets/svg/delete.svg'
import {ReactComponent as PermissionIcon} from '../../assets/svg/user.svg'
import {ReactComponent as PasswordIcon} from '../../assets/svg/secure.svg'
import usePagination from "../../hooks/usePagination";
import {ReactComponent as NextIcon} from '../.././assets/svg/nextArrow.svg'
import {useTranslation} from "react-i18next";


const Table = ({header, body, actionsTypes, editAction, deleteAction, passwordAction, permissionAction, margin}) => {
    const {t} = useTranslation()
    const {slicedData, currentPage, nextPage, prevPage, pagination} = usePagination(5, body, 1)
    return (
        <StyledTableContainer margin={margin}>
            <StyledTable>
                <StyledThead>
                    <tr>
                        {actionsTypes && <StyledTd>{t('table.actions')}</StyledTd>}
                        {Object.values(header).map(item => (

                            <StyledTd key={item}>{t(`${item}`)}</StyledTd>
                        ))}
                    </tr>
                </StyledThead>
                <tbody>
                {slicedData.length ? slicedData.map(item => (
                    !((item['role'] && item['role']) === 'Admin') ?
                        <tr key={item._id}>
                            {actionsTypes ? <StyledTd>
                                <FlexContainer justifyContent='space-around' width='100%'>
                                    {/*eslint-disable-next-line*/}
                                    {actionsTypes.map(action => {
                                        switch (action) {
                                            case 'EDIT':
                                                return (
                                                    <EditIcon key={action}
                                                              onClick={editAction ? () => editAction({...item}) : null}/>
                                                )
                                            case 'DELETE':
                                                return (
                                                    <DeleteIcon className="deleteIcon" key={action}
                                                                onClick={deleteAction ? () => deleteAction({...item}) : null}/>
                                                )
                                            case 'PERMISSION':
                                                return (
                                                    <PermissionIcon className="permissionIcon" key={action}
                                                                    onClick={permissionAction ? () => permissionAction({...item}) : null}/>
                                                )
                                            case 'PASSWORD':
                                                return (
                                                    <PasswordIcon key={action}
                                                                    onClick={passwordAction ? () => passwordAction(item?._id) : null}/>
                                                )
                                            default:
                                                break;
                                        }
                                    })}
                                </FlexContainer>
                            </StyledTd> : null}
                            {Object.keys(header).map(key => (
                                key === 'createdAt' ?
                                    (<StyledTd key={key}>{dateYearFormat(item[key])}</StyledTd>)
                                    :
                                    (<StyledTd key={key}>{item[key]}</StyledTd>)
                            ))}
                        </tr> : null
                )) : null}
                </tbody>
            </StyledTable>
            <StyledPaginationContainer pagination={pagination.length > 1} prev={currentPage === 1}
                                       next={currentPage === pagination.length} justifyContent='center'>

                <NextIcon className='pervIcon' onClick={(e) => prevPage(e)}/>
                <p>{currentPage}</p>
                <NextIcon className='nextIcon' onClick={(e) => nextPage(e)}/>
            </StyledPaginationContainer>
        </StyledTableContainer>
    )
}

export default Table;

const StyledTableContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-grow: initial;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  margin: ${({margin}) => margin ? margin : '40px 0'};
  box-shadow: ${({theme}) => theme.boxShadow};
  border-radius: 25px;
  background: ${({theme}) => theme.table.background};

  ::-webkit-scrollbar {
    width: 30px;

  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${({theme}) => theme.table.background};
    border-radius: 10px;
    background: ${({theme}) => theme.table.scrollBarColor};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.table.background};
    border-radius: 10px;
    border: 5px solid transparent;
    background-clip: content-box;
  }
`
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const StyledThead = styled.thead`
  font-weight: bold;
  font-size: 20px;
  border-bottom: ${({theme}) => theme.table.border};
`

const StyledTd = styled.td`
  color: ${({theme}) => theme.table.color};
  text-align: center;
  font-size: 16px;
  width: calc(100% / 4);
  padding: 20px;

  :last-child {
    border-right: none;
  }

  svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill: ${({theme}) => theme.editDeleteIcon};
  }
  @media (max-width: 1030px) {
    .deleteIcon {
      margin: 0 10px;
    }
    .permissionIcon {
      margin: 0 10px 0 0;
    }
  }
`

const StyledPaginationContainer = styled(FlexContainer)`
  border-top: ${({theme}) => theme.table.border};
  align-items: center;
  padding: 10px;
  visibility: ${({pagination}) => pagination ? 'visible' : 'hidden'};
  opacity: ${({pagination}) => pagination ? '1' : '0'};
  transition: all 0.3s ease;

  > svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${({theme}) => theme.nextPrevIcon};
    }

  }

  .pervIcon {
    transform: rotateY(-180deg);
    cursor: ${({prev}) => prev ? 'not-allowed' : 'pointer'};
  }

  .nextIcon {
    cursor: ${({next}) => next ? 'not-allowed' : 'pointer'};
  }

  p {
    margin: 0 10px;
  }
`