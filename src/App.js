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

}

const reducer = (state, action) => {

}


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{display: 'flex', justifyContent: 'center',}}>
      <Table tableData={state.tableData} wallInfo={state.wallInfo} robotPositions={state.robotPositions} points={state.points}/>
    </div>
  );
}

export default App;
