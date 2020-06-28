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
  points: walls.filter(wall => Object.keys(wall).length > 2), //walls 에서 가져오기 떄문에 테두리는 포함 안됨
  currentRobot: 0,
  onKeyDown: '',
  robotIndexs: [],
}

export const ONKEYDOWN_ARROWUP_REQUEST = 'ONKEYDOWN_ARROWUP_REQUEST';
export const ONCLICK_ROBOT_REQUEST = 'ONCLICK_ROBOT_REQUEST';
export const PUSH_ROBOTINDEX_REQUEST = 'PUSH_ROBOTINDEX_REQUEST';
export const REPLACE_ROBOTINDEX_REQUEST = 'REPLACE_ROBOTINDEX_REQUEST';
export const MOVE_ROBOT_REQUEST = 'MOVE_ROBOT_REQUEST'; // 로봇 포지션 바꿔줄 친구

const reducer = (state, action) => {
  switch (action.type) {
    case ONKEYDOWN_ARROWUP_REQUEST:
      return {
        ...state,
      }
    case ONCLICK_ROBOT_REQUEST:
      state.currentRobot = action.robotKey;
      return {
        ...state,
      }
    case MOVE_ROBOT_REQUEST:
      // state.currentRobot = action.robotKey;
      // console.log('state.robotPositions', state.robotPositions);
      // console.log('action.movedIndex', action.movedIndex);
      // state.robotPositions[state.currentRobot - 1] = action.movedIndex;
      const robotPositions = [...state.robotPositions];
      robotPositions[state.currentRobot - 1] = action.movedIndex;
      // console.log('robotPositions', robotPositions);
      return {
        ...state,
        robotPositions,
      }
    case PUSH_ROBOTINDEX_REQUEST:
      console.log('PUSH_ROBOTINDEX_REQUEST');
      const robotIndexs = [...state.robotIndexs];
      robotIndexs.push(action.index);
      // console.log('action.index', action.index);
      // console.log('robotIndexs', robotIndexs);
      return {
        ...state,
        robotIndexs,
      }
    case REPLACE_ROBOTINDEX_REQUEST:
      console.log(action.key, action.index);
      const spliceIndexs = [...state.robotIndexs];
      spliceIndexs.splice(action.key - 1, 0, action.index);
      console.log('spliceIndexs', spliceIndexs);
      return {
        ...state,
        robotIndexs: spliceIndexs,
      }
    default:
      return {
        ...state,
      }
  }
}


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log('state.robotPositions', state.robotPositions);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', }} >
      <Table tableData={state.tableData} wallInfo={state.wallInfo} robotPositions={state.robotPositions} points={state.points} dispatch={dispatch} currentRobot={state.currentRobot} robotIndexs={state.robotIndexs} />
    </div>
  );
}

export default App;
