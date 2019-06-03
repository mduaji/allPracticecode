const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user is disconnected');
    })
})

http.listen(5000, () => {
    console.log('server listening port 5000');
})