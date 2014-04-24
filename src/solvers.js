/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// ******** Original Implementation using Board class **********
//
// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// window.findNRooksSolution = function(n) {
//   var board = new Board({n: n});
//   var newBoard = undefined;
//   var solution = undefined;
//   var stack = [{board: board, currentRow: 0}];

//   while (stack.length && !solution) {
//     board = stack.pop();
//     for (var i = 0; i < n; i++) {
//       newBoard = new Board($.extend(true, [], board.board.rows()));
//       newBoard.togglePiece(board.currentRow, i);
//       if (!newBoard.hasAnyColConflicts()) {
//         if (board.currentRow === (n - 1)) {
//           solution = newBoard.rows();
//           break;
//         } else {
//           stack.push({board: newBoard, currentRow: board.currentRow + 1});
//         }
//       }
//     }
//   }

//   solution = solution || new Board({n: n}).rows();
//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution;
// };


// Implementation using 1-D arrays
window.findNRooksSolution = function(n) {
  var hasConflict = function(board, currentRow, col) {
    for (var i = 0; i < currentRow; i++) {
      if (board[i] === col) {
        return true;
      }
    }

    return false;
  };

  var to2dArray = function(board) {
    var newBoard = new Board({n: n});

    for (var i = 0; i < board.length; i++) {
      newBoard.togglePiece(i, board[i]);
    }

    return newBoard.rows();
  }

  var board = [];
  board.currentRow = 0;
  var stack = [board];
  var newBoard = undefined;
  var solution = new Board({n: n}).rows();

  while (stack.length) {
    board = stack.pop();
    for (var i = 0; i < n; i++) {
      if (!hasConflict(board, board.currentRow, i)) {
        newBoard = board.slice();
        newBoard[board.currentRow] = i;
        newBoard.currentRow = board.currentRow + 1;
        if (newBoard.currentRow === n) {
          solution = to2dArray(newBoard);
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
          return solution;
        } else {
          stack.push(newBoard);
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// ******** Original Implementation using Board class **********
//
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var solutionCount = undefined;
//   var solutions = [];
//   var board = new Board({n: n});
//   var newBoard = undefined;
//   var queue = [{board: board, currentRow: 0}];

//   while (queue.length) {
//     board = queue.shift();
//     for (var i = 0; i < n; i++) {
//       newBoard = new Board($.extend(true, [], board.board.rows()));
//       newBoard.togglePiece(board.currentRow, i);
//       if (!newBoard.hasAnyColConflicts()) {
//         if (board.currentRow === (n - 1)) {
//           solutions.push(newBoard);
//         } else {
//           queue.push({board: newBoard, currentRow: board.currentRow + 1});
//         }
//       }
//     }
//   }

//   solutionCount = solutions.length;
//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };


// Implementation using 1-D arrays
window.countNRooksSolutions = function(n) {
  var hasConflict = function(board, currentRow, col) {
    for (var i = 0; i < currentRow; i++) {
      if (board[i] === col) {
        return true;
      }
    }

    return false;
  };

  var board = [];
  board.currentRow = 0;
  var queue = [board];
  var newBoard = undefined;
  var solutionCount = undefined;
  var solutions = [];

  while (queue.length) {
    board = queue.shift();
    for (var i = 0; i < n; i++) {
      if (!hasConflict(board, board.currentRow, i)) {
        newBoard = board.slice();
        newBoard[board.currentRow] = i;
        newBoard.currentRow = board.currentRow + 1;
        if (newBoard.currentRow === n) {
          solutions.push(newBoard);
        } else {
          queue.push(newBoard);
        }
      }
    }
  }

  solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// ******** Original Implementation using Board class **********
//
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n) {
//   var board = new Board({n: n});
//   var newBoard = undefined;
//   var solution = undefined;
//   var stack = [{board: board, currentRow: 0}];

//   while (stack.length && !solution) {
//     board = stack.pop();
//     for (var i = 0; i < n; i++) {
//       newBoard = new Board($.extend(true, [], board.board.rows()));
//       newBoard.togglePiece(board.currentRow, i);
//       if (!newBoard.hasAnyQueensConflictsNoRows()) {
//         if (board.currentRow === (n - 1)) {
//           solution = newBoard.rows();
//           break;
//         } else {
//           stack.push({board: newBoard, currentRow: board.currentRow + 1});
//         }
//       }
//     }
//   }

//   solution = solution || new Board({n: n}).rows();
//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };


// Implementation using 1-D arrays
window.findNQueensSolution = function(n) {
  var hasConflict = function(board, currentRow, col) {
    var major = col - currentRow;
    var minor = col + currentRow;
    for (var i = 0; i < currentRow; i++) {
      if (board[i] === major || board[i] === minor || board[i] === col) {
        return true;
      }
      major++;
      minor--;
    }

    return false;
  };

  var to2dArray = function(board) {
    var newBoard = new Board({n: n});

    for (var i = 0; i < board.length; i++) {
      newBoard.togglePiece(i, board[i]);
    }

    return newBoard.rows();
  }

  var board = [];
  board.currentRow = 0;
  var stack = [board];
  var newBoard = undefined;
  var solution = new Board({n: n}).rows();

  while (stack.length) {
    board = stack.pop();
    for (var i = 0; i < n; i++) {
      if (!hasConflict(board, board.currentRow, i)) {
        newBoard = board.slice();
        newBoard[board.currentRow] = i;
        newBoard.currentRow = board.currentRow + 1;
        if (newBoard.currentRow === n) {
          solution = to2dArray(newBoard);
          console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
          return solution;
        } else {
          stack.push(newBoard);
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// ******** Original Implementation using Board class **********
//
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// window.countNQueensSolutions = function(n) {
//   var solutionCount = undefined;
//   var solutions = [];
//   var board = new Board({n: n});
//   var newBoard = undefined;
//   var queue = [{board: board, currentRow: 0}];

//   while (queue.length) {
//     board = queue.shift();
//     for (var i = 0; i < n; i++) {
//       newBoard = new Board($.extend(true, [], board.board.rows()));
//       newBoard.togglePiece(board.currentRow, i);
//       if (!newBoard.hasAnyQueensConflictsNoRows()) {
//         if (board.currentRow === (n - 1)) {
//           solutions.push(newBoard);
//         } else {
//           queue.push({board: newBoard, currentRow: board.currentRow + 1});
//         }
//       }
//     }
//   }

//   solutionCount = solutions.length;
//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };


// Implementation using 1-D arrays
window.countNQueensSolutions = function(n) {
  var hasConflict = function(board, currentRow, col) {
    var major = col - currentRow;
    var minor = col + currentRow;
    for (var i = 0; i < currentRow; i++) {
      if (board[i] === major || board[i] === minor || board[i] === col) {
        return true;
      }
      major++;
      minor--;
    }

    return false;
  };

  var board = [];
  board.currentRow = 0;
  var queue = [board];
  var newBoard = undefined;
  var solutionCount = undefined;
  var solutions = [];

  while (queue.length) {
    board = queue.shift();
    for (var i = 0; i < n; i++) {
      if (!hasConflict(board, board.currentRow, i)) { 
        newBoard = board.slice();
        newBoard[board.currentRow] = i;
        newBoard.currentRow = board.currentRow + 1;
        if (newBoard.currentRow === n) {
          solutions.push(newBoard);
        } else {
          queue.push(newBoard);
        }
      }
    }
  }

  solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
