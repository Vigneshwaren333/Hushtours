const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, './')));


console.log('Attempting to connect to MongoDB at:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error details:', {
    name: err.name,
    message: err.message,
    code: err.code,
    stack: err.stack
  });
  console.error('MongoDB connection error:', err);
});


const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  destination: {
    type: String,
    required: [true, 'Destination is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  
  strict: false, 
  strictQuery: false
});


const Booking = mongoose.model('Booking', bookingSchema);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index2.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});


app.get('/api/mongodb-status', async (req, res) => {
  try {
    
    const count = await Booking.countDocuments();
    res.status(200).json({
      success: true,
      message: 'MongoDB connection is working',
      bookingCount: count,
      databaseName: mongoose.connection.name,
      connectionState: mongoose.connection.readyState
    });
  } catch (error) {
    console.error('MongoDB status check error:', error);
    res.status(500).json({
      success: false,
      message: 'MongoDB connection check failed',
      error: error.message,
      connectionState: mongoose.connection.readyState
    });
  }
});


app.post('/api/bookings', async (req, res) => {
  try {
    console.log('Received booking data:', req.body);
    
    const { name, email, destination, date, guests } = req.body;
    
  
    if (!name || !email || !destination || !date || !guests) {
      console.error('Missing required fields:', { name, email, destination, date, guests });
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        error: 'Missing required fields'
      });
    }
    
    
    const newBooking = new Booking({
      name,
      email,
      destination,
      date,
      guests
    });
    
    console.log('Created booking document:', newBooking);
    
   
    const savedBooking = await newBooking.save();
    console.log('Booking saved successfully:', savedBooking);
    
    res.status(201).json({
      success: true,
      message: 'Booking saved successfully',
      data: savedBooking
    });
  } catch (error) {
    console.error('Error details:', error);
    
    
    let errorMessage = 'Failed to save booking';
    if (error.name === 'ValidationError') {
      errorMessage = 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', ');
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      errorMessage = 'Duplicate entry error';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: error.message
    });
  }
});


app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 