const socket = io('http://localhost:8080')

socket.on('welcome', data =>{
    console.log(data)
    socket.emit('thank you', [4,5,6])
})

socket.on('newClient', data =>{
    console.log('Message to all client: A new socket has joined', data);
})