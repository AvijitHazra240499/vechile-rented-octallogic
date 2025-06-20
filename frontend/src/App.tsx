import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BookingProvider } from './contexts/BookingContext';
import BookingForm from './components/BookingForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const theme = createTheme({})


const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>
          <BookingProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/book" replace />} />
              <Route path="/book" element={<BookingForm />} />
            </Routes>
          </BookingProvider>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
