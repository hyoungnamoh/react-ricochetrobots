import React, { useReducer } from 'react';
import Table from './Table';
const initialState = {
    tableData: Array(16).fill('').map(() => Array(16).fill('')),
    wallInfo: {
      left: false,
      right: false,
      top: false,
      bottom: false,
    },
}

const reducer = (state, action) => {

}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{display: 'flex', justifyContent: 'center',}}>
      <Table tableData={state.tableData} wallInfo={state.wallInfo}/>
    </div>
  );
}

export default App;
