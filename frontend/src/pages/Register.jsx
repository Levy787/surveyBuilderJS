import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Register</p>
        </header>
        <main>
          <form action="">
            <div className="nameInputDiv">
              <input
                type="text"
                placeholder="Name"
                id="name"
                vale={name}
                className="nameInput"
                onChange={onChange}
              />
            </div>
            <div className="emailInputDiv">
              <input
                type="email"
                className="emailInput"
                placeholder="Email"
                id="email"
                vale={email}
                onChange={onChange}
              />
            </div>
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="registerBar">
              <button className="registerButton">Register</button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
