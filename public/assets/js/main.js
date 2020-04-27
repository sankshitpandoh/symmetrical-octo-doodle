let socket = io();
let diceNumber = {
    number: 0,
    turn: true
}
document.getElementById("btn").addEventListener('click', function(event){
    diceNumber.number = Math.round(Math.random() * 6)
    console.log('changed')
    diceNumber.turn = false
})


socket.emit('new player');

setInterval(function(){
    socket.emit('diceNumber', diceNumber);
}, 1000/60)


socket.on('state', function(players){

    for(let id in players){
        // console.log(players[id])
        let player = players[id]
        if(player.turn == false){
            document.getElementById("dice-number").innerHTML = `${player.num}`
            document.getElementById("turn").innerHTML = `your turn`
        }
        if( player.turn == true){
            document.getElementById("turn").innerHTML = `Waiting for opponent`
            socket.emit('diceNumber', diceNumber.turn = false)
        }
    }

})