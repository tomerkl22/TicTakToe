const winningMessageElement = document.getElementById('winningMessageText')
const restartButton = document.getElementById('restartButton')
const currentTurn = document.getElementById("currTurn")
const cellElements = Array.from(document.getElementsByClassName("cell"))
const winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]

let board = Array(9).fill(null)

const player_X = "X"
const player_O = "O"
let currPlayer = player_X

const cellClicked = (event) => {
    const id = event.target.id
    let winningCombination

    if (!board[id - 1]) {
        board[id - 1] = currPlayer
        cellElements[id - 1].innerHTML = currPlayer
        currPlayer = currPlayer === player_X ? player_O : player_X
        var color = currPlayer === player_X ? "red" : "blue"
        currentTurn.style.setProperty('color', color)
        cellElements[id - 1].style.setProperty('color', color)
        winningCombination = checkIfThereIsAWinner()
        if(winningCombination){
            removeEventListeners();
            colorWinningsCombination(winningCombination)
            winningMessageElement.innerHTML = "THE WINNER IS " + currPlayer  
        }
        else{
            currentTurn.textContent = currPlayer + " TURN"
        }
    }
}

function colorWinningsCombination (winningCombination) {
        const color = getComputedStyle(document.documentElement).getPropertyValue('--winning-color')
    console.log("color" + color)
    console.log(winningCombination)
    winningCombination.forEach((cell)=>{
        document.getElementById(cell).style.setProperty('color', color)
    })
}
function removeEventListeners(){
    cellElements.forEach((cell) =>{
        cell.removeEventListener('click', cellClicked)
    })
}
function checkIfThereIsAWinner(){
    let winningCombination = null
    
    winningCombinations.forEach(combination => {
        if (board[combination[0] - 1] == currPlayer
            && board[combination[1] - 1] == currPlayer
             && board[combination[2] - 1] == currPlayer) {
             winningCombination = combination
        }
    });

    return winningCombination
}

const restartGame = () =>{
    board.fill(null)
    cellElements.forEach((cell)=>{
        cell.textContent = ""
    })

    winningMessageElement.textContent = ""
    colorOriginalColor()
    startGame()
}

function colorOriginalColor(){
    const originalColor = getComputedStyle(document.documentElement).getPropertyValue("--originalColor")
    cellElements.forEach((cell) =>{
        cell.style.setProperty('color', originalColor)
    })
}

restartButton.addEventListener('click', restartGame)

const startGame = () => {
    currentTurn.textContent = currPlayer + " TURN"

    cellElements.forEach(element => {
        element.addEventListener('click', cellClicked)
    });
}

startGame()