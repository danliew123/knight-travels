// function findCoord(x, y) {
//   let coord;
//   for (i = 0; i < adjlist.length; i++) {
//     if (adjlist[i][0][0] === x && adjlist[i][0][1] === y) {
//       coord = i;
//       break;
//     }
//   }
//   return coord;
// }

// class Node {
//   constructor(location, previous) {
//     this.location = location;
//     this.previous = previous;
//   }
// }

// function knightMoves(start = [0, 0], end = [1, 2]) {
//   let startIndex = findCoord(start[0], start[1]);
//   let queue = [adjlist[startIndex][0]];
//   let board = []

//   while (queue[0][0] !== end[0] && queue[0][1] !== end[1]) {
//     const loc = queue.shift();
//     let newNode = new Node(loc, )
//     const moves = adjlist[findCoord(loc)][1];
//     moves.forEach((move) => {
//       queue.push(move);
//     });
//   }

//   return board[JSON.stringify(end)];
// }

// let adjlist = [];

// for (let x = 0; x < 8; x++) {
//   for (let y = 0; y < 8; y++) {
//     let coordMoves = [[x, y]];
//     let possibleMoves = [
//       [x + 1, y + 2],
//       [x - 1, y + 2],
//       [x + 1, y - 2],
//       [x - 1, y - 2],
//       [x - 2, y + 1],
//       [x - 2, y - 1],
//       [x + 2, y + 1],
//       [x + 2, y - 1],
//     ].filter((moves) => moves[0] >= 0 && moves[1] >= 0);
//     coordMoves.push(possibleMoves);
//     adjlist.push(coordMoves);
//   }
// }

// console.log(adjlist);
// console.log(knightMoves([0, 2], [1, 2]));

const squareRegistry = new Map();

const ChessSquare = (x, y) => {
  const xPos = x;
  const yPos = y;
  let predecessor;

  const KNIGHT_OFFSETS = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  const getPredecessor = () => predecessor;
  const setPredecessor = (newPred) => {
    predecessor ||= newPred;
  };

  const name = () => `${x}, ${y}`;

  const createKnightMoves = () => {
    return KNIGHT_OFFSETS.map(newSquareFrom).filter(Boolean);
  };

  const newSquareFrom = ([xOffset, yOffset]) => {
    const [newX, newY] = [xPos + xOffset, yPos + yOffset];
    if (0 <= newX && newX < 8 && 0 <= newY && y < 8) {
      return ChessSquare(newX, newY);
    }
  };

  if (squareRegistry.has(name())) {
    return squareRegistry.get(name());
  } else {
    const newSquare = {
      name,
      getPredecessor,
      setPredecessor,
      createKnightMoves,
    };
    squareRegistry.set(name(), newSquare);
    return newSquare;
  }
};

const knightsTravails = (start, finish) => {
  squareRegistry.clear();

  const origin = ChessSquare(...start);
  const target = ChessSquare(...finish);

  const queue = [target];
  while (!queue.includes(origin)) {
    const currentSquare = queue.shift();

    const enqueueList = currentSquare.createKnightMoves();
    enqueueList.forEach((square) => square.setPredecessor(currentSquare));
    queue.push(...enqueueList);
  }
  const path = [origin];
  while (!path.includes(target)) {
    const nextSquare = path.at(-1).getPredecessor();
    path.push(nextSquare);
  }
  console.log(`The shortest path was ${path.length - 1} moves!`);
  console.log("The moves were:");
  path.forEach((square) => console.log(square.name()));
};
