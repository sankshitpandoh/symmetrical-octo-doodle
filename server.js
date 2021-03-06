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

let players = []
let dValues
let timeOut
let currentTurn = 0
let turn = 0
let value = 0
const MaxWaiting = 5000

function nextTurn(){
    turn = currentTurn++ % players.length;
    players[turn].emit('your_turn')
    console.log("Next player turn has been triggered", turn)
    triggerTimeout()
}

function triggerTimeout(){
    timeOut = setTimeout(() =>{
        autoMove()
        nextTurn()
    }, MaxWaiting)
}

function autoMove(){
    let diceNumber = Math.round(Math.random() * 6)
    dValues = diceNumber
    console.log(dValues)
    let newObj ={
        'numberOfplayers': players.length,
        'dValues': dValues
    }
    giveData(newObj)
}

function resetTimeOut(){
    if(typeof timeOut === 'object'){
        console.log("timeout been reset")
        clearTimeout(timeOut)
    }
}

io.on('connection', function(socket){
    console.log("New player has connected")

    players.push(socket);
    socket.on('pass_turn', function(data){
        if(players[turn] == socket){
            dValues = (data)
            console.log(dValues)
            let newObj ={
                'numberOfplayers': players.length,
                'dValues': dValues,
            }
            resetTimeOut();
            giveData(newObj)
            nextTurn();
        }
    })
    socket.on('disconnect', function(){
        console.log('A player disconnected');
        players.splice(players.indexOf(socket),1);
        turn--;
        console.log("A number of players now ",players.length);
      });
})
function giveData(newObj){
    io.sockets.emit('state', newObj);
}
