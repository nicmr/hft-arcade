var express = require('express');
const socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(3000, function() {
  console.log('listening to requenst on port 3000');
});


// Static files

app.use(express.static('public'));


var io = socket(server);
io.on('connection', function(socket) {
  console.log('made socket connection', socket.id);

// Send data to everyone who is connected

  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  })

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data)
  })

  socket.on('Button', function(data) {
    io.sockets.emit('Button', data);
  })

  socket.on('Player', function (data) {
    io.sockets.emit('Player', data);
  })

})
