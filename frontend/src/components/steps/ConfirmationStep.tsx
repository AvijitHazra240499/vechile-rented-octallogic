import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Divider, CircularProgress } from '@mui/material';
import { useBooking } from '../../contexts/BookingContext';
import { createBooking } from '../../services/api';
import { format } from 'date-fns';

const ConfirmationStep: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { 
    firstName, 
    lastName, 
    vehicleType, 
    vehicle, 
    startDate, 
    endDate,
    resetForm,
    step,
    setStep
  } = useBooking();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!vehicle || !startDate || !endDate) {
      setError('Missing required information');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      const booking = await createBooking({
        firstName,
        lastName,
        vehicleId: vehicle.id,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      });
      
      setBookingId(booking.id);
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewBooking = () => {
    resetForm();
    onComplete();
  };

  if (bookingId) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Booking Confirmed! 🎉
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you, {firstName} {lastName}, for your booking.
        </Typography>
        <Typography variant="body1" paragraph>
          Your booking ID is: <strong>{bookingId}</strong>
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNewBooking}
          sx={{ mt: 2 }}
        >
          Make Another Booking
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Confirm Your Booking
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Personal Information</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography><strong>Name:</strong> {firstName} {lastName}</Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>Vehicle Details</Typography>
        <Box sx={{ mb: 2 }}>
          <Typography><strong>Type:</strong> {vehicleType?.name}</Typography>
          <Typography><strong>Model:</strong> {vehicle?.model}</Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>Rental Period</Typography>
        <Box>
          <Typography><strong>From:</strong> {startDate ? format(startDate, 'PPP') : 'N/A'}</Typography>
          <Typography><strong>To:</strong> {endDate ? format(endDate, 'PPP') : 'N/A'}</Typography>
        </Box>
      </Paper>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="outlined" 
          onClick={() => setStep(step - 1)}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          disabled={isSubmitting || !vehicle || !startDate || !endDate}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmationStep;
