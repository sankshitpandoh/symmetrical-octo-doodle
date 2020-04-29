let socket = io();
let diceNumber

document.getElementById("btn").addEventListener('click', function(event){
    diceNumber = Math.round(Math.random() * 6)
    socket.emit('pass_turn',diceNumber)
})

socket.on('state', function(dValues){
    console.log(dValues)
    // document.getElementById("dice-number").innerHTML = state
    // for(let j in players){
    //     document.getElementById("path").innerHTML += `<div class="player"></div>`
    // }
})
