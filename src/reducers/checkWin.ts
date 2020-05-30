import { SudokuGrigType } from "../sudoku";

// Функцию использовать только после проверки на повторение в ячейках
// т.к. она полагает на свойство isDouble в каждой ячейке в таблице
export const checkWin = (grid:SudokuGrigType) => {
  return grid.every((row)=>{
    return row.every((cell)=>{
      let isDouble:boolean = false;
      for(const key in cell.isDouble){
        isDouble = isDouble || cell.isDouble[key as keyof ((typeof cell)["isDouble"])];
      }

      return cell.value !== "" && !isDouble;
    })
  });
}