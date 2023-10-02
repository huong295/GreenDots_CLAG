// src/components/Login.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // navigate to another page


function validate(username: string, password: string) {
  // Allows alphanumeric characters and underscores, 5-45 characters long
  const usernamePattern = /^[a-zA-Z0-9_]{5,45}$/;
  // At least 8 characters, at least one uppercase letter, one lowercase letter, and one digit
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // test username
  if (!usernamePattern.test(username)) {
    alert('Wrong username.');
    return false;
  }

  // test password
  if (!passwordPattern.test(password)) {
    alert('Wrong password.')
    return false;
  }

  return true;
}



const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // validate 
    if (!validate(username, password)) {
      return;
    }
    const data = { username, password }
    // fetch
    axios.post(`${API_ENDPOINT}/auth/login`, data, 
      )
      .then((result) => {
        if (result.data.success)
        {
          console.log(result.data)
          alert('log in success')
          navigate('/')
        }
        else {
          alert(result.data.message)
          console.log(result.data)
        }
      })
      .catch((err) =>{
        console.log(err)
      })
  };

  const showPassword = () => {
    if (isChecked) {
      setIsChecked(false)
    } 
    else {
      setIsChecked(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type={isChecked ? "text": "password"}
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="checkbox" onChange={showPassword} checked={isChecked}/>
        <label htmlFor='showPass' onClick={showPassword}>Show your password</label>
        <div className="underline py-2">Forgot your password? </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="w-full text-center py-2">New to Green dots?  <span>
                <a href="/signup" className="underline">
                  Sign up{' '}
                </a>
              </span> here</div>
      </div>
    </div>
  );
};

export default Login;
