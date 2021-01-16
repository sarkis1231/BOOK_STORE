import React from 'react';
import styled from 'styled-components';

const data = {
    headerItem: [
        "name", "category", "author", "price",
    ],

    bodyTable: [
        [
            "ssss", "history", "sako", 500,
        ],
        [
            "pppp", "sports", "philip", 400,
        ],
        [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
        ], [
            "pppp", "sports", "philip", 400,
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
height: 50vh;
overflow: auto;

::-webkit-scrollbar {
  width: 30px;
  
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px ${({ theme }) => theme.table.background} ; 
  border-radius: 10px;
  background: ${({ theme }) => theme.table.scrollBarColor};
}
::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.table.background};
  border-radius: 10px;
  border: 5px solid transparent ;
  background-clip: content-box; 
}
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
border-right: ${({ theme }) => theme.table.border};
color: ${({ theme }) => theme.table.color};
text-align: center;
font-size: 16px;
width: calc(100%/4);
padding: 10px 0;

 :last-child{
    border-right: none;
}

`