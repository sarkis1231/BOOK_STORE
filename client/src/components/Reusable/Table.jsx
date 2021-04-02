import React from 'react';
import styled from 'styled-components';
import {dateYearFormat} from "../../utils";
import {FlexContainer} from "../../styled/layout.styled";
import {ReactComponent as EditIcon} from '../../assets/svg/edit.svg'
import {ReactComponent as DeleteIcon} from '../../assets/svg/delete.svg'
import {ReactComponent as PermissionIcon} from '../../assets/svg/user.svg'


const Table = ({header, body, actionsTypes, editAction, deleteAction,permissionAction, margin}) => {

    return (
        <StyledTableContainer margin={margin}>
            <StyledTable>
                <StyledThead>
                    <tr>
                        {actionsTypes && <StyledTd>Actions</StyledTd>}
                        {Object.values(header).map(item => (

                            <StyledTd key={item}>{item}</StyledTd>
                        ))}
                    </tr>
                </StyledThead>
                <tbody>
                {body.length ? body.map(item => (
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
                                                    <DeleteIcon key={action}
                                                                onClick={deleteAction ? () => deleteAction({...item}) : null}/>
                                                )
                                            case 'PERMISSION':
                                                return (
                                                    <PermissionIcon key={action}
                                                              onClick={permissionAction ? () => permissionAction({...item}) : null}/>
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
        </StyledTableContainer>
    )
}

export default Table;

const StyledTableContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-grow: initial;
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

`