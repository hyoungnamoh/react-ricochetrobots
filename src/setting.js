const positionsArray = [];

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
  console.log(robotPostions);
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

const MoveLeft = (tableData, col, row) => {
  let moveDepth = 1;
  let stop = false;
  let rowIndex = row - moveDepth;
  if (!tableData[col][rowIndex].left && !stop && col > moveDepth && col > 0) {
    MoveLeft(tableData, col, rowIndex);
  } else {
    stop = true;
    console.log('stop', col, '/', rowIndex);
  }
}

export const pathComputing = (tableData, robotPostions) => {
  console.log('pathComputing');
  // console.log(robotPostions);a
  // console.log(tableData);
  robotPostions.splice(4);
  let isFinding = false;
  // console.log(tableData[robotPostions[0][0]][robotPostions[0][1]]);
  if(!tableData[robotPostions[0][0]][robotPostions[0][1]].left) {
    MoveLeft(tableData, robotPostions[0][0], robotPostions[0][1]);
    // if(tableData[robotPostions[0][0] - 1][robotPostions[0][1]].left) {
    //   if(tableData[robotPostions[0][0] - 2][robotPostions[0][1]].left) {
    //     if(tableData[robotPostions[0][0] - 3][robotPostions[0][1]].left) {
      
    //     }
    //   }
    // }
  }
  // for (let i = 0; i < robotPostions.length; i++) {
  //   console.log('tableData[i]', tableData[robotPostions[i][0]]);
  //   if(tableData[robotPostions[i][0]].includes({top:true})) {
  //     console.log('hi');
  //   }
  // }

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