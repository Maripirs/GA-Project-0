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
const h2 = document.querySelector('h2')
const oTrack = document.querySelector('#oTracker')
const xTrack = document.querySelector('#xTracker')
const spanColor = document.querySelector('.playerColor')
let currentPlayer = 'x'
let oWins = 0
let xWins = 0
let gameGrid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let gameOver = false
let round = 1
const clearSquare = (square) =>{
    square.textContent = ''
}

const clearGame = () => {
    squares.forEach(clearSquare)
    gameGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    const results = document.querySelector('.results')
    results.style.display = 'none'
    gameOver = false
    round = 1
    h2.innerHTML = "It's <span class="playerColor">x</span> turn"
    displayCurrentPlayer()
}


const changeCurrentPlayer = () =>{    
    if (currentPlayer === 'x'){
        currentPlayer = 'o'
    } else {
        currentPlayer = 'x'
    }
}


const checkWinCondition = () => {
    console.log(round)
    for (let i = 0; i < 3; i++) {
        if (currentPlayer === gameGrid[i][0] &&
            currentPlayer === gameGrid[i][1] &&
            currentPlayer === gameGrid[i][2]) {
            return currentPlayer
        }
        if (currentPlayer === gameGrid[0][i] &&
            currentPlayer === gameGrid[1][i] &&
            currentPlayer=== gameGrid[2][i]) {
            return currentPlayer
        }
    }
    if (currentPlayer === gameGrid[0][0] &&
        currentPlayer === gameGrid[1][1] &&
        currentPlayer === gameGrid[2][2]) {
        return currentPlayer
    }
    if (currentPlayer === gameGrid[0][2] &&
        currentPlayer === gameGrid[1][1] &&
        currentPlayer === gameGrid[2][0]) {
        return currentPlayer
    }
    if (round === 9){
        return 'tie'
    } 

}

const updateGameGrid =(id) => {
    idArr = id.split('')
    let rvalue = parseInt(idArr[1])-1
    let cvalue = parseInt(idArr[3])-1
    gameGrid[rvalue][cvalue] = currentPlayer
}


const displayWinner = (winner) => {
    const results = document.querySelector('.results')
    results.style.display = 'flex'
    winText = document.querySelector('.winner')
    if (winner === currentPlayer ) {
        winText.textContent = `${currentPlayer} Wins!`
        if (currentPlayer === 'x') {
            results.style.backgroundColor = 'red'
        } else {
            results.style.backgroundColor = 'blue'
        }
        updateWinTracker()
    } else{
        winText.textContent = `It's a tie!`
    }
    gameOver = true
}
const  displayCurrentPlayer = () =>{
    if (gameOver === false){
        spanColor.textContent = `${currentPlayer}`
        if (currentPlayer === 'x'){
            spanColor.style.color ='red'
        }else{
            spanColor.style.color ='blue'
        }
        
    } else {
        h2.textContent = `Game Over!`
    }

}

const updateWinTracker =() =>{
    if(currentPlayer === 'x'){
        xWins = 1
        xTrack.textContent = xWins
    }else if(currentPlayer === 'o'){
        oWins = 1
        oTrack.textContent = oWins
    }
}

gameContainer.addEventListener('click', function(e){
    if(gameOver === false){
        if (e.target.textContent === ''){
            e.target.textContent = currentPlayer
            if (currentPlayer === 'x') {
                e.target.style.color = 'red'
            } else {
                e.target.style.color = 'blue'
            }
    
            gridID = e.target.id
            updateGameGrid(gridID)
    
            let winner = checkWinCondition()
    
            if (winner === currentPlayer || winner === 'tie') displayWinner(winner)
            changeCurrentPlayer()
            displayCurrentPlayer()
            round +=1
        } 
    }
    })





clearBtn.addEventListener('click', clearGame)
//checkWinCondition()
