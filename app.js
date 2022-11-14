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

computerTurn(level)
    if level = 1{
        findEmptySpot()
    }else if level = 2{
        decidePlacement()
    }else if level = 3{
        if computer turn even{
            findEmptySpot
        } else {
            decidePlacement
        }
    }
    updateGrid()
    updateDrawing()
    check for wincondition()
    if gameOver
        display winner()


decidePlacement{
    if round < 2{
        if center empty{}
        draw center
        }   else {
        draw corner
        }
    check if current player about to win
            complete
    check if oponent is about to win
            block
    look for 'l' in opponent 


}


findEmptySpot()
    computerChoice = null
    while computerChoice = null
        pick a row at random
        if includes 0
            pick random column
            computerChoice = gameGrid [randomRow][randomColumn]

*/

const gameContainer = document.querySelector('.gameCont')
const clearBtn = document.querySelector('.clear')
const squares = document.querySelectorAll('.square')
const h2 = document.querySelector('h2')
const oTrack = document.querySelector('#oTracker')
const xTrack = document.querySelector('#xTracker')
const results = document.querySelector('.results')
let currentPlayer = 'x'
let otherPlayer = 'o'
let oWins = 0
let xWins = 0
let turnNumber = 1
let gameGrid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let winningSets = [
    [...gameGrid[0]],
    [...gameGrid[1]],
    [...gameGrid[2]],
    [gameGrid[0][0], gameGrid[1][0], gameGrid [2][0]],
    [gameGrid[0][1], gameGrid[1][1], gameGrid [2][1]],
    [gameGrid[0][2], gameGrid[1][2], gameGrid [2][2]],
    [gameGrid[0][0], gameGrid[1][1], gameGrid [2][2]],
    [gameGrid[0][2], gameGrid[1][1], gameGrid [2][0]]
]


let gameOver = false
let round = 1
const clearSquare = (square) =>{
    square.textContent = ''
}


//resets the array grid to 0 and clears the screen
//gets rid of winner screen and resets round tracker
const clearGame = () => {
    squares.forEach(clearSquare)
    gameGrid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    results.style.display = 'none'
    gameOver = false
    round = 1
    currentPlayer = 'x'
    h2.innerHTML = "It's <span class='playerColor'>x</span> turn"
    displayCurrentPlayer()
}

//swaps betwen o and x
const changeCurrentPlayer = () =>{    
    if (currentPlayer === 'x'){
        currentPlayer = 'o'
        otherPlayer = 'x'
    } else {
        currentPlayer = 'x'
        otherPlayer = 'o'
    }
}

//checks if the current user has 3 in a row or if it's been 9 rounds already
const checkWinCondition = () => {
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

//extracts the coordinates of user's choice and draws their ma
const updateGameGrid =(coordinates) => {
    let rvalue = null
    let cvalue = null
    if (coordinates.length === 4){
        let coordinatesArr = coordinates.split('')
        rvalue = parseInt(coordinatesArr[1])-1
        cvalue = parseInt(coordinatesArr[3])-1
    } else {
        rvalue = coordinates[0]
        cvalue = coordinates[1]
    }
    gameGrid[rvalue][cvalue] = currentPlayer
}

//it will turn the display of the text for game ovet
//will change text and color depending on the result
const displayWinner = (winner) => {
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
        results.style.backgroundColor ='green'
    }
    gameOver = true
}

//Updates the player turn and changes color of player marker in text
const  displayCurrentPlayer = () =>{
    const spanColor = document.querySelector('.playerColor')
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

//depending on current player in will increment that player's win count
const updateWinTracker =() =>{
    if(currentPlayer === 'x'){
        xWins += 1
        xTrack.textContent = xWins
    }else if(currentPlayer === 'o'){
        oWins += 1
        oTrack.textContent = oWins
    }
}

//given the coordenates of the chosen square it will display the current player's marker in that square
const updateDrawing = (computerChoice) =>{
    const computerSquare = document.querySelector(`#r${computerChoice[0] +1}c${computerChoice[1] + 1}`);
    computerSquare.textContent = currentPlayer
    if (currentPlayer === 'x') {
        computerSquare.style.color = 'red'
    } else {
        computerSquare.style.color = 'blue'
    }
}

//picks an empty square in the game grid. Will loop through the grid picking random rows and columns until one is equal to 0
const findEmptySpot = () => {
    let computerChoice = null
    while (computerChoice === null) {
        let computerRow = Math.floor(Math.random() * 3);
        if (gameGrid[computerRow].includes(0)){
            let computerCol = Math.floor(Math.random() * 3)
            if (gameGrid[computerRow][computerCol] === 0){
                return [computerRow,computerCol]
            }
        }
    }            
}

//attempt to build an AI
/*

const almostOverRow =(playerArr, winningRow) =>{
    for (let i = 0; i < 3; i++){
        if (playerArr.includes(winningRow[i].join("").toString())){
            return [i, winningRow[i].indexOf(0)]
        }
    }
}
const almostOverCol = (playerArr, winningCol) => {
    for (let i = 0; i < 3; i++){
        if (playerArr.includes(winningCol[i].join("").toString())){
            return [winningCol[i].indexOf(0), i]
        }
    }
}
const almostOverDia = (playerArr, winningDia) => {
    if (playerArr.includes(winningDia[0].join("").toString())){
        return [winningDia.indexOf(0), winningDia.indexOf(0)]
    }
    if (playerArr.includes(winningDia[1].join("").toString())){
        if (gameGrid[0][2] === 0){
            return [0, 2]
        }else if (gameGrid[1][1] === 0){
            return [1, 1]
        }else return [2, 0]
    }
} 


const checkForAlmostOver = (currentPlayer) =>{
    console.log('looking if almost over')
    let cP = currentPlayer
    let oP = null
    if (cP === 'x'){
        oP = 'o'
    }else {
       oP ='x'
    }
    let almostWinArr = [`${cP}${cP}0`,`0${cP}${cP}`, `${cP}0${cP}`]
    let almostLostArr = [`${oP}${oP}0`,`0${oP}${oP}`, `${oP}0${oP}`]
    const winningRow = [
        [...gameGrid[0]],
        [...gameGrid[1]],
        [...gameGrid[2]]
    ]
    const winningCol = [
        [gameGrid[0][0], gameGrid[1][0], gameGrid [2][0]],
        [gameGrid[0][1], gameGrid[1][1], gameGrid [2][1]],
        [gameGrid[0][2], gameGrid[1][2], gameGrid [2][2]],
    ]
    const winningDia =[
        [gameGrid[0][0], gameGrid[1][1], gameGrid [2][2]],
        [gameGrid[0][2], gameGrid[1][1], gameGrid [2][0]]
    ]
    if (almostOverRow(almostWinArr, winningRow) != undefined){
        console.log('almost win row', round)
        return almostOverRow(almostWinArr, winningRow)
    }
    if (almostOverCol(almostWinArr, winningCol) != undefined){
        console.log('almost win col', round)
        return almostOverCol(almostWinArr, winningCol)
    }
    if (almostOverDia(almostWinArr, winningDia) != undefined){
        console.log('almost win dia', round)
        return almostOverDia(almostWinArr, winningDia)
    }
    if (almostOverRow(almostLostArr, winningRow) != undefined){
        console.log('almost lost row', round)
        return almostOverRow(almostLostArr, winningRow)
    }
    if (almostOverCol(almostLostArr, winningCol) != undefined){
        console.log('almost lost col', round)
        return almostOverCol(almostLostArr, winningCol)
    }
    if (almostOverDia(almostLostArr, winningDia) != undefined){
        console.log('almost lost dia', round)
        return almostOverDia(almostLostArr, winningDia)
    }


    return 'nothing'
}






const decidePlacement =() =>{
    if (round === 2 ){
        if (gameGrid[1][1] === 0 ){
            return[1,1]
        }
        return [0,0]
    }
    if (round === 1){
        return [0,0]
    }
    if (round === 3){
        if (gameGrid[1][2] === 0) return [1,2]
        if (gameGrid[2][1] === 0) return [2,1]
        else return [0, 0]
    }
    if (round === 4){
        if (checkForAlmostOver() != 'nothing'){
            return checkForAlmostOver()
        }
        console.log('looking for an L')
        if (gameGrid[0][0] === otherPlayer && gameGrid[1][2] ===otherPlayer ||
            gameGrid[0][1] === otherPlayer && gameGrid[2][2] ===otherPlayer ){
                return [0 ,2]
            }
        if (gameGrid[0][2] === otherPlayer && gameGrid[2][1] ===otherPlayer ||
            gameGrid[1][2] === otherPlayer && gameGrid[2][0] ===otherPlayer ){
                return [2 ,2]
            }
        if (gameGrid[2][2] === otherPlayer && gameGrid[1][0] ===otherPlayer ||
            gameGrid[2][1] === otherPlayer && gameGrid[0][0] ===otherPlayer ){
                return [2 ,0]
            }
        if (gameGrid[0][2] === otherPlayer && gameGrid[1][0] ===otherPlayer ||
            gameGrid[0][1] === otherPlayer && gameGrid[1][2] ===otherPlayer ){
                return [0 ,0]
            }
    }
    if (checkForAlmostOver() != 'nothing'){
        return checkForAlmostOver()
    } else return findEmptySpot()
  
}

*/


//where all the other functions come together (only for computer)
const computerTurn =(level) =>{
    let computerChoice = null
    if (level === 1){
        computerChoice = findEmptySpot()
    }else if (level === 2){
        if (computerTurn%2 === 0){
            computerChoice = findEmptySpot()
        } else {
            computerChoice = decidePlacement()
        }
    }else if (level === 3){
        computerChoice = decidePlacement()
    }
    console.log(computerChoice,'computer choice' ,round)
    updateGameGrid(computerChoice)
    updateDrawing(computerChoice)
    let winner = checkWinCondition()
    if (winner === currentPlayer || winner === 'tie') displayWinner(winner)
    changeCurrentPlayer()
    displayCurrentPlayer()
    round +=1
    turnNumber += 1
}





//where all the other functions come together (player turn)
//listening for a click in one of the (available) squares
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
            //uncomment this to play random computer moves
            // if (gameOver === false){
            //     computerTurn(1)
            // }
        } 
    }
})





clearBtn.addEventListener('click', clearGame)
//checkWinCondition()
//computerTurn(1)