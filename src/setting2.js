const positionsArray = [];
const movedHistory = [];

export const initRobotPosition = (options) => {
  const colIndex = Array(15).fill().map((v, i) => i + 1);
  const rowIndex = Array(15).fill().map((v, i) => i + 1);
  for (let i = 0; i < 4; i++) {
    let position = [];
    const col = colIndex.splice(Math.floor(Math.random() * colIndex.length), 1)[0];
    const row = rowIndex.splice(Math.floor(Math.random() * rowIndex.length), 1)[0];
    // const col = 7;
    // const row = 7;
    if ((col === 7 && row === 7) || (col === 7 && row === 8) || (col === 8 && row === 7) || (col === 8 && row === 8)) {
      --i;
      continue;
    }
    position.push(col);
    position.push(row);

    positionsArray.push(position);
    // rowIndex.splice(Math.floor(Math.random() * rowIndex.length);
  }
  return positionsArray;
}

export const initTableData = (col, row, robotPostions, walls) => {
  let table = [];
  let robotKey = 1;
  let points = []; // 포인트들 모아 둔 배열, 이 중에 랜덤으로 목표지점 설정
  for (let i = 0; i < col; i++) {
    table.push([]);
    for (let j = 0; j < row; j++) {
      if (robotPostions.filter(position => position[0] === i && position[1] === j).length !== 0) {
        table[i].push({ isRobotHere: true, robotKey: robotKey });
        robotKey++;
      } else {
        table[i].push({});
      }
      if (i === 0) {
        table[i][j].top = true;
      }
      if (i === 15) {
        table[i][j].bottom = true;
      }
      if (j === 0) {
        table[i][j].left = true;
      }
      if (j === 15) {
        table[i][j].right = true;
      }
      walls.forEach(wall => {
        if (wall.index[0] === i && wall.index[1] === j) {
          if (Object.keys(wall).length > 2 && !(wall.top && wall.bottom) && !(wall.right && wall.left)) {
            table[i][j].isPoint = true;
            points.push([i, j]);
          }
          if (wall.top) {
            table[i][j].top = wall.top;
          }
          if (wall.bottom) {
            table[i][j].bottom = wall.bottom;
          }
          if (wall.left) {
            table[i][j].left = wall.left;
          }
          if (wall.right) {
            table[i][j].right = wall.right;
          }
          walls.splice(0, 1);
        }
      });
    }
  }
  // 목표지점 랜덤으로 설정
  let targetPoint = points.splice(Math.floor(Math.random() * points.length), 1)[0];
  // 혹시 목표 지점이랑 로봇 위치랑 겹칠까봐..
  while (table[targetPoint[0]][targetPoint[1]].isRobotHere) {
    targetPoint = points.splice(Math.floor(Math.random() * points.length), 1)[0];
  }
  table[targetPoint[0]][targetPoint[1]].isTargetPoint = true;
  return table;
}

const moveLeft = (tableData, col, row, robotKey) => {
  let moveDepth = 1;
  let stop = false;
  let rowIndex = row - moveDepth;
  if(stop) {
    return;
  }
  if(tableData[col][row].isTargetPoint) {
    stop = true;
    console.log('find~!', col, row, robotKey);
  }

  // 이동할 위치 index가 0보다 크고, 이동 전 위치에 왼쪽 벽이 없고, stop이 아니면 한칸 이동
  if (rowIndex >= 0 && !tableData[col][row].left && !stop && !tableData[col][rowIndex].isRobotHere) {
    tableData[col][rowIndex].isRobotHere = tableData[col][row].isRobotHere; // 옮겨진 곳에 로봇 생성
    tableData[col][rowIndex].robotKey = tableData[col][row].robotKey; // 기존에 있던 로봇 인덱스 복사
    tableData[col][row].isRobotHere = false; // 기존에 있던 로봇 삭제
    tableData[col][row].robotKey = 0; // 기존에 있던 로봇 인덱스 삭제
    return moveLeft(tableData, col, rowIndex, robotKey);
  } else {
    stop = true;
    // if(movedHistory.length > 1) {
    //   movedHistory.splice(0, 1);
    // }
    // movedHistory.push([col, row]);
    return { col, row, robotKey };
  }
}
const moveTop = (tableData, col, row, robotKey) => {
  let moveDepth = 1;
  let stop = false;
  let colIndex = col - moveDepth;
  if(stop) {
    return;
  }
  if(tableData[col][row].isTargetPoint) {
    stop = true;
    console.log('find~!', col, row, robotKey);
  }
  if (colIndex >= 0 && !tableData[col][row].top && !stop) {
    return moveTop(tableData, colIndex, row, robotKey);
  } else {
    stop = true;
    // if(movedHistory.length > 1) {
    //   console.log('moveTop movedHistory shift before', movedHistory);
    //   movedHistory.splice(0, 1);
    //   console.log('moveTop movedHistory shift after', movedHistory);
    // }
    // movedHistory.push([col, row]);
    return { col, row };
  }
}

const moveBottom = (tableData, col, row, robotKey) => {
  let moveDepth = 1;
  let stop = false;
  let colIndex = col + moveDepth;
  if(stop) {
    return;
  }
  if(tableData[col][row].isTargetPoint) {
    stop = true;
    console.log('find~!', col, row, robotKey);
  }
  if (colIndex < 16 && !tableData[col][row].bottom && !stop) {
    return moveBottom(tableData, colIndex, row, robotKey);
  } else {
    stop = true;
    // if(movedHistory.length > 1) {
    //   movedHistory.splice(0, 1);
    // }
    // movedHistory.push([col, row]);
    return { col, row };
  }
}

const moveRight = (tableData, col, row, robotKey) => {
  let moveDepth = 1;
  let stop = false;
  let rowIndex = row + moveDepth;
  if(stop) {
    return;
  }
  if(tableData[col][row].isTargetPoint) {
    stop = true;
    console.log('find~!', col, row, robotKey);
  }
  if (rowIndex < 16 && !tableData[col][row].right && !stop) {
    return moveRight(tableData, col, rowIndex, robotKey);
  } else {
    stop = true;
    // if(movedHistory.length > 1) {
    //   movedHistory.splice(0, 1);
    // }
    // movedHistory.push([col, row]);
    return { col, row };
  }
}


const ifLeft = (tableData, startCol, startRow, robotKey, indexHistory = []) => {
  let movedIndex;
  let movedCol;
  let movedRow;

  //이부분
  if (indexHistory.includes(startCol + startRow)) {
    // console.log('중복', indexHistory, startCol + startRow);
    return;
  } else {
    indexHistory.push(startCol + startRow);
    // console.log('indexHistory', indexHistory, startCol + startRow);


    count++;

    movedIndex = moveLeft(tableData, startCol, startRow, robotKey);
    movedCol = movedIndex.col;
    movedRow = movedIndex.row;

    if (count > 1000) {
      return true;
    }
    if (!tableData[movedCol][movedRow].top) { // 쭉 이동한 위치에서 윗쪽 벽이 없으면 위로 쭉 이동, (오른쪽은 할 필요 없는 듯)
      ifTop(tableData, movedCol, movedRow, robotKey, indexHistory);
      return false;
    } else if (!tableData[movedCol][movedRow].bottom) {
      ifBottom(tableData, movedCol, movedRow, robotKey, indexHistory);
      return false;
    } else if (!tableData[movedCol][movedRow].right){
      ifRight(tableData, movedCol, movedRow, robotKey, indexHistory);
    }
  }

}

const ifRight = (tableData, startCol, startRow, robotKey, indexHistory = []) => {
  let movedIndex;
  let movedCol;
  let movedRow;


  // console.log('indexHistory', indexHistory, startCol + startRow);
  if (indexHistory.includes(startCol + startRow)) {
    // console.log('중복', indexHistory, startCol + startRow);
    return;
  } else {
    indexHistory.push(startCol + startRow);
    prevFunc = 'ifRight';
    count++;

    movedIndex = moveRight(tableData, startCol, startRow, robotKey);
    movedCol = movedIndex.col;
    movedRow = movedIndex.row;
    if (count > 1000 || prevFunc === 'ifLeft') {
      return true;
    }
    if (!tableData[movedCol][movedRow].top) { // 쭉 이동한 위치에서 윗쪽 벽이 없으면 위로 쭉 이동, (오른쪽은 할 필요 없는 듯)
      ifTop(tableData, movedCol, movedRow, robotKey, indexHistory);
      return false;
    } else if (!tableData[movedCol][movedRow].bottom) {
      ifBottom(tableData, movedCol, movedRow, robotKey, indexHistory);
      return false;
    } else if (!tableData[movedCol][movedRow].left){
      ifLeft(tableData, movedCol, movedRow, robotKey, indexHistory);
    }
  }

}

const ifBottom = (tableData, startCol, startRow, robotKey, indexHistory = []) => {
  let movedIndex;
  let movedCol;
  let movedRow;


  // console.log('indexHistory', indexHistory, startCol + startRow);
  if (indexHistory.includes(startCol + startRow)) {
    // console.log('중복', indexHistory, startCol + startRow);
    return;
  } else {
    indexHistory.push(startCol + startRow);
    prevFunc = 'ifBottom';
    count++;

    movedIndex = moveBottom(tableData, startCol, startRow, robotKey);
    movedCol = movedIndex.col;
    movedRow = movedIndex.row;
    if (count > 1000 || prevFunc === 'ifTop') {
      return true;
    }
    if (!tableData[movedCol][movedRow].left) { // 쭉 이동한 위치에서 윗쪽 벽이 없으면 위로 쭉 이동, (오른쪽은 할 필요 없는 듯)
      ifLeft(tableData, movedCol, movedRow, robotKey, indexHistory);
      return false;
    } else if (!tableData[movedCol][movedRow].right) {
      ifRight(tableData, movedCol, movedRow, robotKey, indexHistory);
      return false;
    } else if (!tableData[movedCol][movedRow].left){
      ifTop(tableData, movedCol, movedRow, robotKey, indexHistory);
    }
  }

}
const ifTop = (tableData, startCol, startRow, robotKey, indexHistory = []) => {
  // console.log('count: ' + count);
  let movedIndex;
  let movedCol;
  let movedRow;

  // console.log('indexHistory', indexHistory, startCol + startRow);
  if (indexHistory.includes(startCol + startRow)) {
    // console.log('중복', indexHistory, startCol + startRow);
    return;
  } else {
    indexHistory.push(startCol + startRow);
    prevFunc = 'ifTop';
    count++;

    movedIndex = moveTop(tableData, startCol, startRow, robotKey, indexHistory);
    movedCol = movedIndex.col;
    movedRow = movedIndex.row;
    if (count > 1000 || prevFunc === 'ifBottom') {
      return true;
    }
    if (!tableData[movedCol][movedRow].left) { // 쭉 이동한 위치에서 윗쪽 벽이 없으면 위로 쭉 이동, (오른쪽은 할 필요 없는 듯)
      ifLeft(tableData, movedCol, movedRow, robotKey, indexHistory);
      return false;
    } else if (!tableData[movedCol][movedRow].right) {
      ifRight(tableData, movedCol, movedRow, robotKey, indexHistory);
      return false;
    } else if (!tableData[movedCol][movedRow].left){
      ifBottom(tableData, movedCol, movedRow, robotKey, indexHistory);
    }
  }

}

let end;
let count = 0;
let prevFunc = '';
export const pathComputing = (table, robotPostions) => {
  const tableData = JSON.parse(JSON.stringify(table)); //깊은 복사
  console.log('pathComputing',);
  robotPostions.splice(4);
  //시작점
  let startCol;
  let startRow;

  //혼자 돌아다녔을 때 갈 수 있는 위치 찾기
  for (let i = 0; i < 4; i++) {
    startCol = robotPostions[i][0];
    startRow = robotPostions[i][1];
    const robotKey = tableData[startCol][startRow].robotKey;
    if (!tableData[startCol][startRow].left) { // 각 첫번째 로봇부터 왼쪽 벽이 없으면 왼쪽으로 쭉 이동
      end = ifLeft(tableData, startCol, startRow, robotKey);
    } else if (!tableData[startCol][startRow].right) {
      end = ifRight(tableData, startCol, startRow, robotKey);
    } else if (!tableData[startCol][startRow].top) {
      end = ifTop(tableData, startCol, startRow, robotKey);
    } else if (!tableData[startCol][startRow].bottom) {
      end = ifBottom(tableData, startCol, startRow, robotKey);
    }
  }

  //하나씩 돌려보기

}

export const walls =
  [
    {
      index: [0, 3],
      right: true,
    },
    {
      index: [0, 4],
      left: true,
    },
    {
      index: [0, 11],
      right: true,
    },
    {
      index: [0, 12],
      left: true,
    },
    {
      index: [0, 13],
      bottom: true,
    },
    {
      index: [1, 5],
      right: true,
    },
    {
      index: [1, 6],
      left: true,
      bottom: true,
    },
    {
      index: [1, 12],
      right: true,
    },
    {
      index: [1, 13],
      left: true,
      top: true,
    },
    {
      index: [2, 1],
      bottom: true,
    },
    {
      index: [2, 6],
      top: true,
    },
    {
      index: [2, 9],
      right: true,
      bottom: true,
    },
    {
      index: [3, 1],
      top: true,
      right: true,
    },
    {
      index: [3, 2],
      left: true,
    },
    {
      index: [3, 5],
      bottom: true,
    },
    {
      index: [3, 9],
      top: true,
    },
    {
      index: [3, 15],
      bottom: true,
    },
    {
      index: [4, 4],
      right: true,
    },
    {
      index: [4, 5],
      left: true,
      top: true,
    },
    {
      index: [4, 15],
      top: true,
    },
    {
      index: [5, 2],
      bottom: true,
      right: true,
    },
    {
      index: [5, 3],
      left: true,
    },
    {
      index: [5, 7],
      bottom: true,
      right: true,
    },
    {
      index: [5, 11],
      bottom: true,
    },
    {
      index: [5, 13],
      right: true,
    },
    {
      index: [5, 14],
      left: true,
      bottom: true,
    },
    {
      index: [6, 0],
      bottom: true,
    },
    {
      index: [6, 2],
      top: true,
    },
    {
      index: [6, 7],
      top: true,
      bottom: true,
    },
    {
      index: [6, 8],
      bottom: true,
    },
    {
      index: [6, 11],
      top: true,
      right: true,
    },
    {
      index: [6, 14],
      top: true,
    },
    {
      index: [7, 0],
      top: true,
    },
    {
      index: [7, 6],
      right: true,
    },
    {
      index: [7, 9],
      left: true,
    },
    {
      index: [8, 1],
      bottom: true,
    },
    {
      index: [8, 5],
      bottom: true,
    },
    {
      index: [8, 6],
      right: true,
    },
    {
      index: [8, 9],
      left: true,
    },
    {
      index: [9, 1],
      top: true,
      right: true,
    },
    {
      index: [9, 2],
      left: true,
    },
    {
      index: [9, 4],
      right: true,
    },
    {
      index: [9, 5],
      left: true,
      top: true,
    },
    {
      index: [9, 7],
      top: true,
    },
    {
      index: [9, 8],
      top: true,
    },
    {
      index: [9, 15],
      bottom: true,
    },
    {
      index: [10, 0],
      bottom: true,
    },
    {
      index: [10, 8],
      bottom: true,
      right: true,
    },
    {
      index: [10, 9],
      left: true,
    },
    {
      index: [10, 13],
      bottom: true,
    },
    {
      index: [10, 15],
      top: true,
    },
    {
      index: [11, 0],
      top: true,
    },
    {
      index: [11, 8],
      top: true,
    },
    {
      index: [11, 12],
      right: true,
    },
    {
      index: [11, 13],
      left: true,
      top: true,
    },
    {
      index: [12, 6],
      bottom: true,
      right: true,
    },
    {
      index: [12, 7],
      left: true,
    },
    {
      index: [13, 6],
      top: true,
    },
    {
      index: [13, 8],
      right: true,
    },
    {
      index: [13, 9],
      left: true,
      bottom: true,
    },
    {
      index: [13, 14],
      bottom: true,
    },
    {
      index: [14, 1],
      right: true,
    },
    {
      index: [14, 2],
      left: true,
      bottom: true,
    },
    {
      index: [14, 9],
      top: true,
    },
    {
      index: [14, 14],
      top: true,
      right: true,
    },
    {
      index: [14, 15],
      left: true,
    },
    {
      index: [15, 4],
      right: true,
    },
    {
      index: [15, 5],
      left: true,
    },
    {
      index: [15, 10],
      right: true,
    },
    {
      index: [15, 11],
      left: true,
    },
  ]