import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

import SudokuCell from "../SudokuCell";
import SudokuButton from "../SudokuButton"
import { SudokuGrigType } from "../../sudoku";
import { StateTypes } from 'reducers';
import { CellInfo, changeSudokuCell, selectDifficult } from '../../actions';
import reload from "./reload.svg";
import "./SudocuTable.less";

type PropType = {
  isWinning: boolean,
  difficult: number,
  sudokuGrid:SudokuGrigType;
  gameStarted:boolean;
  changeSudokuCell:( cellInfo: CellInfo ) => void;
  selectDifficult:(dificult: number) => void
}

const SudocuTable = (props:PropType) =>{
  const { isWinning, difficult, sudokuGrid, gameStarted, changeSudokuCell, selectDifficult: reloadPage } = props;
  const [focuseCell, setFocuseCell] = useState( { row: -1 , col: -1 } )

  if(!gameStarted){
    return <Redirect to="/" />
  } 
  
  if (isWinning) {
    return <Redirect to="./win" />
  }

  const reloadButtonHandler = () => {
    reloadPage(difficult);
    setFocuseCell({ row: -1 , col: -1 });
  }

  return (
    <div className="sudoku-table__wrapper">
      <table className={`sudoku-table ${isWinning ? "sudoku-table--win": ''}`}>
        <tbody>
          {sudokuGrid.map((row, rowIndex)=>{
            return (
              <tr key={rowIndex.toString()} className="sudoku-row">
                {row.map((cellData, cellColumn)=>{
                  return <SudokuCell 
                            data = {cellData}
                            coord = {{row: rowIndex, col: cellColumn}}
                            key={rowIndex.toString() + cellColumn.toString()}
                            changeSudokuCell={changeSudokuCell}
                            isFocused={ focuseCell.row === rowIndex && focuseCell.col === cellColumn }
                            setFocuseCell={setFocuseCell}
                          />
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <SudokuButton className="sudoku-table__button" title="обновить таблицу" onClick={reloadButtonHandler}>
          <img src={reload} className="sudoku-table__reload" width="35" height="35"/>
      </SudokuButton>
    </div>
  )
};

const mapStateToProps = ({ gameStarted, grid, difficult, isWinning }:StateTypes) => ({ difficult, isWinning, gameStarted,  sudokuGrid: grid });
const mapDispatchToProps = {
  changeSudokuCell,
  selectDifficult
};

export default connect(mapStateToProps, mapDispatchToProps)(SudocuTable);