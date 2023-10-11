// src/components/SignupForm.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // navigate to another page
import { signup } from '../../services/services';
import { message } from 'antd';


function validate(username: string, password: string, email: string) {
  // Allows alphanumeric characters and underscores, 5-45 characters long
  const usernamePattern = /^[a-zA-Z0-9_]{5,45}$/;
  // At least 3 characters, at least one uppercase letter, one lowercase letter, and one digit
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // test username
  if (!usernamePattern.test(username)) {
    message.warning('Username must be from 5-45 characters');
    return false;
  }

  // test password
  if (!passwordPattern.test(password)) {
    message.warning('Password must be from 3-50 characters, having at least 1 digit, 1 uppercase character and 1 lowercase character.')
    return false;
  }

  // test email 
  if (!emailPattern.test(email)) {
    message.warning('Invalid email. Please try again.')
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

  const handleSignup = async () => {
    // ignore leading and trailing whitespaces
    setUsername(username.trim()); 
    setPassword(password.trim());
    setEmail(email.trim());
    // validate input
    if (validate(username, password, email) === false) {
      return
    }
    // Add your signup logic here
    const data = { username, password, email }
    // fetch
    const response = await signup(data);

    try {
        if (response.data.success) {
          message.success('Sign up successfully!');
          navigate("/login");
        } else {
          message.info(response.data.message)
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
        <div className="w-full text-center py-2">Do you have an account?  <span>
            <Link to="/login" className="underline">
              Login{' '}
            </Link>
          </span> here</div>
      </div>
    </div>
  );
};

export default SignupForm;
