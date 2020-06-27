import React from 'react';
import Tr from './Tr';

const Table = ({tableData, wallInfo, robotPositions, points, dispatch, currentRobot }) => {
    return (
            <table>
                {tableData.map((item, index) => (
                    <Tr colData={item} colIndex={index} tableData={tableData} robotPositions={robotPositions} points={points} dispatch={dispatch} currentRobot={currentRobot}/>
                ))}
            </table>
    );
}

export default Table;