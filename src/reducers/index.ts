import { initialGrid, SudokuGrigType } from "../sudoku";
import { ActionTypes } from "../actions/types";

import { checkDoubleNumber } from "./checkDoubleNumber";
import { checkWin } from "./checkWin"
import { SudokuTypes } from "./types"

interface StateTypes {
  gameStarted: boolean,
  isWinning: boolean,
  difficult : number 
  grid: SudokuGrigType
}

const InitialState : StateTypes = {
  gameStarted: false,
  isWinning: false,
  difficult: -1,
  grid: initialGrid
};

const reducer = (state:StateTypes = InitialState, action:SudokuTypes):StateTypes => {
  switch (action.type) {
    case ActionTypes.CREATE_SUDOKU_GRID :
      const { grid, difficult } = action.payload;
      return {
        gameStarted: true,
        isWinning: false,
        difficult,
        grid
      };

    case ActionTypes.SET_SUDOKU_CELL :
      const {row, col, value:value} = action.payload;
      const sudocuGrid = state.grid.slice();

      sudocuGrid[row] = sudocuGrid[row].slice();
      sudocuGrid[row][col] = {...sudocuGrid[row][col], value}

      return { ...state, grid:sudocuGrid };

    case ActionTypes.CHECK_DOUBLE_NUMBERS :
      return { ...state, grid: checkDoubleNumber(state.grid, action.payload) };

    case ActionTypes.CHECK_GAME_WIN: 
      return { ...state, isWinning: checkWin(state.grid) }
    default : 
      return state
  }
}


export { StateTypes };

export default reducer;