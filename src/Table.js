import React from 'react';
import Tr from './Tr';

const Table = ({tableData, wallInfo, robotPositions, points}) => {
    // console.log(tableData);
    // const col = Array(tableData.col).fill();
    return (
            <table>
                {tableData.map((item, index) => (
                    <Tr colData={item} colIndex={index} tableData={tableData} robotPositions={robotPositions} points={points}/>
                ))}
            </table>
    );
}

export default Table;