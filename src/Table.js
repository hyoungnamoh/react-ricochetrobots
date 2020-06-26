import React from 'react';
import Tr from './Tr';

const Table = ({tableData, wallInfo, robotPositions, points}) => {
    return (
            <table>
                {tableData.map((item, index) => (
                    <Tr colData={item} colIndex={index} tableData={tableData} robotPositions={robotPositions} points={points}/>
                ))}
            </table>
    );
}

export default Table;