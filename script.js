
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let isGameOver = false;


function handleTileClick(tileIndex) {
    if (isGameOver || gameBoard[tileIndex]) return;

  
    gameBoard[tileIndex] = currentPlayer;
    const tileElement = document.getElementById(`tile0${tileIndex + 1}`);
    tileElement.innerText = currentPlayer;

  
    if (currentPlayer === 'X') {
        tileElement.style.color = 'blue';
        tileElement.style.backgroundColor='white'
    } else {
        tileElement.style.color = 'red'; 
         tileElement.style.backgroundColor='white'
    }


    if (checkWinner()) {
        const player1Name = document.getElementById('player01').value || 'Player 1';
        const player2Name = document.getElementById('player02').value || 'Player 2';
        
        if (currentPlayer === 'X') {
            document.getElementById('statusMessage').innerText = `${player1Name} wins!`;
        } else {
            document.getElementById('statusMessage').innerText = `${player2Name} wins!`;
        }
        isGameOver = true;
    } else if (gameBoard.every(tile => tile)) {
      
        document.getElementById('statusMessage').innerText = `It's a draw!`;
        isGameOver = true;
    } else {
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const player1Name = document.getElementById('player01').value || 'Player 1';
        const player2Name = document.getElementById('player02').value || 'Player 2';
        
        document.getElementById('statusMessage').innerText = `Player ${currentPlayer === 'X' ? player1Name : player2Name}, make your move!`;
    }
}


function checkWinner() {
   
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

   
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    document.getElementById('statusMessage').innerText = `Player 1, make your move!`;

    // Clear each tile on the board
    for (let i = 1; i <= 9; i++) {
        const tileElement = document.getElementById(`tile0${i}`);
        tileElement.innerText = '';
        tileElement.style.color = ''; 
}
}
// Add click event listeners to tiles
for (let i = 0; i < 9; i++) {
    document.getElementById(`tile0${i + 1}`).addEventListener('click', () => handleTileClick(i));
}

// Reset button listener
document.querySelector('.restart').addEventListener('click', resetGame);
