import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 8,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#D4AF37' }}
        >
          Welcome to Woolley Cutzz
        </Typography>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#D4AF37' }}
        >
          Välkommen till Woolley Cutzz
        </Typography>
        <Typography
          variant="h5"
          paragraph
          sx={{ color: '#666', maxWidth: '800px', margin: '0 auto' }}
        >
          Experience the art of luxury hair styling with our expert stylists. Book your appointment today and transform your look.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/stylists"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
          >
            Find Stylists
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="primary"
            size="large"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage; 