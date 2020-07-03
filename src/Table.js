import React from 'react';
import Tr from './Tr';

const Table = ({ targetRobotKey, endOfGame, tableData, wallInfo, robotPositions, points, dispatch, currentRobot, robotIndexs }) => {
    return (
        <table>
            {tableData.map((item, index) => (
                <Tr targetRobotKey={targetRobotKey} endOfGame={endOfGame} colData={item} colIndex={index} tableData={tableData} robotPositions={robotPositions} points={points} dispatch={dispatch} currentRobot={currentRobot} robotIndexs={robotIndexs} />
            ))}
        </table>
    );
}

export default Table;