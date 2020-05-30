import React from "react";

import "./SudokuButton.less"

type PropType = {
  children: React.ReactNode,
  type?: "span" | "button"
}

const SudokuButton:React.FC<PropType & React.HTMLProps<HTMLButtonElement>>  = ({children, className = "", type = "button", ...props }) =>{
  if ( type === "span") {
    return <span className ={`sudoku__button ${className}`} { ...props }>{children}</span>
  }

  return <button className ={`sudoku__button ${className}`} { ...props }>{children}</button>
}

export default SudokuButton;