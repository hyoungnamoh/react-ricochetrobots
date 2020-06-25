import React, { useEffect, useState } from 'react';
import { walls } from './setting';
import Robot from './Robot';

const Td = ({ tableData, rowData, rowIndex, colIndex, colData, robotPositions, points }) => {
  const [leftWall, setLeftWall] = useState(false);
  const [rightWall, setRightWall] = useState(false);
  const [topWall, setTopWall] = useState(false);
  const [bottomWall, setBottomWall] = useState(false);
  const [isRobotHere, setIsRobotHere] = useState(false);
  const [robotKey, setRobotKey] = useState(0);
  const [isPoint, setIsPoint] = useState(false);

  //벽 배치
  useEffect(() => {
    for (let i = 0; i < walls.length; i++) {
      if (walls[i].index[0] === colIndex && walls[i].index[1] === rowIndex) {
        setLeftWall(walls[i].left);
        setRightWall(walls[i].right);
        setTopWall(walls[i].top);
        setBottomWall(walls[i].bottom);
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




  const styles = {
    tdStyle: {
      borderLeft: leftWall ? 'solid 5px red' : 'solid 1px black',
      borderRight: rightWall ? 'solid 5px red' : 'solid 1px black',
      borderTop: topWall ? 'solid 5px red' : 'solid 1px black',
      borderBottom: bottomWall ? 'solid 5px red' : 'solid 1px black',
      backgroundColor: robotKey === 1 ? 'red' : robotKey === 2 ? 'orange' : robotKey === 3 ? 'yellow' : robotKey === 4 ? 'green' : isPoint ? 'violet' : null,
    },
    robotWrapper: {
      // display: 'flex',
      // justifyContent: 'center',
      // width:'15px',
      // height: '15px',
    }
  }
  // if(robotKey !== 0) {
  //   console.log(robotKey, colIndex, rowIndex);
  // }
  return (
    <>
      <td style={styles.tdStyle}>
        {/* {colIndex} / {rowIndex} */}
        <div style={styles.robotWrapper}>
          {isRobotHere && <Robot />}
        </div>
      </td>
    </>
  );
}

export default Td;