import React, { useReducer, useEffect } from 'react';
import Table from './Table';
import { initRobotPosition, walls, initTableData } from './setting';


const initialState = {
  // tableData: Array(16).fill({}).map(() => Array(16).fill('')),
  tableData: initTableData(16, 16, initRobotPosition(), walls),
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
      const tableData = [...state.tableData];
      console.log(tableData[action.colIndex][action.rowIndex]);
      if(!tableData[action.colIndex][action.rowIndex].top) { //윗쪽 벽이 없어야 실행
        tableData[action.colIndex - 1][action.rowIndex].isRobotHere = tableData[action.colIndex][action.rowIndex].isRobotHere; // 옮겨진 곳에 로봇 생성
        tableData[action.colIndex - 1][action.rowIndex].robotKey = tableData[action.colIndex][action.rowIndex].robotKey; // 기존에 있던 로봇 인덱스 복사
        tableData[action.colIndex][action.rowIndex].isRobotHere = false; // 기존에 있던 로봇 삭제
        tableData[action.colIndex][action.rowIndex].robotKey = 0; // 기존에 있던 로봇 인덱스 삭제
      }
      return {
        ...state,
        tableData,
      }
    case ONCLICK_ROBOT_REQUEST:
      console.log(action.robotKey);
      state.currentRobot = action.robotKey;
      return {
        ...state,
      }
    case MOVE_ROBOT_REQUEST:
      const robotPositions = [...state.robotPositions];
      robotPositions[state.currentRobot - 1] = action.movedIndex;
      return {
        ...state,
        robotPositions,
      }
    case PUSH_ROBOTINDEX_REQUEST:
      // console.log('PUSH_ROBOTINDEX_REQUEST');
      const robotIndexs = [...state.robotIndexs];
      return {
        ...state,
        robotIndexs,
      }
    case REPLACE_ROBOTINDEX_REQUEST:
      // console.log('action.key, action.index', action.key, action.index);
      const spliceIndexs = [...state.robotIndexs];
      spliceIndexs.splice(action.key - 1, 1, action.index);
      // console.log('spliceIndexs', spliceIndexs);
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
  
  // initTableData(16, 16);
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state.tableData);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', }} >
      <Table tableData={state.tableData} wallInfo={state.wallInfo} robotPositions={state.robotPositions} points={state.points} dispatch={dispatch} currentRobot={state.currentRobot} robotIndexs={state.robotIndexs} />
    </div>
  );
}

export default App;
