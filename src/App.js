import React, { useReducer, useEffect } from 'react';
import Table from './Table';
import { initRobotPosition, walls } from './setting';


const initialState = {
  tableData: Array(16).fill('').map(() => Array(16).fill('')),
  wallInfo: {
    left: false,
    right: false,
    top: false,
    bottom: false,
  },
  robotPositions: initRobotPosition(),
  points: walls.filter(wall => Object.keys(wall).length > 2),
  currentRobot: 0,
  onKeyDown: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ONKEYDOWN_ARROWUP_REQUEST': 
      console.log('ONKEYDOWN_ARROWUP_REQUEST');
      break;
    default:
      break;
  }

}


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onKeyDownApp = (e) => {
    console.log(e.key);
    if(e.key === 'ArrowUp'){
      dispatch({
        type: 'ONKEYPRESS_ARROWUP_REQUEST',
      });
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', }} onKeyDown={onKeyDownApp} tabIndex='0'>
      <Table tableData={state.tableData} wallInfo={state.wallInfo} robotPositions={state.robotPositions} points={state.points} />
    </div>
  );
}

export default App;
