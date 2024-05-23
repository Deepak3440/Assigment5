import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = ({ history }) => {
  const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name,password});
      toast.success('Registration successful');
      history.push('/login');
    } catch (error) {
      toast.error('Failed to register');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

