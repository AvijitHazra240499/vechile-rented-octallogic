import React, { useState, useEffect } from 'react';
import { format, isValid, addDays } from 'date-fns';
import { Box, Typography, Alert, Paper, Grid, styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useBooking } from '../../contexts/BookingContext';
import { checkVehicleAvailability } from '../../services/api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  background: theme.palette.background.paper,
}));

const DatePickerContainer = styled(Box)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '& fieldset': {
      borderWidth: '1.5px',
    },
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
  },
});

interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label: string;
  minDate?: Date;
  disabled?: boolean;
}

// Custom DatePicker component that works with the current MUI version
const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  label,
  minDate,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState<Date | null>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <DatePickerContainer>
      <DatePicker
        label={label}
        value={internalValue}
        onChange={(newValue) => {
          const date = newValue && isValid(newValue) ? newValue : null;
          setInternalValue(date);
          onChange(date);
        }}
        minDate={minDate}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            InputProps: {
              // No icon for now
            },
          },
          actionBar: {
            actions: ['today', 'cancel', 'accept'],
          },
        }}
        sx={{
          '& .MuiInputBase-root': {
            height: '56px',
          },
        }}
        views={['year', 'month', 'day']}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        dayOfWeekFormatter={(day) => day.charAt(0).toUpperCase() + day.charAt(1)}
      />
    </DatePickerContainer>
  );
};

const DateRangeStep: React.FC = () => {
  const today = new Date();
  const { vehicle, startDate, setStartDate, endDate, setEndDate } = useBooking();
  const [dateError, setDateError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Reset dates when vehicle changes
    setStartDate(null);
    setEndDate(null);
    setDateError(null);
  }, [vehicle]);

  const handleStartDateChange = async (date: Date | null) => {
    if (!date) return;
    setStartDate(date);
    
    // If end date is before new start date, reset end date
    if (endDate && date > endDate) {
      setEndDate(null);
    }
    
    // Clear any previous errors
    setDateError(null);
  };

  const handleEndDateChange = async (date: Date | null) => {
    if (!date || !startDate) return;
    
    // Basic validation
    if (date < startDate) {
      setDateError('End date cannot be before start date');
      return;
    }
    
    if (!vehicle) {
      setDateError('Please select a vehicle first');
      return;
    }
    
    try {
      setIsChecking(true);
      const { available } = await checkVehicleAvailability(
        vehicle.id,
        startDate.toISOString().split('T')[0],
        date.toISOString().split('T')[0]
      );
      
      if (!available) {
        setDateError('Selected vehicle is not available for the selected dates');
        setEndDate(null);
      } else {
        setEndDate(date);
        setDateError(null);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setDateError('Error checking availability. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  if (!vehicle) {
    return (
      <Box my={2}>
        <Typography>Please select a vehicle first.</Typography>
      </Box>
    );
  }

  return (
    <StyledPaper elevation={3}>
      <Box mb={3}>
        <Typography variant="h5" component="h2" gutterBottom sx={{
          color: 'primary.main',
          fontWeight: 'bold',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          pb: 1,
          mb: 2
        }}>
          Select Rental Dates
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Choose the start and end dates for your vehicle rental
        </Typography>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Pick-Up Date
              </Typography>
              <CustomDatePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                minDate={today}
                disabled={!vehicle}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mb={2}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Drop-Off Date
              </Typography>
              <CustomDatePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                minDate={startDate || today}
                disabled={!startDate || isChecking}
              />
            </Box>
          </Grid>
        </Grid>

        <Box mt={2}>
          {dateError && (
            <Alert 
              severity="error"
              sx={{ 
                borderRadius: 2,
                alignItems: 'center',
                '& .MuiAlert-message': {
                  display: 'flex',
                  alignItems: 'center',
                }
              }}
            >
              {dateError}
            </Alert>
          )}
          {isChecking && (
            <Alert 
              severity="info"
              sx={{ 
                borderRadius: 2,
                '& .MuiAlert-message': {
                  display: 'flex',
                  alignItems: 'center',
                }
              }}
            >
              Checking availability for your selected dates...
            </Alert>
          )}
        </Box>
      </LocalizationProvider>
    </StyledPaper>
  );
};

export default DateRangeStep;
