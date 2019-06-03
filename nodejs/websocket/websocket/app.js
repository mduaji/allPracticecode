const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

function sendtime() {
    io.emit('time', { time: new Date().toJSON() })
};

setInterval(sendtime, 10000);

io.on('connection', (socket) => {
    socket.emit('Welcome', { message: 'welcome!' , id: socket.id });
    socket.on('iam', console.log);
})

http.listen(5000, () => {
    console.log('server listen port 5000....')
})