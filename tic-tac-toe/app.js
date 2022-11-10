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


const changeCurrentPlayer = () =>{    
    if (currentPlayer === 'x'){
        currentPlayer = 'o'
    } else {
        currentPlayer = 'x'
    }
}


const checkWinCondition = () => {
}
//r1c3
const updateGameGrid =(id) => {
    idArr = id.split('')
    let rvalue = parseInt(idArr[1])-1
    let cvalue = parseInt(idArr[3])-1
    gameGrid[1][2] = currentPlayer
}




gameContainer.addEventListener('click', function(e){
    if (e.target.textContent === ''){
        e.target.textContent = currentPlayer
        gridID = e.target.id
        updateGameGrid(gridID)
        changeCurrentPlayer()
    } 
    })





clearBtn.addEventListener('click', clearGame)