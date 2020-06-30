import React, { useEffect, useState, useCallback } from 'react';
import { ONCLICK_ROBOT_REQUEST } from './App';


const Robot = ({ robotKey, dispatch, moveRobot, colIndex, rowIndex }) => {
  const styles = {
    robotStyle: {
      width: '30px',
      height: '30px',
      display: 'flex',
      backgroundColor: robotKey === 1 ? 'red' : robotKey === 2 ? 'orange' : robotKey === 3 ? 'yellow' : robotKey === 4 ? 'green' : null,
      borderRadius: 15,
    },
  }

  const onKeyDownApp = (e) => {
    if (e.key === 'ArrowUp') {
      console.log('hi');
      dispatch({
        type: 'ONKEYDOWN_ARROWUP_REQUEST',
        // direction: 'top',
        colIndex,
        rowIndex,
      });
    }
  }

  const onClickRobot = useCallback(() => {
    dispatch({
      type: ONCLICK_ROBOT_REQUEST,
      robotKey: robotKey,

    });
  }, []);

  return (
    <div style={styles.robotStyle} onClick={onClickRobot} onKeyDown={onKeyDownApp} tabIndex={0}>
    </div>
  )
}

export default Robot;