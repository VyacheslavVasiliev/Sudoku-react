import { CreateSudokuGridAction, AddSudokuCellValueAction, CheckDoubleNumbersAction, CheckGameWinAction } from "../actions/types"

type SudokuTypes =  CheckGameWinAction |
                    CreateSudokuGridAction |
                    AddSudokuCellValueAction |
                    CheckDoubleNumbersAction;

export { SudokuTypes };