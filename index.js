import express from 'express'
import { Server } from 'socket.io';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.static('public'))

const expressServer = app.listen(8080, ()=> console.log('Server is running on 8080'))

const io = new Server(expressServer, {
    cors:true,

})

io.on('connection', (socket) => {
    console.log(socket.handshake.headers.host, ' has joined our server!');

    socket.emit('message', 'You are now connected to the contractor');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    })

    io.emit('newClient', socket.id);
  
    socket.on('message', (message) => {
      console.log(message);
      io.emit('message', message); // Correctly emit the message to all clients
    });
  });