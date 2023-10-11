// src/components/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // navigate to another page
import { login } from "../../services/services";
import jwtDecode from "jwt-decode";
import { useAuth } from '../../auth/AuthContext'
import { message } from 'antd';


function validate(username: string, password: string) {
  // Allows alphanumeric characters and underscores, 5-45 characters long
  const usernamePattern = /^[a-zA-Z0-9_]{5,45}$/;
  // At least 3 characters, at least one uppercase letter, one lowercase letter, and one digit
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/;

  // test username
  if (!usernamePattern.test(username)) {
    message.warning('Invalid username.');
    return false;
  }

  // test password
  if (!passwordPattern.test(password)) {
    message.error('Wrong password.')
    return false;
  }

  return true;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate(); 
  const auth = useAuth(); // Call useAuth hook here

  const handleLogin = async () => {
    // ignore trailing and leading whitespaces
    setUsername(username.trim());
    setPassword(password.trim());
    // validate input
    if (!validate(username, password)) {
      return;
    }
    // fetch
    try {
        // Call the login function
        const response = await login({ username, password });

        if (response.data.success) {
          // Store the JWT token in local storage
          const accessToken = response.data.accessToken;
          localStorage.setItem('jwtToken', accessToken);
          const jwtPayload = jwtDecode<{ userID: string, username: string, exp: number }>(accessToken)
          localStorage.setItem('userID', jwtPayload['userID'])
          localStorage.setItem('username', jwtPayload['username'])
          localStorage.setItem('exp', String(jwtPayload['exp']))

          auth.setLoggedIn(true);
          navigate('/'); // Navigate back to the home page
        } else {
          message.info(response.data.message);
        }
    } catch (error: any) {
        console.log(error);
        // Handle error cases
        if (error.response) {
          // Request was made and server responded with a status code outside the range of 2xx
          message.error(error.response.data.message);
        } else if (error.request) {
          // Request was made but no response was received
          message.error('No response from server');
        } else {
          // Something else happened while setting up the request
          message.error('Error occurred');
        }
    }
  };

  const showPassword = () => {
    setIsChecked(!isChecked)
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
        <div className="underline py-2">Forgot your password?</div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="w-full text-center py-2">New to Green dots?  <span>
            <Link to="/signup" className="underline">
              Sign up{' '}
            </Link>
          </span> here</div>
      </div>
    </div>
  );
};

export default Login;
