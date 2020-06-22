import React, { useEffect, useState } from 'react';
import { walls } from './setting';

const Td = ({ tableData, rowData, rowIndex, colIndex, colData }) => {
  const [leftWall, setLeftWall] = useState(false);
  const [rightWall, setRightWall] = useState(false);
  const [topWall, setTopWall] = useState(false);
  const [bottomWall, setBottomWall] = useState(false);
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
  
  const styles = {
    borderLeft: leftWall ? 'solid 5px red' : 'solid 1px black',
    borderRight: rightWall ? 'solid 5px red' : 'solid 1px black',
    borderTop: topWall ? 'solid 5px red' : 'solid 1px black',
    borderBottom: bottomWall ? 'solid 5px red' : 'solid 1px black',
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