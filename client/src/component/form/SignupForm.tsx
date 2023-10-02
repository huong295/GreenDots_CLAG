// src/components/SignupForm.tsx
import React, { useState } from 'react';
import axios from 'axios'; // fetch, POST data
import { useNavigate } from 'react-router-dom'; // navigate to another page


const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;


function validate(username: string, password: string, email: string) {
  // Allows alphanumeric characters and underscores, 5-45 characters long
  const usernamePattern = /^[a-zA-Z0-9_]{5,45}$/;
  // At least 8 characters, at least one uppercase letter, one lowercase letter, and one digit
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // test username
  if (!usernamePattern.test(username)) {
    alert('Username must be from 5-45 characters');
    return false;
  }

  // test password
  if (!passwordPattern.test(password)) {
    alert('Password must be from 8-50 characters, having at least 1 digit, 1 uppercase character and 1 lowercase character.')
    return false;
  }

  // test email 
  if (!emailPattern.test(email)) {
    alert('Invalid email. Please try again.')
    return false;
  }

  return true;
}


const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    if (validate(username, password, email) === false) {
      return
    }
    // Add your signup logic here
    const data = { username, password, email }
    // fetch
    axios.post(`${API_ENDPOINT}/auth/signup`, data,)
    .then((result) => {
      if (result.data.success) {
        alert('Sign up successfully!');
        // redirect to login page when sign up successfully
        navigate("/login");
      }
      else {
        alert(result.data.message)
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
        <h2 className="text-2xl font-semibold mb-4">Welcome to Greendots!</h2>
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
            type={isChecked ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="checkbox" onChange={showPassword} checked={isChecked}/>
        <label htmlFor='showPass' onClick={showPassword}>Show your password</label>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
