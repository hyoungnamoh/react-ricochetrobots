import React, { useReducer } from 'react';
import Table from './Table';

const initialState = {
  tableData: [['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],
              ['','','','','','','','','','','','','','','','',],],
  walls: [
    {
      position: [0,3],
      right: true,
    },
    {
      position: [0,4],
      left: true,
    },
    {
      position: [0,9],
      right: true,
    },
    {
      position: [0,10],
      left: true,
    },
    {
      position: [1,0],
      right: true,
    },
    {
      position: [1,1],
      left: true,
      bottom: true,
    },
    {
      position: [1,6],
      bottom: true,
    },
    {
      position: [1,13],
      right: true,
      bottom: true,
    },
    {
      position: [1,15],
      bottom: true,
    },
    {
      position: [2,6],
      top: true,
      right: true,
    },
    {
      position: [2,7],
      left: true,
    },
    {
      position: [2,9],
      bottom: true,
    },
    {
      position: [2,13],
      top: true,
    },
    {
      position: [2,15],
      top: true,
    },
  ]
            
  
}

const reducer = (state, action) => {

}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{display: 'flex', justifyContent: 'center',}}>
      <Table tableData={state.tableData}/>
    </div>
  );
}

export default App;
