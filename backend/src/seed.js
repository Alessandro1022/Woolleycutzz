require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');

const stylists = [
  {
    id: '1',
    name: 'WoollyCutzz',
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
    ],
    location: 'Kristinedal träningcenter'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing stylists
    await User.deleteMany({ role: 'stylist' });
    console.log('Cleared existing stylists');

    // Insert new stylists
    await User.insertMany(stylists);
    console.log('Added stylists to database');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 