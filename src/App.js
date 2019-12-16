import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/signup' component={Signup} />
        <Route path='/' component={Login} />
      </Switch>
    </div>
  );
}

export default App;
