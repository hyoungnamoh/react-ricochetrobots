import React, { useEffect, useState } from 'react';
import { walls } from './setting';
import Robot from './Robot';
import { MOVE_ROBOT_REQUEST } from './App';

const Td = ({ tableData, rowData, rowIndex, colIndex, colData, robotPositions, points, dispatch, currentRobot }) => {
  const [leftWall, setLeftWall] = useState(false);
  const [rightWall, setRightWall] = useState(false);
  const [topWall, setTopWall] = useState(false);
  const [bottomWall, setBottomWall] = useState(false);
  const [isRobotHere, setIsRobotHere] = useState(false);
  const [robotKey, setRobotKey] = useState(0);
  const [isPoint, setIsPoint] = useState(false);
  const [robotIndex, setRobotIndex] = useState([]);
  //벽 배치
  useEffect(() => {
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

    for (let i = 0; i < walls.length; i++) {
      if (walls[i].index[0] === colIndex && walls[i].index[1] === rowIndex) {
        walls[i].left && setLeftWall(walls[i].left);
        walls[i].right && setRightWall(walls[i].right);
        walls[i].top && setTopWall(walls[i].top);
        walls[i].bottom && setBottomWall(walls[i].bottom);
        return;
      }
    }
  }, []);

  //로봇 배치
  useEffect(() => {
    robotPositions.forEach((element, index) => {
      if (element[0] === colIndex && element[1] === rowIndex) {
        setIsRobotHere(true);
        setRobotKey(index + 1);
        setRobotIndex([colIndex, rowIndex]);
      }
    });

    // 목표 지점들
    const pointFilter = points.filter(point => point.index[0] === colIndex && point.index[1] === rowIndex && !(point.right && point.left) && !(point.top && point.bottom));
    pointFilter.forEach(point => {
      if (point.index[0] === colIndex && point.index[1] === rowIndex) {
        setIsPoint(true);
      }
    });
  }, []);
  
  const moveRobot = () => {
    console.log(topWall, currentRobot);
    if (!topWall && currentRobot) {
      dispatch({
        type: MOVE_ROBOT_REQUEST,
        robotKey: robotKey - 1,
        // movedIndex: robotPositions[robotKey][],
      });
    }
  }

  const styles = {
    tdStyle: {
      borderLeft: leftWall ? 'solid 5px red' : 'solid 1px black',
      borderRight: rightWall ? 'solid 5px red' : 'solid 1px black',
      borderTop: topWall ? 'solid 5px red' : 'solid 1px black',
      borderBottom: bottomWall ? 'solid 5px red' : 'solid 1px black',
      backgroundColor: isPoint ? 'violet' : null,
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
          {isRobotHere && <Robot robotKey={robotKey} dispatch={dispatch} moveRobot={moveRobot} currentRobot={currentRobot} />}
        </div>
      </td>
    </>
  );
}

export default Td;