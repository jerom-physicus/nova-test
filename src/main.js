import "./index.css";
import React from "react";
import Login from "./login-page";
import HomePage from "./homePage";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import ChatGPT from "./Trail";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route exact path="/home" Component={HomePage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//
