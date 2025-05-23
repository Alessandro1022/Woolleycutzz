import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, #FFFFFF 0%, #FDF6E3 100%)',
  border: '1px solid #D4AF37',
  borderRadius: 16,
  boxShadow: '0 4px 8px rgba(212, 175, 55, 0.15)',
  maxWidth: 500,
  margin: '0 auto',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Playfair Display, serif',
  color: '#D4AF37',
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #D4AF37 30%, #B38B2D 90%)',
  boxShadow: '0 3px 5px 2px rgba(212, 175, 55, .3)',
  color: '#FFFFFF',
  padding: '10px 24px',
  width: '100%',
  marginTop: theme.spacing(2),
  '&:hover': {
    background: 'linear-gradient(45deg, #B38B2D 30%, #D4AF37 90%)',
  },
}));

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Kontrollera inloggningsuppgifter
      if (formData.email === 'admin@woolley.se' && formData.password === 'admin123') {
        // Logga in användaren
        await login({ 
          email: formData.email, 
          role: 'admin',
          name: 'Admin'
        });
        
        // Hämta den ursprungliga destinationen eller gå till dashboard
        const from = location.state?.from || '/admin/dashboard';
        navigate(from, { replace: true });
      } else {
        throw new Error('Felaktig e-post eller lösenord');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <StyledPaper>
          <StyledTypography variant="h4">
            Admin Login - Woolley Cutzz
          </StyledTypography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="E-post"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Lösenord"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <StyledButton
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Logga in'}
            </StyledButton>
          </form>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default AdminLogin; 