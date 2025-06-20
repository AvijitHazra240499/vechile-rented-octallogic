import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';
import { useBooking } from '../../contexts/BookingContext';

const WheelCountStep: React.FC = () => {
  const { wheelCount, setWheelCount } = useBooking();

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Number of wheels
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select number of wheels</FormLabel>
        <RadioGroup
          row
          aria-label="wheel-count"
          name="wheel-count"
          value={wheelCount || ''}
          onChange={(e) => setWheelCount(Number(e.target.value))}
        >
          <FormControlLabel value={2} control={<Radio />} label="2 Wheels" />
          <FormControlLabel value={4} control={<Radio />} label="4 Wheels" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default WheelCountStep;
