import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RequestRide = ({ history }) => {
  const [details, setDetails] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [price, setPrice] = useState('');

  const handleRequestRide = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/rides/request',
        { details, pickupLocation, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Ride requested successfully');
      history.push('/user/history');
    } catch (error) {
      toast.error('Failed to request ride');
    }
  };

  return (
    <div>
      <h2>Request a Ride</h2>
      <form onSubmit={handleRequestRide}>
        <div>
          <label>Details:</label>
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pickup Location:</label>
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Request Ride</button>
      </form>
    </div>
  );
};

export default RequestRide;
