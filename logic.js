let turnPlayerText = document.getElementById("Turn-text")
let cells = Array.from(document.getElementsByClassName("cell"))
let winningMessage = document.getElementById("winningMessageText")
let restartButton = document.getElementById("restartButton")

const playerX = "X"
const playerO = "O"

let count = 0
let currPlayer = playerX
turnPlayerText.innerHTML = "Turn " + playerX
let cellsArray = new Array(9).fill(null)
let gameRemaining = true

const startGame = () =>{
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    restartButton.addEventListener("click",  restartTheGame)
}

function cellClicked(e){
    let id=e.target.id
    if (cellsArray[id] == null){
        cells[id].innerHTML = currPlayer
        cellsArray[id] = currPlayer
        if (currPlayer == playerX){
            count = count + 1
            currPlayer = playerO
            turnPlayerText.innerHTML = "Turn " + playerO
        }
        else{
            count = count + 1
            currPlayer = playerX
            turnPlayerText.innerHTML = "Turn " + playerX
        }
    }
    checkWhoWon(0,1,2)
    checkWhoWon(3,4,5)
    checkWhoWon(6,7,8)
    checkWhoWon(0,3,6)
    checkWhoWon(1,4,7)
    checkWhoWon(2,5,8)
    checkWhoWon(0,4,8)
    checkWhoWon(2,4,6)

    if(gameRemaining == false)
        cells.forEach(cell => cell.removeEventListener("click", cellClicked)) 
    
  
    if (count == 9 && gameRemaining == true) // All cells are full without a winner - DRAW
         winningMessage.innerHTML = "DRAW"
        
}


function restartTheGame(){
    cells.forEach(cell => cell.innerHTML=null)
    cellsArray.fill(null)
    winningMessage.innerHTML = ""
    for (let i=0; i<9; i++)
        cells[i].style.backgroundColor = 'white'
    gameRemaining = true
    count = 0
    startGame()
}


function checkWinner(cell){
    if (cell == playerO){
       winningMessage.style.fontWeight = 'bold'
       winningMessage.innerHTML = "Player O WON"
    }
    else{
       winningMessage.style.fontWeight = 'bold'
       winningMessage.innerHTML = "Player W WON"
    }
}

function drawWinnerCells(firstCell, secondCell, thirdCell){
    cells[firstCell].style.backgroundColor = 'green'
    cells[secondCell].style.backgroundColor = 'green'
    cells[thirdCell].style.backgroundColor = 'green'
}

function checkWhoWon(firstCell, secondCell, thirdCell){
    if (cellsArray[firstCell] ==  cellsArray[secondCell] && cellsArray[secondCell] == cellsArray[thirdCell] && cellsArray[thirdCell] != null){
        checkWinner(cellsArray[firstCell])
        drawWinnerCells(firstCell,secondCell,thirdCell)
        gameRemaining = false
}
}

startGame()