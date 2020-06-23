import React from 'react';
import Td from './Td';

const Tr = ({ colData, colIndex, tableData, robotPositions }) => {
    return (
        <>
            <tr>
                {colData.map((item, index) => (
                    <Td rowData={item} rowIndex={index} tableData={tableData} colData={colData} colIndex={colIndex} robotPositions={robotPositions}/>
                ))}
            </tr>
        </>

    );
}

export default Tr;