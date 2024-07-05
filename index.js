import express from 'express'
import { Server } from 'socket.io';
import cors from 'cors'
import 'dotenv/config'

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors())
app.use(express.static('public'))

const expressServer = app.listen(PORT, ()=> console.log('Server is running on 8080'))

const io = new Server(expressServer, {
    cors:true,

})

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Join a specific room
    socket.on('joinRoom', ({ userName, room }) => {
      socket.join(room);
      socket.userName = userName;
  
      // Send a welcome message to the user
      socket.emit('message', 'You are now connected to an agent');
  
      // Broadcast when a user connects
      socket.broadcast.to(room).emit('message', `${userName} has joined the chat`);
  
      // Listen for chat messages
      socket.on('message', (msg) => {
        io.to(room).emit('message', `${socket.userName}: ${msg}`);
      });
  
      // Runs when client disconnects
      socket.on('disconnect', () => {
        io.to(room).emit('message', `${socket.userName} has left the chat`);
      });
    });
  });
  