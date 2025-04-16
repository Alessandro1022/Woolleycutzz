import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Pages
import HomePage from './pages/HomePage';
import BookingForm from './pages/BookingForm';
import BookingConfirmation from './pages/BookingConfirmation';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CustomerLogin from './pages/CustomerLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import StylistGrid from './pages/StylistGrid';
import StylistDetailPage from './pages/StylistDetailPage';
import NotFound from './pages/NotFound';
import AccountPage from './pages/AccountPage';

// Components
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D4AF37', // Gold color
    },
    secondary: {
      main: '#B38B2D', // Darker gold
    },
  },
  typography: {
    fontFamily: '"Playfair Display", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale="sv">
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="booking" element={<BookingForm />} />
                <Route path="booking-confirmation" element={<BookingConfirmation />} />
                <Route path="admin/login" element={<AdminLogin />} />
                <Route 
                  path="admin/dashboard" 
                  element={
                    <PrivateRoute requireAdmin>
                      <AdminDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route path="customer/login" element={<CustomerLogin />} />
                <Route path="customer/dashboard" element={<CustomerDashboard />} />
                <Route path="stylists" element={<StylistGrid />} />
                <Route path="stylist/:id" element={<StylistDetailPage />} />
                <Route path="book/:stylistId" element={<BookingForm />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="*" element={<HomePage />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 