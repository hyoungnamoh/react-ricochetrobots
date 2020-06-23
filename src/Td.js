import React, { useEffect, useState } from 'react';
import { walls } from './setting';

const Td = ({ tableData, rowData, rowIndex, colIndex, colData, robotPositions }) => {
  const [leftWall, setLeftWall] = useState(false);
  const [rightWall, setRightWall] = useState(false);
  const [topWall, setTopWall] = useState(false);
  const [bottomWall, setBottomWall] = useState(false);
  const [isRobotHere, setIsRobotHere] = useState(false);

  useEffect(() => {
    for (let i = 0; i < walls.length; i ++) {
      if(walls[i].index[0] === colIndex && walls[i].index[1] === rowIndex) {
        setLeftWall(walls[i].left);
        setRightWall(walls[i].right);
        setTopWall(walls[i].top);
        setBottomWall(walls[i].bottom);
        return;
      }
    }
  }, []);
  
  useEffect(() => {
    robotPositions.forEach((element, index) => {
      if(element[0] === colIndex && element[1] === rowIndex) {
        console.log(colIndex, rowIndex);
        setIsRobotHere(true);
      }
    });
  }, []);
  
  const styles = {
    borderLeft: leftWall ? 'solid 5px red' : 'solid 1px black',
    borderRight: rightWall ? 'solid 5px red' : 'solid 1px black',
    borderTop: topWall ? 'solid 5px red' : 'solid 1px black',
    borderBottom: bottomWall ? 'solid 5px red' : 'solid 1px black',
    backgroundColor: isRobotHere ? 'red' : null,
  }
  return (
    <>
      <td style={styles}>
        {colIndex} / {rowIndex}
      </td>
    </>
  );
}

export default Td;