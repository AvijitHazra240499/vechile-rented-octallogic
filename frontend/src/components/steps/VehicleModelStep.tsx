import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Box, CircularProgress } from '@mui/material';
import { useBooking } from '../../contexts/BookingContext';
import { getVehiclesByType, Vehicle } from '../../services/api';

const VehicleModelStep: React.FC = () => {
  const { vehicleType, vehicle, setVehicle } = useBooking();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!vehicleType) return;
      
      try {
        setLoading(true);
        const data = await getVehiclesByType(vehicleType.id);
        setVehicles(data);
      } catch (err) {
        setError('Failed to load vehicle models');
        console.error('Error fetching vehicles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [vehicleType]);

  if (!vehicleType) {
    return (
      <Box my={2}>
        <Typography>Please select a vehicle type first.</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box my={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (vehicles.length === 0) {
    return (
      <Box my={2}>
        <Typography>No vehicles available for the selected type.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Select Model
      </Typography>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Available {vehicleType.name} Models</FormLabel>
        <RadioGroup
          aria-label="vehicle-model"
          name="vehicle-model"
          value={vehicle?.id || ''}
          onChange={(e) => {
            const selectedVehicle = vehicles.find(v => v.id === Number(e.target.value));
            if (selectedVehicle) setVehicle(selectedVehicle);
          }}
        >
          {vehicles.map((v) => (
            <FormControlLabel
              key={v.id}
              value={v.id}
              control={<Radio />}
              label={v.model}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default VehicleModelStep;
