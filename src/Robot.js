import React, { useEffect, useState, useCallback } from 'react';
import { ONCLICK_ROBOT_REQUEST, ONKEYDOWN_ARROWUP_REQUEST, ONKEYDOWN_ARROWLEFT_REQUEST, ONKEYDOWN_ARROWDOWN_REQUEST, ONKEYDOWN_ARROWRIGHT_REQUEST, ENDOFGAME_REQUEST } from './App';


const Robot = ({ endOfGame, robotKey, dispatch, moveRobot, colIndex, rowIndex, tableData, isTargetRobotKey }) => {
  useEffect(() => {
    console.log(isTargetRobotKey);
    if (tableData[colIndex][rowIndex].isTargetPoint && !endOfGame && isTargetRobotKey) { 
      console.log('goal');
      dispatch({
        type: ENDOFGAME_REQUEST,
        data: true,
      })
    }
  })


  const styles = {
    robotStyle: {
      width: '30px',
      height: '30px',
      display: 'flex',
      backgroundColor: robotKey === 1 ? 'red' : robotKey === 2 ? 'orange' : robotKey === 3 ? 'yellow' : robotKey === 4 ? 'green' : null,
      borderRadius: 15,
      // borderColor: isTargetRobotKey && 'black',
      // borderWidth: '2px',
      border: isTargetRobotKey && 'solid 2px black',
    },
  }
  const onKeyDownApp = (e) => {
    let type;
    if (e.key === 'ArrowUp' && !tableData[colIndex][rowIndex].top) {
      type = ONKEYDOWN_ARROWUP_REQUEST;
    }
    if (e.key === 'ArrowLeft' && !tableData[colIndex][rowIndex].left) {
      type = ONKEYDOWN_ARROWLEFT_REQUEST;
    }
    if (e.key === 'ArrowDown' && !tableData[colIndex][rowIndex].bottom) {
      type = ONKEYDOWN_ARROWDOWN_REQUEST;
    }
    if (e.key === 'ArrowRight' && !tableData[colIndex][rowIndex].right) {
      type = ONKEYDOWN_ARROWRIGHT_REQUEST;
    }
    dispatch({
      type,
      colIndex,
      rowIndex,
    });
  }

  const onClickRobot = useCallback(() => {
    dispatch({
      type: ONCLICK_ROBOT_REQUEST,
      robotKey: robotKey,
    });
  }, []);

  return (
    <div style={styles.robotStyle} onClick={onClickRobot} onKeyDown={onKeyDownApp} tabIndex={0} />
  )
}

export default Robot;