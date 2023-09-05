import React, { useState } from "react";
import Register from "./Register.js";
import Login from "./Login.js";

export default function LandingPage() {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log(count);
  };

  return (
    <>
      <div>
        <button onClick={() => handleClick()}> Here {count}</button>
      </div>
      <main>
        <h1 className="header">Welcome to StrideSocial! </h1>
        <div className="options">
          <button
            className=""
            onClick={() => {
              setRegister(true);
              setLogin(false);
            }}
          >
            Register
          </button>
          <button
            className=""
            onClick={() => {
              setLogin(true);
              setRegister(false);
            }}
          >
            Login{" "}
          </button>
        </div>
        <div>
          <div className="register">
            {register === true && login === false ? <Register /> : null}
          </div>
          <div className="login">
            {login === true && register === false ? <Login /> : null}
          </div>
        </div>
      </main>
    </>
  );
}
