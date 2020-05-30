import React, { Component } from "react";

import SudokuInputCell from "../SudokuInputCell";
import { SudocuCellType } from "../../sudoku";
import { CellInfo } from '../../actions/types';
import "./SudokuCell.less";

type PropType = {
  data: SudocuCellType,
  coord : { row: number, col: number }
  setFocuseCell:(coord:{ row: number, col: number }) => void
  changeSudokuCell:( cellInfo: CellInfo ) => void;
  isFocused: boolean
}

type StateType = {
  isInputOnCell:boolean
}

class SudocuCell extends Component<PropType, StateType>{
  private cellRef: React.RefObject<HTMLTableCellElement>;
  constructor(props:PropType) {
    super(props);
    this.state = {
      isInputOnCell: false
    }

    this.cellRef = React.createRef<HTMLTableCellElement>();
  }

  cellClickHandler = ():void =>{
    const { isPrimary } = this.props.data;
    if(!isPrimary) {
      this.setState({isInputOnCell: true});
    }
  };

  enterHadler = (keyCode:number):void =>{
    const { isPrimary } = this.props.data;
    if(keyCode === 13 && !isPrimary) {
      this.setState({isInputOnCell: true});
    }
  }

  arrowHandler = (keyCode:number):void => {
    const { setFocuseCell, coord:{ row, col } } = this.props;
    switch(keyCode) {
      case 38: 
        setFocuseCell({ row: row - 1, col});
        return
      case 40:
        setFocuseCell({ row: row + 1, col });
        return
      case 37: 
        setFocuseCell({ row, col: col - 1 });
        return
      case 39: 
        setFocuseCell({ row, col: col + 1 });
        return
    }
  }

  cellKeyHandler = (e:React.KeyboardEvent<HTMLTableDataCellElement>):void => {
    e.preventDefault();
    this.enterHadler(e.keyCode);
    this.arrowHandler(e.keyCode);
  }

  addCellValue = ( cellValue: string ):void =>{
    const { changeSudokuCell, coord:{ row, col } } = this.props;

    changeSudokuCell({ row, col, value:cellValue });
    this.setState({ isInputOnCell: false });
  }

  setCurrentCellFocus = ():void =>{
    const { setFocuseCell, coord:{ row, col } } = this.props;
    setFocuseCell({row, col})
  }

  render() {
    const { value, isDouble, isPrimary } = this.props.data;
    const isDoubleClass = isDouble.area || isDouble.row || isDouble.column;
    
    const cellClassName = `sudoku-cell ${!isPrimary?'sudoku-cell--changeable': ''} ${isDoubleClass? 'sudoku-cell--double': ''}`

    if( this.state.isInputOnCell ) {
      return (
        <td className={`${cellClassName} sudoku-cell--input`} tabIndex={0} ref={this.cellRef}>
          <SudokuInputCell addCellValue={this.addCellValue}/>
        </td>
      )
    }
  
    return (
      <td
        className={cellClassName}
        onClick={this.cellClickHandler}
        onKeyDown={this.cellKeyHandler}
        onFocus={this.setCurrentCellFocus}
        onMouseDown={this.setCurrentCellFocus} 
        tabIndex={0} 
        ref={this.cellRef}
      >
        {value}
      </td>
    )
  }

  componentDidUpdate(){
    if(this.props.isFocused && (this.cellRef && this.cellRef.current)){
      this.cellRef.current.focus();
    }
  }
}

export default SudocuCell;