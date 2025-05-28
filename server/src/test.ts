import express from 'express';
import cors from 'cors';

// Create a simple test server
const app = express();
const PORT = 5001; // Use a different port

// Basic CORS setup
app.use(cors());

// Basic middleware
app.use(express.json());

// Simple test routes
app.get('/test', (req, res) => {
  res.json({ message: 'Test server is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
}); 