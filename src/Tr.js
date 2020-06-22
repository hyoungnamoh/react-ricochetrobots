import React from 'react';
import Td from './Td';

const Tr = ({ colData, colIndex, tableData }) => {
    return (
        <>
            <tr>
                {colData.map((item, index) => (
                    <Td rowData={item} rowIndex={index} tableData={tableData} colData={colData} colIndex={colIndex}/>
                ))}
            </tr>
        </>

    );
}

export default Tr;