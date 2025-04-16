import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import StylistDetailPage from './pages/StylistDetailPage';
import BookingForm from './pages/BookingForm';
import BookingConfirmation from './pages/BookingConfirmation';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AccountPage from './pages/AccountPage';
import CustomerDashboard from './pages/CustomerDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D4AF37',
    },
    secondary: {
      main: '#B38B2D',
    },
    background: {
      default: '#FDF6E3',
    },
  },
  typography: {
    fontFamily: [
      'Playfair Display',
      'serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<StylistDetailPage />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 