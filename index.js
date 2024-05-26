import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/users.js';
import articleRoutes from './routes/articles.js';
import commentRoutes from './routes/comments.js';
import insertDummyData from './utils/insertDummyData.js';

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// DB
mongoose
  .connect(`mongodb://127.0.0.1:${process.env.MONGO_URL || 27017}/test`)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);

// Default route for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Create HTTP server and setup Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (for development)
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Export the Socket.IO instance for use in controllers
export { io };

// insert dummy data
await insertDummyData();

// server
app.listen(process.env.PORT || 3500, () => {
  console.log('Node app is running on port', process.env.PORT || 3500);
});
