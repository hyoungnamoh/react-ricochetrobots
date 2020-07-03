import React, { useEffect, useState } from 'react';
import { walls } from './setting';
import Robot from './Robot';
import { MOVE_ROBOT_REQUEST, PUSH_ROBOTINDEX_REQUEST, REPLACE_ROBOTINDEX_REQUEST } from './App';

const Td = ({ targetRobotKey, endOfGame, tableData, rowData, rowIndex, colIndex, colData, robotPositions, points, dispatch, currentRobot, robotIndexs }) => {
  const [leftWall, setLeftWall] = useState(tableData[colIndex][rowIndex].left);
  const [rightWall, setRightWall] = useState(tableData[colIndex][rowIndex].right);
  const [topWall, setTopWall] = useState(tableData[colIndex][rowIndex].top);
  const [bottomWall, setBottomWall] = useState(tableData[colIndex][rowIndex].bottom);
  const [isRobotHere, setIsRobotHere] = useState(tableData[colIndex][rowIndex].isRobotHere);
  const [robotKey, setRobotKey] = useState(0);
  const [isPoint, setIsPoint] = useState(false);
  const [isTargetPoint, setIsTargetPoint] = useState(tableData[colIndex][rowIndex].isTargetPoint);

  useEffect(() => {
    // 테두리
    if (colIndex === 0) {
      setTopWall(true);
    }
    if (colIndex === 15) {
      setBottomWall(true);
    }
    if (rowIndex === 0) {
      setLeftWall(true);
    }
    if (rowIndex === 15) {
      setRightWall(true);
    }

    // 목표 지점들
    if (tableData[colIndex][rowIndex].isPoint) {
      setIsPoint(true);
    }

  }, []);

  useEffect(() => {
    // dispatch 해서 테이블 데이터 바꾸면 로봇 키와 로봇 위치 업데이트
    setRobotKey(tableData[colIndex][rowIndex].robotKey);
    setIsRobotHere(tableData[colIndex][rowIndex].isRobotHere);
    // 로봇 들 키값 부여
  }, [tableData]);

  const moveRobot = (i) => {
    if (!topWall && currentRobot) {
      dispatch({
        type: MOVE_ROBOT_REQUEST,
        robotKey: robotKey - 1,
        movedIndex: [robotPositions[robotKey - 1][0] - 1, robotPositions[robotKey - 1][1]],
      });
    }
  }

  const styles = {
    tdStyle: {
      borderLeft: leftWall ? 'solid 5px red' : 'solid 1px black',
      borderRight: rightWall ? 'solid 5px red' : 'solid 1px black',
      borderTop: topWall ? 'solid 5px red' : 'solid 1px black',
      borderBottom: bottomWall ? 'solid 5px red' : 'solid 1px black',
      backgroundColor: isTargetPoint ? 'black' : isPoint ? 'violet' :  null,
    },
    robotWrapper: {
      display: 'flex',
      justifyContent: 'center',
    }
  }
  return (
    <>
      <td style={styles.tdStyle}>
        {colIndex} / {rowIndex}
        <div style={styles.robotWrapper}>
          {isRobotHere && (robotKey !== 0) && <Robot endOfGame={endOfGame} tableData={tableData} robotKey={robotKey} dispatch={dispatch} moveRobot={moveRobot} currentRobot={currentRobot} colIndex={colIndex} rowIndex={rowIndex} isTargetRobotKey={targetRobotKey === robotKey}/>}
        </div>
      </td>
    </>
  );
}

export default Td;