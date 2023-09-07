import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onsubmit = (e) => {
    e.preventDefault();
    handleRegister(email, username, password)
    
  };

  const handleRegister = async (email, username, password) => {
    axios
      .post("https://notefull-backend.vercel.app/register", {
        email,
        username,
        password,
      })
      .then((response) => {
        if (!response.error) {
          alert("User created successfully");
          localStorage.setItem('@token', response.data.token) 
          localStorage.setItem('@user_tok', response.data.id) 
          navigate("/dashboard")
        }
      })
      .catch((e) => {
        if(e.response.data) {
          console.log(e.response.data);
          return alert(`${e.response.data.error}`);
        }
        alert("Error Creating user");
        console.log(response.error);
      });
  };
  

  return (
    <div className="w-full h-full bg-amber-600 p-2 flex justify-center items-center">
      <div className="text-center bg-white p-4 flex flex-col justify-center items-center rounded w-[500px]">
        <h2 className="text-2xl font-bold">Create Account</h2>
        <div className="mt-8 w-[70%] text-left">
          <form
            className="form"
            id="register-form"
            action="/createUser.js"
            method="post"
            onSubmit={onsubmit}
          >
            <div className="mb-5">
              <p>Username: </p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
                className="bg-[#27ae60] hover:scale-105 transition-all p-3 px-9 mb-2 rounded-lg mx-auto"
                type="submit"
              >
                Register
              </button>
              <a href="/" className="mx-auto underline">
                Already have an account? Log In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
