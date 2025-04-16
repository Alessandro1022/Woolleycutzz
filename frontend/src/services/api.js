// Mock data for testing
const mockStylists = {
  '1': {
    id: '1',
    name: 'Woolley Cutzz',
    specialty: 'Herrklippning & Skäggvård',
    experience: 5,
    image: '/images/stylist1.jpg',
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
        price: 150,
        duration: 30,
        description: "Professionell herrklippning anpassad efter dina önskemål"
      },
      {
        id: 2,
        name: "Herrklippning med skägg",
        price: 200,
        duration: 45,
        description: "Komplett styling med både hår- och skäggklippning"
      }
    ],
    location: 'Kristinedal träningcenter'
  }
};

const mockReviews = {
  '1': [
    {
      id: 1,
      user: {
        name: 'Marcus Svensson',
        avatar: 'https://source.unsplash.com/random/100x100?portrait=1',
      },
      rating: 5,
      comment: 'Bästa frisören i stan! Perfekt klippning varje gång.',
      createdAt: '2024-03-15',
    },
    {
      id: 2,
      user: {
        name: 'Anders Johansson',
        avatar: 'https://source.unsplash.com/random/100x100?portrait=2',
      },
      rating: 5,
      comment: 'Professionell service och trevlig atmosfär. Rekommenderas varmt!',
      createdAt: '2024-03-10',
    }
  ]
};

// Mock API client
const api = {
  get: async (url) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (url.startsWith('/api/stylists/')) {
      const stylistId = url.split('/').pop();
      const stylist = mockStylists[stylistId];
      
      if (stylist) {
        return { data: stylist };
      } else {
        throw new Error('Stylist not found');
      }
    }

    if (url === '/api/stylists') {
      return { data: Object.values(mockStylists) };
    }

    throw new Error('Not implemented');
  },

  post: async (url, data) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (url === '/api/bookings') {
      return { data: { ...data, id: Date.now().toString() } };
    }

    throw new Error('Not implemented');
  },
};

export default api; 