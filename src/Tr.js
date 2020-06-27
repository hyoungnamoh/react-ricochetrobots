import React from 'react';
import Td from './Td';

const Tr = ({ colData, colIndex, tableData, robotPositions, points, dispatch, currentRobot }) => {
    return (
        <>
            <tr>
                {colData.map((item, index) => (
                    <Td rowData={item} rowIndex={index} tableData={tableData} colData={colData} colIndex={colIndex} robotPositions={robotPositions} points={points} dispatch={dispatch} currentRobot={currentRobot} />
                ))}
            </tr>
        </>

    );
}

export default Tr;