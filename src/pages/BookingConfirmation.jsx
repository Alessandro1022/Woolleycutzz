import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import sv from 'date-fns/locale/sv';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  background: 'linear-gradient(135deg, #FFFFFF 0%, #FDF6E3 100%)',
  border: '1px solid #D4AF37',
  borderRadius: 16,
  boxShadow: '0 4px 8px rgba(212, 175, 55, 0.15)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #D4AF37 30%, #B38B2D 90%)',
  boxShadow: '0 3px 5px 2px rgba(212, 175, 55, .3)',
  color: '#FFFFFF',
  padding: '10px 24px',
  '&:hover': {
    background: 'linear-gradient(45deg, #B38B2D 30%, #D4AF37 90%)',
  },
}));

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    navigate('/');
    return null;
  }

  const formattedDate = format(new Date(booking.date), 'EEEE d MMMM yyyy', { locale: sv });
  const formattedTime = booking.time;

  return (
    <Container maxWidth="sm">
      <StyledPaper>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#D4AF37', textAlign: 'center' }}>
          Bokningsbekräftelse
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Bokningsdetaljer
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ p: 2, border: '1px solid #D4AF37', borderRadius: 1 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Datum:</strong> {formattedDate}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Tid:</strong> {formattedTime}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Tjänst:</strong> {booking.service}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Kund:</strong> {booking.customerName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Telefon:</strong> {booking.customerPhone}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={booking.status}
                    color="primary"
                    sx={{ background: '#D4AF37' }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Tack för din bokning! Vi ser fram emot ditt besök.
                </Typography>
                <StyledButton
                  variant="contained"
                  onClick={() => navigate('/')}
                >
                  Tillbaka till startsidan
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default BookingConfirmation; 