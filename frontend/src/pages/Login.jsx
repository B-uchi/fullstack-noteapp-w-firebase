import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onsubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
  };

  const handleRegister = async (email, password) => {
    axios
      .post("http://localhost:5555/login", {
        email,
        password,
      })
      .then((response) => {
        if (!response.error) {
          alert("Login successfully");
          localStorage.setItem('@token', response.data.token)
          navigate("/dashboard")
        }
      })
      .catch((e) => {
        if(e.response.data) {
          console.log(e.response.data);
          return alert(`${e.response.data.error}`);
        }
        alert("Error Logging In");
        console.log(response.error);
      });
  };

  return (
    <div className="w-full h-full bg-amber-600 p-2 flex justify-center items-center">
      <div className="text-center bg-white p-4 flex flex-col justify-center items-center rounded w-[500px]">
        <h2 className="text-2xl font-bold">Login</h2>
        <div className="mt-8 w-[70%] text-left">
          <form className="form " action="/" method="post" onSubmit={onsubmit}>
            <div className="mb-5">
              <p>E-mail: </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <p>Password: </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col">
              <button
                className="bg-[#27ae60] p-3 hover:scale-105 transition-all px-9 mb-2 rounded-lg mx-auto"
                type="submit"
              >
                Login
              </button>
              <a href="/register" className="mx-auto underline">
                Don't have an account? Create one
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
