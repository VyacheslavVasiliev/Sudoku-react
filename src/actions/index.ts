import { CellInfo, CheckDoubleNumbersType, CreateSudokuGridType, AddSudokuCellValueType, ChangeSudokuCellType, SelectDifficultType, ActionTypes, CheckGameWinType } from "./types";


const createSudokuGrid:CreateSudokuGridType = ( gridInfo ) => {
  return {
    type: ActionTypes.CREATE_SUDOKU_GRID,
    payload:gridInfo
  };
};

const setSudokuCell:AddSudokuCellValueType = ( cellInfo ) => {
  return {
    type: ActionTypes.SET_SUDOKU_CELL,
    payload: cellInfo
  }
};

const checkDoubleNumbers:CheckDoubleNumbersType = ( cellInfo ) =>{
  return {
    type: ActionTypes.CHECK_DOUBLE_NUMBERS,
    payload:cellInfo
  }
};

// отправлять экшн только после провреки на повторяющиеся ячейки
const checkGameWin:CheckGameWinType = () => {
  return {
    type: ActionTypes.CHECK_GAME_WIN
  }
}

const changeSudokuCell: ChangeSudokuCellType = ( cellInfo ) => ( dispatch, getState, { storage } ) => {
  dispatch(setSudokuCell(cellInfo));
  dispatch(checkDoubleNumbers(cellInfo));
  dispatch(checkGameWin());

  const {difficult, grid} = getState();
  storage.saveGrid({difficult, grid});
};

const selectDifficult: SelectDifficultType = ( difficult ) => ( dispatch, _getState, { storage:{ saveGrid }, sudoku: { generateGrid, genetateSudokuStr } }  ) => {
  const grid = generateGrid(genetateSudokuStr(difficult));
  dispatch(createSudokuGrid({difficult, grid}));

  saveGrid({difficult, grid});
}

export { CellInfo, createSudokuGrid, setSudokuCell, checkDoubleNumbers, changeSudokuCell, selectDifficult, checkGameWin };
