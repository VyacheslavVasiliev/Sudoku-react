import { SudokuGrigType, GenerateGrid, GenerateSudokuStr } from '../sudoku';
import { ThunkAction } from 'redux-thunk';
import { StateTypes } from "../reducers";
import { StorageType } from "../storage/types";
import { Action } from 'redux';

export const ActionTypes = {
  UDATE_SUDOKU_GRID: "UPDATE_SUDOKU_GRID" as const,
  CREATE_SUDOKU_GRID: "CREATE_SUDOKU_GRID" as const,
  CHECK_DOUBLE_NUMBERS: "CHECK_DOUBLE_NUMBERS" as const,
  SET_SUDOKU_CELL: "SET_SUDOKU_CELL" as const,
  ADD_SUDOKU_DIFFICULT: "ADD_SUDOKU_DIFFICULT" as const,
  CHECK_GAME_WIN: "CHECK_GAME_WIN" as const
}

export interface ActionTypeTS<T, P = void> extends Action<T> {
  payload: P;
};

interface Api {
  storage: StorageType
  sudoku: {
    generateGrid: GenerateGrid,
    genetateSudokuStr: GenerateSudokuStr
  }
}

type SudokuThunkAction<A extends Action, Result = void> = ThunkAction<Result, StateTypes, Api, A>;


export type CellInfo = {
  row:number,
  col:number,
  value: string
};

type CreateSudokuGridPayload = {
  difficult: number
  grid: SudokuGrigType
}

export type CreateSudokuGridAction = ActionTypeTS< typeof ActionTypes.CREATE_SUDOKU_GRID, CreateSudokuGridPayload>;
export type CreateSudokuGridType = (grigInfo:CreateSudokuGridPayload) => CreateSudokuGridAction;

export type AddSudokuCellValueAction = ActionTypeTS<typeof ActionTypes.SET_SUDOKU_CELL, CellInfo>;
export type AddSudokuCellValueType = (cellInfo: CellInfo ) => AddSudokuCellValueAction;

export type CheckDoubleNumbersAction = ActionTypeTS<typeof ActionTypes.CHECK_DOUBLE_NUMBERS, CellInfo>;
export type CheckDoubleNumbersType = (cellInfo: CellInfo) => CheckDoubleNumbersAction;

export type CheckGameWinAction = Action<typeof ActionTypes.CHECK_GAME_WIN>;
export type CheckGameWinType = () => CheckGameWinAction;

export type ChangeSudokuCellType = (cellInfo: CellInfo) => SudokuThunkAction<AddSudokuCellValueAction | CheckDoubleNumbersAction | CheckGameWinAction>

export type SelectDifficultType = (difficult: number) => SudokuThunkAction<CreateSudokuGridAction>