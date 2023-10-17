import  React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useLogin} from '../hooks/auth/useLogin';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const {login, error, isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  }

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
          <p className="pageHeader">Welcome Back</p>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
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
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password?
            </Link>
            <div className="loginButton">
              <button 
                className="loginButton" disabled={isLoading}>Login</button>
            </div>
            {error && <div className='error'>{error}</div>}
          </form>
        </main>
      </div>
    </>
  );
}
