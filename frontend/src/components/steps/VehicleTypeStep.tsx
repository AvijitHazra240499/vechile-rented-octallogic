import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Box, CircularProgress } from '@mui/material';
import { useBooking } from '../../contexts/BookingContext';
import { getVehicleTypes, VehicleType } from '../../services/api';

const VehicleTypeStep: React.FC = () => {
  const { wheelCount, vehicleType, setVehicleType } = useBooking();
  const [types, setTypes] = useState<VehicleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        setLoading(true);
        const data = await getVehicleTypes();
        setTypes(data);
      } catch (err) {
        setError('Failed to load vehicle types');
        console.error('Error fetching vehicle types:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleTypes();
  }, []);

  const filteredTypes = wheelCount !== null 
    ? types.filter(type => type.wheelCount === wheelCount)
    : [];

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

  if (filteredTypes.length === 0) {
    return (
      <Box my={2}>
        <Typography>No vehicle types available for the selected wheel count.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Type of Vehicle
      </Typography>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Select vehicle type</FormLabel>
        <RadioGroup
          aria-label="vehicle-type"
          name="vehicle-type"
          value={vehicleType?.id || ''}
          onChange={(e) => {
            const selectedType = types.find(type => type.id === Number(e.target.value));
            if (selectedType) setVehicleType(selectedType);
          }}
        >
          {filteredTypes.map((type) => (
            <FormControlLabel
              key={type.id}
              value={type.id}
              control={<Radio />}
              label={type.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default VehicleTypeStep;
