import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Rating,
  Chip,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #FFFFFF 0%, #FDF6E3 100%)',
  border: '1px solid #D4AF37',
  borderRadius: 16,
  boxShadow: '0 4px 8px rgba(212, 175, 55, 0.15)',
}));

const StylistDetailPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState(null);
  const [bookedTimes, setBookedTimes] = useState({});

  const mockStylist = {
    id: '1',
    name: 'Woolley Cutzz',
    specialty: 'Herrklippning & Skäggvård',
    experience: 5,
    rating: 4.9,
    bio: 'Professionell frisör med fokus på herrklippning och skäggvård. Erbjuder en avslappnad och professionell upplevelse i Kristinedal träningcenter.',
    availability: {
      days: ['onsdag', 'torsdag', 'fredag', 'lördag', 'söndag'],
      hours: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    },
    services: [
      {
        id: '1',
        name: 'Herrklippning',
        price: 300,
        duration: 30,
        description: 'Professionell herrklippning med skäggtrimning'
      },
      {
        id: '2',
        name: 'Herrklippning med skägg',
        price: 400,
        duration: 45,
        description: 'Herrklippning med full skäggvård'
      }
    ]
  };

  useEffect(() => {
    const loadBookedTimes = () => {
      try {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        console.log('Laddade bokningar:', bookings);
        
        const bookedTimesMap = {};
        
        bookings.forEach(booking => {
          if (booking.date && booking.time) {
            const date = new Date(booking.date).toISOString().split('T')[0];
            if (!bookedTimesMap[date]) {
              bookedTimesMap[date] = [];
            }
            bookedTimesMap[date].push(booking.time);
          }
        });
        
        console.log('Bokade tider:', bookedTimesMap);
        setBookedTimes(bookedTimesMap);
      } catch (error) {
        console.error('Fel vid laddning av bokningar:', error);
      }
    };

    loadBookedTimes();
    window.addEventListener('storage', loadBookedTimes);
    return () => window.removeEventListener('storage', loadBookedTimes);
  }, []);

  const handleDateChange = (date) => {
    const day = date.getDay();
    const isAvailable = mockStylist.availability.days.includes(
      ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'][day]
    );
    
    if (!isAvailable) {
      setError('Inga tider tillgängliga denna dag');
      return;
    }
    
    setSelectedDate(date);
    setSelectedTime(null);
    setError(null);
  };

  const isTimeBooked = (time) => {
    if (!selectedDate) return false;
    
    const dateString = selectedDate.toISOString().split('T')[0];
    const bookedTimesForDate = bookedTimes[dateString] || [];
    const isBooked = bookedTimesForDate.includes(time);
    
    console.log(`Kontrollerar tid ${time} för datum ${dateString}:`, {
      bookedTimesForDate,
      isBooked
    });
    
    return isBooked;
  };

  const handleTimeSelect = (time) => {
    if (isTimeBooked(time)) {
      setError('Denna tid är redan bokad');
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hours, minutes);

    const startTime = new Date(selectedDate);
    startTime.setHours(11, 0);
    
    const endTime = new Date(selectedDate);
    endTime.setHours(23, 0);

    if (selectedDateTime < startTime || selectedDateTime > endTime) {
      setError('Välj en tid mellan 11:00 och 23:00');
      return;
    }

    setSelectedTime(time);
    setError(null);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      setError('Välj datum och tid för bokningen');
      return;
    }

    navigate('/booking', {
      state: {
        stylistId: mockStylist.id,
        date: selectedDate.toISOString(),
        time: selectedTime,
        stylistName: mockStylist.name
      }
    });
  };

  return (
    <Container maxWidth="lg">
      <StyledPaper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#D4AF37' }}>
                  {mockStylist.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={mockStylist.rating} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    (128 recensioner)
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {mockStylist.bio}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Erfarenhet:</strong> {mockStylist.experience} år
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Adress:</strong> Kristinedal träningcenter
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Tillgänglighet:</strong> {mockStylist.availability.days.join(', ')} 11:00-23:00
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label="Herrklippning"
                    sx={{ mr: 1, mb: 1, background: '#D4AF37', color: '#FFFFFF' }}
                  />
                  <Chip
                    label="Skäggvård"
                    sx={{ mr: 1, mb: 1, background: '#D4AF37', color: '#FFFFFF' }}
                  />
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#D4AF37' }}>
                Tjänster
              </Typography>
              <Grid container spacing={2}>
                {mockStylist.services.map((service) => (
                  <Grid item xs={12} key={service.id}>
                    <Card sx={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FDF6E3 100%)', border: '1px solid #D4AF37' }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {service.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.duration} min - {service.price} kr
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom sx={{ color: '#D4AF37' }}>
                Välj datum och tid
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sv}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  sx={{
                    '& .Mui-selected': {
                      backgroundColor: '#D4AF37 !important',
                    },
                    '& .MuiPickersDay-dayWithMargin': {
                      '&:hover': {
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                      },
                    },
                  }}
                />
              </LocalizationProvider>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Tillgängliga tider:
                </Typography>
                <Grid container spacing={1}>
                  {mockStylist.availability.hours.map((time) => {
                    const isBooked = isTimeBooked(time);
                    return (
                      <Grid item xs={4} key={time}>
                        <Button
                          variant={selectedTime === time ? 'contained' : 'outlined'}
                          onClick={() => handleTimeSelect(time)}
                          disabled={isBooked}
                          sx={{
                            width: '100%',
                            borderColor: isBooked ? '#999' : '#D4AF37',
                            color: isBooked ? '#999' : (selectedTime === time ? '#FFFFFF' : '#D4AF37'),
                            backgroundColor: isBooked ? '#f5f5f5' : (selectedTime === time ? '#D4AF37' : 'transparent'),
                            '&:hover': {
                              borderColor: isBooked ? '#999' : '#B38B2D',
                            },
                            '&.Mui-disabled': {
                              color: '#999',
                              borderColor: '#999',
                            }
                          }}
                        >
                          {time}
                          {isBooked && ' (Bokad)'}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <StyledButton
                  variant="contained"
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime}
                >
                  Boka tid
                </StyledButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default StylistDetailPage; 