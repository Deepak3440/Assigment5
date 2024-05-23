import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import DriverDashboard from './components/DriverDashboard';
import RequestRide from './components/RequestRide';
import Home from './components/Home'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/rider/dashboard" element={<DriverDashboard />} />
        <Route path="/user/request-ride" element={<RequestRide />} />
        {/* Add a route for the root URL */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
