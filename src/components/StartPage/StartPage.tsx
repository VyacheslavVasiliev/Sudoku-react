import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";

import SudokuButton from "../SudokuButton";
import { selectDifficult } from '../../actions';
import "./StartPage.less";

type PropType = {
  selectDifficult: (difficult: number)=>void
};

const StartPage = ( { selectDifficult }: PropType ) =>{
  const FILLED_CELLS_EASY = 60;
  const selectEasy = () =>{
    selectDifficult(FILLED_CELLS_EASY);
  }

  const FILLED_CELLS_MEDIUM = 50;
  const selectMedium = () =>{
    selectDifficult(FILLED_CELLS_MEDIUM);
  }
  
  const FILLED_CELLS_HARD = 40;
  const selectHard = () =>{
    selectDifficult(FILLED_CELLS_HARD);
  }

  const selectUnreal = () =>{
    const FILLED_CELLS = 80;
    selectDifficult(FILLED_CELLS);
  }

  return (
    <ul className="start__list">
      <li className="start__item">
        <Link to="/game/" title={`заполнено ${FILLED_CELLS_EASY} ячеек`}>
          <SudokuButton type="span" className="start__button" onClick={selectEasy}>
            Легко
          </SudokuButton>
        </Link>
      </li>
      <li className="start__item">
        <Link to="/game/" title={`заполнено ${FILLED_CELLS_MEDIUM} ячеек`}>
          <SudokuButton type="span" className="start__button" onClick={selectMedium}>
            Средне
          </SudokuButton>
        </Link>
      </li>
      <li className="start__item">
        <Link to="/game/" title={`заполнено ${FILLED_CELLS_HARD} ячеек`}>
          <SudokuButton type="span" className="start__button" onClick={selectHard}>
            Сложно
          </SudokuButton>
        </Link>
      </li>
      <li className="start__item start__item--robots">
        <Link to="/game/" title="НЕВОЗМОЖНЫЙ УРОВЕНЬ СЛОЖНОСТИ">
          <SudokuButton type="span" className="start__button" onClick={selectUnreal}>
            Только для роботов
          </SudokuButton>
        </Link>
      </li>
    </ul>
  )
}

const mapDispatchToProps = { 
  selectDifficult
}

export default connect( undefined, mapDispatchToProps )(StartPage);