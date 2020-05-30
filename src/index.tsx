import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";

import App from "./components/App";
import reducer from "./reducers";
import * as storage from "./storage"
import { createSudokuGrid } from "./actions";
import { generateGrid, genetateSudokuStr } from './sudoku';
import "./initial.less";

const Api = {
  storage,
  sudoku: {
    generateGrid, 
    genetateSudokuStr
  }
}

const store = createStore(reducer, applyMiddleware(Thunk.withExtraArgument(Api)));

const gridStorage = storage.getGrid();

if( gridStorage !== null ) {
  store.dispatch(createSudokuGrid(gridStorage));
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));