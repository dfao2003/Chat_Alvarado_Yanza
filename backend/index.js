//Importancion
const { Server } = require('socket.io');
const http = require('http');

//cREACION
const serverHttp = http.createServer();
const io = new Server(serverHttp, {cors: {origin: ['http://localhost', 'http://localhost:4200']}});

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('received', {data: data, message: 'Prueba'});
    })
})

//Socket.io Escucha
serverHttp.listen(4000, () => {
    console.log('Correcto');
});