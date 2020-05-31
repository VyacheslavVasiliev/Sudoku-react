import React from "react";
import {
  HashRouter as Router,
  Route
} from "react-router-dom";

import SudokuTable from "../SudokuTable";
import StartPage from "../StartPage";
import WinIndicator from "../WinIndicator";
import "./app.less";

const App = () =>{
  return (
    <main role="main" className="app">
      <div className="app__content">
        <Router>
          <Route path="/" component={StartPage} exact/>
          <Route path="/game/win" component={WinIndicator}/>
          <Route path="/game/" component={SudokuTable}/>
        </Router>
      </div>
    </main>
    )
} 

export default App;