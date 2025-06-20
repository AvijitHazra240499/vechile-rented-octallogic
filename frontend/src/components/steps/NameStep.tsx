import React from 'react';
import { TextField, Typography, Box, Paper, styled } from '@mui/material';
import { useBooking } from '../../contexts/BookingContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
  backgroundColor: theme.palette.background.paper,
  maxWidth: '600px',
  margin: '0 auto',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: theme.palette.background.paper,
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
}));

const NameStep: React.FC = () => {
  const { firstName, setFirstName, lastName, setLastName } = useBooking();

  return (
    <StyledPaper elevation={0}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)',
              borderRadius: '2px',
            },
            fontSize: { xs: '1.75rem', sm: '2rem' },
          }}
        >
          Tell us about yourself
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            maxWidth: '500px', 
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: '1.05rem'
          }}
        >
          We'll use this information to personalize your booking experience
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'grid', 
        gap: 3,
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        maxWidth: '600px',
        mx: 'auto',
        mt: 4
      }}>
        <div>
          <Typography 
            variant="subtitle1" 
            color="text.primary" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              mb: 1.5
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                width: '6px', 
                height: '6px', 
                bgcolor: 'primary.main', 
                borderRadius: '50%',
                mr: 1,
                display: 'inline-block'
              }} 
            />
            First Name
          </Typography>
          <StyledTextField
            fullWidth
            placeholder="Enter your first name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            InputProps={{
              style: { height: '56px' },
            }}
          />
        </div>
        <div>
          <Typography 
            variant="subtitle1" 
            color="text.primary" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              mb: 1.5
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                width: '6px', 
                height: '6px', 
                bgcolor: 'primary.main', 
                borderRadius: '50%',
                mr: 1,
                display: 'inline-block'
              }} 
            />
            Last Name
          </Typography>
          <StyledTextField
            fullWidth
            placeholder="Enter your last name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            InputProps={{
              style: { height: '56px' },
            }}
          />
        </div>
      </Box>
    </StyledPaper>
  );
};

export default NameStep;
