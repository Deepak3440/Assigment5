import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Login = ({ history }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const  navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username: userName, password });
      const { role ,_id:id} = res.data;

      // Handle the redirection based on the role
      console.log(role);
      if (role === 'user') {
        toast.success('Login successful');
        navigate('/user/dashboard',{state:{id}});
      } else if (role === 'driver') {
        toast.success('Login successful');
        navigate('/rider/dashboard',{state:{id}});
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Failed to login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>UserName:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
