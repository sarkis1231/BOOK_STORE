import React from 'react';
import styled, { css } from 'styled-components';

const data = {
    headerItem: [
        "sako", "koza", "hovik", "aro",
    ],

    bodyTable: [
        [
            1, 2, 3, 4,
        ],
        [
            6, 7, 8, 9,
        ],

    ]
}




const Table = () => {

    return (
        <StyledTableContainer>
            <StyledTable>
                <StyledThead>
                    <tr>
                        {data.headerItem.map((item, index) => (
                            <StyledTd key={index}>{item}</StyledTd>
                        ))}
                    </tr>

                </StyledThead>
                <tbody>
                    {data.bodyTable.map((row, index) => (
                        <tr key={index}>{row.map((column, index) => (
                            <StyledTd key={index}>{column}</StyledTd>
                        ))}</tr>
                    ))}

                </tbody>

            </StyledTable>

        </StyledTableContainer>
    )
}

export default Table;

const StyledTableContainer = styled.div`
display: flex;
border: none;
justify-content: center;
width:80%;



`
const StyledTable = styled.table`
width: 100%;
background: ${({ theme }) => theme.table.background};
border-radius: 10px;
`

const StyledThead = styled.thead`
    font-weight: bold;
    font-size: 20px;
    border-bottom: ${({ theme }) => theme.table.border};
`

const StyledTd = styled.td`
border:none;
color: ${({ theme }) => theme.table.color};
text-align: center;
font-size: 16px;


`