let socket = io();
let diceNumber
let players

document.getElementById("btn").addEventListener('click', function(event){
    diceNumber = Math.round(Math.random() * 6)
    socket.emit('pass_turn', diceNumber)
})

socket.on('state', function(dataReceived){
    document.getElementById("dice-number").innerHTML = (dataReceived.dValues)
    document.getElementById("path").innerHTML  = " "
    for(let j = 0; j < dataReceived.numberOfplayers; j++){
        console.log("hi")
        document.getElementById("path").innerHTML += `<div class="player"></div>`
    }
    // console.log(dataReceived.player)
})
