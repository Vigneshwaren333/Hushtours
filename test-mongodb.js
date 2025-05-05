const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

console.log('Testing MongoDB connection...');
console.log('Connection string:', process.env.MONGODB_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully!');
  
  // Define a simple schema
  const TestSchema = new mongoose.Schema({
    name: String,
    date: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Create a model
  const Test = mongoose.model('Test', TestSchema);
  
  // Create and save a document
  return Test.create({
    name: 'Test Entry',
    date: new Date()
  });
})
.then(result => {
  console.log('Test document created successfully:', result);
  console.log('MongoDB test PASSED ✓');
  process.exit(0);
})
.catch(err => {
  console.error('MongoDB connection or operation error:');
  console.error('Error name:', err.name);
  console.error('Error message:', err.message);
  console.error('Error code:', err.code);
  console.error('Full error:', err);
  console.log('MongoDB test FAILED ✗');
  process.exit(1);
}); 