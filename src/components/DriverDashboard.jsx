import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const DriverDashboard = () => {
  const [rides, setRides] = useState([]);
  const location=useLocation();

  const {id}=location.state;

  useEffect(() => {
    const fetchRides = async () => {
      const driverId = id;
      try {
        const res = await axios.post('http://localhost:5000/api/auth/getTrips', { driverId });
        console.log(res.data);
        setRides(res.data);
      } catch (error) {
        toast.error('Failed to fetch rides');
      }
    };

    fetchRides();
  }, []);

  const handleAcceptRide = async (tripId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/acceptRide/${tripId}`);
      console.log(response.data);
      toast.success('Ride accepted');
      setRides(rides.map(ride => ride._id === tripId ? { ...ride, status: 'accepted' } : ride));
    } catch (error) {
      toast.error('Failed to accept ride');
    }
  };

  const handleRejectRide = async (tripId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/rejectRide/${tripId}`);
      console.log(response.data);
      toast.success('Ride rejected');
      setRides(rides.filter(ride => ride._id !== tripId));
    } catch (error) {
      toast.error('Failed to reject ride');
    }
  };

  const handleCancelRide = async (tripId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/cancelRide/${tripId}`);
      console.log(response.data);
      toast.success('Ride canceled');
      setRides(rides.map(ride => ride._id === tripId ? { ...ride, status: 'canceled' } : ride));
    } catch (error) {
      toast.error('Failed to cancel ride');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Driver Dashboard
      </Typography>
      <List>
        {rides.map((ride) => (
          <ListItem key={ride._id} divider>
            <ListItemText
              primary={`Ride from ${ride.pickupLocation} - ${ride.details}`}
              secondary={`Price: $${ride.price} | Status: ${ride.status}`}
            />
            {ride.status === 'pending' && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAcceptRide(ride._id)}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRejectRide(ride._id)}
                >
                  Reject
                </Button>
              </>
            )}
            {ride.status === 'accepted' && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCancelRide(ride._id)}
              >
                Cancel Ride
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DriverDashboard;
