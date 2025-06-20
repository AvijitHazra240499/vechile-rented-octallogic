import React from 'react';
import { Box, Stepper, Step, StepLabel, Button, Container, Paper, Typography, styled, useTheme } from '@mui/material';
import { useBooking } from '../contexts/BookingContext';
import NameStep from './steps/NameStep';
import WheelCountStep from './steps/WheelCountStep';
import VehicleTypeStep from './steps/VehicleTypeStep';
import VehicleModelStep from './steps/VehicleModelStep';
import DateRangeStep from './steps/DateRangeStep';
import ConfirmationStep from './steps/ConfirmationStep';

const steps = [
  'Your Name',
  'Number of Wheels',
  'Vehicle Type',
  'Vehicle Model',
  'Rental Dates',
  'Confirmation'
];

const StyledContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  minHeight: '100vh',
  padding: theme.spacing(4, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6, 2),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2),
  },
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    fontWeight: 500,
    '&.Mui-active, &.Mui-completed': {
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  },
  '& .MuiStepIcon-root': {
    '&.Mui-completed': {
      color: theme.palette.success.main,
    },
    '&.Mui-active': {
      color: theme.palette.primary.main,
    },
  },
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    '& .MuiStepLabel-label': {
      fontSize: '0.7rem',
    },
  },
}));

const NavigationButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1.2, 3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 4px 12px 0 rgba(79, 70, 229, 0.1)',
  '&.MuiButton-contained': {
    background: 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)',
    '&:hover': {
      boxShadow: '0 6px 16px 0 rgba(79, 70, 229, 0.2)',
      background: 'linear-gradient(90deg, #4f46e5 0%, #4338ca 100%)',
    },
  },
  '&.MuiButton-outlined': {
    borderColor: theme.palette.grey[300],
    '&:hover': {
      borderColor: theme.palette.grey[400],
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
    },
  },
}));

const BookingForm: React.FC = () => {
  const theme = useTheme();
  const { step, setStep, firstName, lastName, wheelCount, vehicleType, vehicle, startDate, endDate } = useBooking();
  const [completed, setCompleted] = React.useState<{[k: number]: boolean}>({});

  const isStepValid = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return !!firstName && !!lastName;
      case 1:
        return wheelCount !== null;
      case 2:
        return !!vehicleType;
      case 3:
        return !!vehicle;
      case 4:
        return !!startDate && !!endDate;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isStepValid(step - 1)) {
      setCompleted({...completed, [step - 1]: true});
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
    setCompleted({});
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 1:
        return <NameStep />;
      case 2:
        return <WheelCountStep />;
      case 3:
        return <VehicleTypeStep />;
      case 4:
        return <VehicleModelStep />;
      case 5:
        return <DateRangeStep />;
      case 6:
        return <ConfirmationStep onComplete={handleReset} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <StyledPaper elevation={0}>
        <Typography 
          variant="h3" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '2rem', sm: '2.5rem' },
          }}
        >
          Vehicle Rental
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          align="center" 
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}
        >
          Complete your booking in just a few simple steps
        </Typography>
        
        <StyledStepper 
          activeStep={step - 1} 
          alternativeLabel
          sx={{
            '& .MuiStepConnector-line': {
              borderColor: theme.palette.grey[200],
              borderTopWidth: 2,
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel 
                StepIconProps={{
                  style: {
                    color: completed[index] ? theme.palette.success.main : 
                          step - 1 === index ? theme.palette.primary.main : theme.palette.grey[300],
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </StyledStepper>
        
        <Box 
          sx={{ 
            minHeight: '400px',
            position: 'relative',
            '& > *': {
              animation: 'fadeIn 0.3s ease-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
            },
          }}
        >
          {getStepContent(step)}
        </Box>
        
        {step <= 5 && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: 6,
              pt: 3,
              borderTop: `1px solid ${theme.palette.divider}`,
              gap: 2,
            }}
          >
            <NavigationButton
              // disabled={step === 1}
              onClick={handleBack}
              variant="outlined"
              sx={{
                visibility: step === 1 ? 'hidden' : 'visible',
              }}
            >
              Back
            </NavigationButton>
            
            {step < 6 ? (
              <NavigationButton
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid(step - 1)}
                sx={{
                  ml: 'auto',
                  opacity: isStepValid(step - 1) ? 1 : 0.7,
                  transition: 'all 0.2s',
                }}
              >
                Continue to {steps[step]}
                <Box component="span" sx={{ ml: 1, display: 'inline-flex', alignItems: 'center' }}>→</Box>
              </NavigationButton>
            ) :null}
          </Box>
        )}
      </StyledPaper>
    </StyledContainer>
  );
};

export default BookingForm;
