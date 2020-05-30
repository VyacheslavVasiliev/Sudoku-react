import React, { useState, useRef, useEffect } from "react";
import "./SudokuInputCell.less";

type PropType = {
  addCellValue: (cellValue: string) => void;
}

const SudokuInputCell:React.FC<PropType> = ({ addCellValue }) =>{
  const [cellValue, setCellValue] = useState('');
  const inputCell = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if((inputCell && inputCell.current)){
      inputCell.current.focus();
    }
  }, [inputCell])

  const inputCellChangeHandler = (event:React.FormEvent<HTMLInputElement>):void =>{
    const inputValue =  event.currentTarget.value.slice(-1);
    if(Number(inputValue) === 0){
      setCellValue('');
      return
    };

    setCellValue(inputValue);
  };

  const inputCellBlureHandler = ():void =>{
    addCellValue(cellValue);
  }

  const inputCellEnterHandler = (e:React.KeyboardEvent<HTMLInputElement>):void => {
    if(e.keyCode === 13) {
      addCellValue(cellValue);
    }
  }

  return (
    <input 
      type="number"
      className="sudoku-input-cell"
      value={cellValue}
      ref={inputCell}
      onChange={inputCellChangeHandler}
      onBlur={inputCellBlureHandler}
      onKeyDown={inputCellEnterHandler}
    />
  )
}

export default SudokuInputCell;