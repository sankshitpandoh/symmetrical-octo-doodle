let express = require('express');
let http = require('http');
let path = require('path');
let socketIO = require('socket.io');

let app = express()
let server = http.Server(app)
let io = socketIO(server)

app.set('port', 8000);
app.use(express.static('public'));

/*Start listening*/
server.listen(8000, function() {
    console.log('Starting server on port 8000');
  });

let players = {}
// Adding websocket handler
io.on('connection', function(socket){
    socket.on('new player', function(){
        console.log("New player has connected")
        players[socket.id] = {
            num: 0,
            turn: true
        };
    });
    socket.on('diceNumber', function(data){
        let player = players[socket.id] || {};
        player.num = data.number,
        player.turn = data.turn
    });
});
setInterval(function(){
    io.sockets.emit('state', players);
}, 1000/60)
