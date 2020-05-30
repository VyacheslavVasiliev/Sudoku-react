import { SudokuGrigType, SudocuCellType } from "../sudoku";
import { CellInfo } from '../actions/types';


interface CellPosition {
  col: number,
  row: number
};

export const checkDoubleNumber = (grid:SudokuGrigType, position:CellPosition):SudokuGrigType => {
  let sudocuGrid = checkDoubleInColumn(grid, position);
  sudocuGrid = checkDoubleInRow(sudocuGrid, position);
  sudocuGrid = checkDoubleInArea(sudocuGrid, position);

  return sudocuGrid;
};

type AreaTypes = keyof SudocuCellType["isDouble"];

function checkDoubleInArray(cellsInfo:CellInfo[], grid: SudokuGrigType, areaType:AreaTypes):SudokuGrigType {
  const sudokuGrid = grid.slice();
  const cellsInfoSort = cellsInfo.slice().sort((a, b)=> Number(a.value) - Number(b.value));

  for (var k = 0; k < cellsInfoSort.length; k++) {
    const nextElementValue = cellsInfoSort[k + 1]? cellsInfoSort[k + 1].value: null;
    const prevElementValue = cellsInfoSort[k - 1]? cellsInfoSort[k - 1].value: null;
    const currentElementValue = cellsInfoSort[k].value;

    // если текущее значение не равно пустой строке и предыдущее или следующее значение в колонке равно текущему
    if (currentElementValue!== "" && 
       (nextElementValue === currentElementValue || prevElementValue === currentElementValue)) {
      // у текущего элемента колонки ставим повторяющееся значение 
      const {row, col} = cellsInfoSort[k];
      sudokuGrid[row][col]= {
        ...sudokuGrid[row][col],
        isDouble:{
          ...sudokuGrid[row][col].isDouble,
          [areaType]: true
        }
      };
    } else { 
      // если пустая строка или значения не равны
      // у текущего элемента колонки убираем повторяющееся значение 
      const {row, col} = cellsInfoSort[k];
      sudokuGrid[row][col]= {
        ...sudokuGrid[row][col],
        isDouble:{
          ...sudokuGrid[row][col].isDouble,
          [areaType]: false
        }
      };
    }
  }
  
  return sudokuGrid;
};

function checkDoubleInColumn( grid:SudokuGrigType, { col }:CellPosition ):SudokuGrigType {
  const columnValues = [];
  for(let i = 0, len = grid.length ; i < len; i++){
    columnValues.push({value:grid[i][col].value , row: i, col});
  }

  const sudokuGrid = checkDoubleInArray(columnValues, grid, "column");

  return sudokuGrid;
};

function checkDoubleInRow(grid: SudokuGrigType, { row }:CellPosition ):SudokuGrigType {
  const rowValues = [];
  for(let i = 0, len = grid[row].length ; i < len; i++){
    rowValues.push({value:grid[row][i].value , row, col:i});
  }

  const sudokuGrid = checkDoubleInArray(rowValues, grid, "row");

  return sudokuGrid;
};

function getAreaTopCornerCoord ( {col, row}:CellPosition ){
  const topCol = Math.floor(col / 3);
  const topRow = Math.floor(row / 3);

  const cellAreaLeftIndex  = topCol * 3;
  const cellAreaTopIndex = topRow * 3;
  
  return { cellAreaTopIndex, cellAreaLeftIndex };
};

function checkDoubleInArea(grid:SudokuGrigType, position:CellPosition ):SudokuGrigType {
  const { cellAreaTopIndex, cellAreaLeftIndex } = getAreaTopCornerCoord(position);
  const CELL_AREA_WIDTH: number = 3;
  const CELL_AREA_HEIGHT: number = 3;
  
  const areaValues = [];

  for(let i = cellAreaTopIndex, maxHeight = cellAreaTopIndex + CELL_AREA_HEIGHT; i < maxHeight; i ++) {
    for(let j = cellAreaLeftIndex, maxWidth = cellAreaLeftIndex + CELL_AREA_WIDTH; j < maxWidth; j++){
      areaValues.push({value:grid[i][j].value , row: i, col: j});
    }
  }

  const sudocuGrid = checkDoubleInArray(areaValues, grid, "area");
  
  return sudocuGrid
};