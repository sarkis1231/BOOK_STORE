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
            <table>
                <thead>
                    <tr>
                        {data.headerItem.map((item, index) => (
                            <StyledTd key={index}>{item}</StyledTd>
                        ))}
                    </tr>

                </thead>
                <tbody>
                    {data.bodyTable.map((row, index) => (
                        <tr key={index}>{row.map((column, index) => (
                            <StyledTd key={index}>{column}</StyledTd>
                        ))}</tr>
                    ))}

                </tbody>

            </table>

        </StyledTableContainer>
    )
}

export default Table;

const StyledTableContainer = styled.div`

border: ${({ theme }) => theme.table.border};

`

const StyledTd = styled.td`
border: ${({ theme }) => theme.table.border};
color: ${({ theme }) => theme.table.color};
text-align: center;
width: 200px;


`