const boardSize = 100;
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };
let playerPositions = [0, 0];
let currentPlayer = 0;

function createBoard() {
    const board = document.getElementById('board');
    for (let i = 100; i >= 1; i--) {
        const square = document.createElement('div');
        square.className = 'square';
        square.id = 'square' + i;
        square.innerText = i;
        board.appendChild(square);
    }
}

function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('message').innerText = `Player ${currentPlayer + 1} rolled a ${diceRoll}`;
    movePlayer(diceRoll);
}

function movePlayer(diceRoll) {
    let newPosition = playerPositions[currentPlayer] + diceRoll;
    if (newPosition > 100) return;
    if (snakes[newPosition]) {
        newPosition = snakes[newPosition];
    } else if (ladders[newPosition]) {
        newPosition = ladders[newPosition];
    }
    playerPositions[currentPlayer] = newPosition;
    updateBoard();
    checkWinner();
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document.getElementById('currentPlayer').innerText = `Current Player: Player ${currentPlayer + 1}`;
}

function updateBoard() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.innerHTML = '');
    playerPositions.forEach((pos, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.innerText = index + 1;
        squares[pos - 1].appendChild(playerDiv);
    });
}

function checkWinner() {
    if (playerPositions[currentPlayer] === 100) {
        document.getElementById('message').innerText = `Player ${currentPlayer + 1} wins!`;
        document.getElementById('rollDice').disabled = true;
    }
}

document.getElementById('rollDice').addEventListener('click', rollDice);
createBoard();
updateBoard();