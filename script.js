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
        tileElement.style.backgroundColor = 'white';
    } else {
        tileElement.style.color = 'red';
        tileElement.style.backgroundColor = 'white';
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

        
        updateProbabilities();
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
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

    for (let i = 1; i <= 9; i++) {
        const tileElement = document.getElementById(`tile0${i}`);
        tileElement.innerText = '';
        tileElement.style.color = '';
        tileElement.style.backgroundColor = '';
    }

    
    updateProbabilities();
}
function updateProbabilities() {
    const probabilities = calculateProbabilities(gameBoard, currentPlayer);
    const xWinPercentage = (probabilities.xWin * 100).toFixed(2);
    const oWinPercentage = (probabilities.oWin * 100).toFixed(2);
    const drawPercentage = (probabilities.draw * 100).toFixed(2);

    document.getElementById('statusMessage').innerHTML = `
        <p>Player X Win %: ${xWinPercentage}%</p>
        <p>Player O Win %: ${oWinPercentage}%</p>
        <p>Draw %: ${drawPercentage}%</p>
    `;
}


function calculateProbabilities(board, player) {
    
    const winner = evaluateWinner(board);
    if (winner === 'X') return { xWin: 1, oWin: 0, draw: 0 };
    if (winner === 'O') return { xWin: 0, oWin: 1, draw: 0 };
    if (board.every(tile => tile)) return { xWin: 0, oWin: 0, draw: 1 };

    const availableMoves = getAvailableMoves(board);
    if (availableMoves.length === 9) {
        
        return { xWin: 0.5, oWin: 0.5, draw: 0 };
    }

    let xWins = 0, oWins = 0, draws = 0;

    for (const move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = player;

        const nextPlayer = player === 'X' ? 'O' : 'X';
        const results = calculateProbabilities(newBoard, nextPlayer);

        xWins += results.xWin;
        oWins += results.oWin;
        draws += results.draw;
    }

    const totalOutcomes = availableMoves.length;
    return {
        xWin: xWins / totalOutcomes,
        oWin: oWins / totalOutcomes,
        draw: draws / totalOutcomes
    };
}


function evaluateWinner(board) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]           
    ];

    for (const [a, b, c] of winningCombos) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; 
        }
    }
    return null;
}

function getAvailableMoves(board) {
    const moves = [];
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) moves.push(i);
    }
    return moves;
}


for (let i = 0; i < 9; i++) {
    document.getElementById(`tile0${i + 1}`).addEventListener('click', () => handleTileClick(i));
}


document.querySelector('.restart').addEventListener('click', resetGame);
