import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './userDashboard.css'; // Import the CSS file

const UserDashboard = () => {
  const [rides, setRides] = useState([]);
  const [drivers, setDrivers] = useState({});

  useEffect(() => {
    const fetchRides = async () => {
      const userId = '664e50b642e7df24fff3f2ba';
      try {
        const res = await axios.post('http://localhost:5000/api/auth/getTripsUser', { userId });
        const ridesData = res.data;

        setRides(ridesData);

        // Fetch driver details for each ride
        const driverIds = ridesData.map(ride => ride.driverId);
        const driverDetailsPromises = driverIds.map(driverId => 
          axios.get(`http://localhost:5000/api/auth/drivers/${driverId}`)
        );

        const driversData = await Promise.all(driverDetailsPromises);
        const driversInfo = {};
        driversData.forEach((response, index) => {
          driversInfo[driverIds[index]] = response.data;
        });

        setDrivers(driversInfo);
      } catch (error) {
        toast.error('Failed to fetch rides');
      }
    };

    fetchRides();
  }, []);

  const find = async () => {
    const pickupLocation = document.getElementById('pickup').value;
    const destinationLocation = document.getElementById('des').value;
    const userId = '664e50b642e7df24fff3f2ba';
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        pickupLocation,
        destinationLocation,
        userId
      });
      console.log(response);
      toast.success('Ride booked successfully');
      
      // Fetch updated rides
      // fetchRides();
    } catch (error) {
      toast.error('Failed to book ride');
    }
  };
  const toCheckHistory=async()=>{
      const userId = '664e50b642e7df24fff3f2ba';
      try {
        const res = await axios.post('http://localhost:5000/api/auth/getTripsUser', { userId });
        const ridesData = res.data;

        setRides(ridesData);

        // Fetch driver details for each ride
        const driverIds = ridesData.map(ride => ride.driverId);
        const driverDetailsPromises = driverIds.map(driverId => 
          axios.get(`http://localhost:5000/api/auth/drivers/${driverId}`)
        );

        const driversData = await Promise.all(driverDetailsPromises);
        const driversInfo = {};
        driversData.forEach((response, index) => {
          driversInfo[driverIds[index]] = response.data;
        });

        setDrivers(driversInfo);
      } catch (error) {
        toast.error('Failed to fetch rides');
      }
    };



  

  return (
    <div className="dashboard-container">
      <div className="search-block">
        <input id='pickup' type='text' name='pickup' placeholder='Enter pickup location' />
        <input id='des' type='text' name='destination' placeholder='Enter destination location' />
        <button onClick={find}>Book</button>
        <button onClick={toCheckHistory}>History</button>
      </div>

      <h2>Your Rides</h2>
      <div className="rides-list-container">
        {rides.length === 0 ? (
          <p>No rides available</p>
        ) : (
          <ul className="rides-list">
            {rides.map((ride) => (
              <li key={ride._id}>
                {drivers[ride.driverId] ? (
                  <div className="rider-info">
                    <p>Driver: {drivers[ride.driverId].username}</p>
                    <p>Car: {drivers[ride.driverId].carType}</p>
                    <p>Car Number: {drivers[ride.driverId].carNumber}</p>
                    <p>Pickup Location: {drivers[ride.driverId].pickupLocation}</p>
                    <p>Destination Location: {drivers[ride.driverId].destinationLocation}</p>
                  </div>
                ) : (
                  <p>Loading driver details...</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
