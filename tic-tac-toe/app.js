/*
- Declare an empty grid

event listener for all squares{
    if  0
        replace it with current player value
        draw player in selected square()

    check win condition()
    change currentPlayer
}

check win condition{
    if row is a player
        Display winner current player
        break
    if column is a player
        Display winner current player
        break
    if diagonal 1 is a player
        Display winner current player
        break
    if diagonal 2 is a player
        Display winner current player
        break
    if round === 9
        Display tie
        break
}

display winner(currentPlayer){
    create element div
    add text
    append it
}

clear(){
    set gamegrid to default
    set all squares to ''
}


eventlistener clearbutton (click, clear())

*/
const gameContainer = document.querySelector('.gameCont')
const clearBtn = document.querySelector('.clear')
const squares = document.querySelectorAll('.square')
let currentPlayer = 'x'

const gameGrid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let player1 = 'x'
let player2 = 'o'

const clearSquare = (square) =>{
    square.textContent = ''
}

const clearGame = () => {
    squares.forEach(clearSquare)
}

gameContainer.addEventListener('click', function(e){
    console.log(e.target, this)
    if (e.target.textContent === ''){
        e.target.textContent = currentPlayer
        if (currentPlayer === 'x'){
            currentPlayer = 'o'
        } else {
            currentPlayer = 'x'
        }
    } 
    })





clearBtn.addEventListener('click', clearGame)