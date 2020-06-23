import React, { useReducer } from 'react';
import Table from './Table';
import { initRobotPosition } from './setting';

const initialState = {
    tableData: Array(16).fill('').map(() => Array(16).fill('')),
    wallInfo: {
      left: false,
      right: false,
      top: false,
      bottom: false,
    },
    robotPositions: initRobotPosition(),

}

const reducer = (state, action) => {

}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state.robotPositions', state.robotPositions);

  return (
    <div style={{display: 'flex', justifyContent: 'center',}}>
      <Table tableData={state.tableData} wallInfo={state.wallInfo} robotPositions={state.robotPositions}/>
    </div>
  );
}

export default App;
