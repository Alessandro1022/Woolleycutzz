import axios from 'axios';

// Use relative paths for API calls
const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock data
const mockStylist = {
  id: '1',
  name: 'Woolley Cutzz',
  specialty: 'Herrklippning & Skäggvård',
  experience: 5,
  rating: 4.9,
  specialties: ['Herrklippning', 'Skäggvård'],
  bio: 'Professionell frisör med fokus på herrklippning och skäggvård. Erbjuder en avslappnad och professionell upplevelse i Kristinedal träningcenter.',
  availability: {
    days: ['onsdag', 'torsdag', 'fredag', 'lördag', 'söndag'],
    hours: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  },
  services: [
    {
      id: 1,
      name: "Herrklippning",
      price: 300,
      duration: 30,
      description: "Professionell herrklippning med skäggtrimning"
    },
    {
      id: 2,
      name: "Herrklippning med skägg",
      price: 400,
      duration: 45,
      description: "Herrklippning med full skäggvård"
    }
  ],
  location: 'Kristinedal träningcenter'
};

// API functions with fallback to mock data
export const getStylist = async (id) => {
  try {
    const response = await client.get(`/stylists/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Network error or server not responding, using mock data fallback');
    return mockStylist;
  }
};

export const getStylists = async () => {
  try {
    const response = await client.get('/stylists');
    return response.data;
  } catch (error) {
    console.warn('Network error or server not responding, using mock data fallback');
    return [mockStylist];
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await client.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.warn('Network error or server not responding, using mock data fallback');
    return {
      ...bookingData,
      id: Date.now().toString(),
      status: 'pending'
    };
  }
};

export default client; 