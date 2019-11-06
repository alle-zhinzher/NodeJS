const net = require('net');

const server = net.createServer(socket => {
    console.dir(socket.address());
    socket.setNoDelay(true);
    socket.write('💗');
    socket.on('data', data => {
        console.log('📨:', data);
    });
    socket.on('error', err => {
        console.log('Socket error', err);
    });
}).listen(2000);


server.on('error', err => {
    console.log("Server error", err);
})