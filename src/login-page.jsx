import "./index.css";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const input_username = useRef(null);
  const input_password = useRef(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username == "novajerom" || password == "nova8809") {
      navigate("/home");
    }
  });

  function handlebnt() {
    const username = input_username.current.value;
    const password = input_password.current.value;
    if (username != "novajerom" || password != "nova8809") {
      alert("incorrect username or password");
    } else console.log("correct");
    navigate("/home");
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  }
  return (
    <div className="login-container">
    <div className="page-1">
      <h1 className="title">NOVA</h1>
      <h2 className="slogan">Assistive robot</h2>

      <div className="login-card">
        <h2>Login</h2>
        <input
          ref={input_username}
          id="username"
          className="cred"
          placeholder="username"
        ></input>
        <input
          id="password"
          ref={input_password}
          className="cred"
          type="password"
          placeholder="password"
        ></input>
        <button onClick={handlebnt} className="login-btn">
          login
        </button>
      </div>
    </div>

    </div>
  );
}

export default Login;
