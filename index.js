import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/projects', projectRoutes);

const PORT = process.env.PORT || 8080;
const expressServer = app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
const io = new Server(expressServer, {
  cors: true
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for the join event to get the user name
  socket.on('join', (userName) => {
    socket.userName = userName;
    console.log(`${userName} joined the chat`);

    // Send a welcome message to the user
    socket.emit('message', 'You are now connected to the chat');

    // Broadcast when a user connects
    socket.broadcast.emit('message', `${userName} has joined the chat`);

    // Listen for chat messages
    socket.on('message', (msg) => {
      console.log(`Message from ${socket.userName}: ${msg}`);
      io.emit('message', `${socket.userName}: ${msg}`);
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
      console.log(`${socket.userName} disconnected`);
      io.emit('message', `${socket.userName} has left the chat`);
    });
  });

  // Handle errors
  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});
