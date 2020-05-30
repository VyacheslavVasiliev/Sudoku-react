import { sudoku } from "./sudoku";
import { initialGrid } from "./initialGrid"

const sudokuString: string = sudoku.generate(45);

type difficulty = "easy" | "medium" | "hard" | "very-hard" | "insane" | "inhuman";

type generateSudoku = {
  generate: (difficulty: number | difficulty, unique?: boolean)=> string
}

const { generate: genetateSudokuStr }: generateSudoku = sudoku;

interface SudocuCellType {
  isPrimary: boolean;
  isDouble: {
    row:boolean;
    column:boolean;
    area: boolean;
  },
  value: string;
};

type SudokuGrigType = Array<SudocuCellType[]>;
type GenerateGrid = typeof generateGrid;
type GenerateSudokuStr = typeof genetateSudokuStr;

function generateGrid(sudokuString: string): SudokuGrigType {

  const ROW_LENGTH = 9;

  let grid : SudokuGrigType = [];
  let sudokuRow:Array<SudocuCellType> = [];

  for (let i = 0, strLen = sudokuString.length; i < strLen; i++) {
    sudokuRow.push({
      isPrimary: sudokuString[i] === '.' ? false : true,
      isDouble: {
        row:false,
        column:false,
        area: false,
      },
      value: sudokuString[i] === '.' ? '' : sudokuString[i],
    });
    
    if(i % ROW_LENGTH === 8){
      grid.push(sudokuRow);
      sudokuRow = [];
    }
  }

  return grid;
};

export { generateGrid, genetateSudokuStr, sudokuString, initialGrid, SudokuGrigType, SudocuCellType, GenerateGrid, GenerateSudokuStr };
