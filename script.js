document.getElementById('submit').addEventListener('click', startGame);

  function startGame() {
    const player1Name = document.getElementById('player-1').value;
    const player2Name = document.getElementById('player-2').value;

    if (player1Name && player2Name) {
      document.getElementById('player-inputs').style.display = 'none';
      document.getElementById('game-container').style.display = 'block';

      initializeGame(player1Name, player2Name);
    } else {
      alert('Please enter names for both players.');
    }
  }

  function initializeGame(player1Name, player2Name) {
    const board = document.getElementById('board');
    const message = document.querySelector('.message');

    let currentPlayer = 1;
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create cells and add event listeners
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = i + 1;
      cell.addEventListener('click', () => cellClick(i));
      board.appendChild(cell);
    }

    // Function to handle cell clicks
    function cellClick(index) {
      if (boardState[index] === '' && gameActive) {
        boardState[index] = currentPlayer === 1 ? 'X' : 'O';
        document.getElementById(index + 1).textContent = boardState[index];

        if (checkWin()) {
          message.textContent = `${currentPlayer === 1 ? player1Name : player2Name}, congratulations you won!`;
          gameActive = false;
        } else if (boardState.every(cell => cell !== '')) {
          message.textContent = 'It\'s a tie!';
          gameActive = false;
        } else {
          currentPlayer = 3 - currentPlayer; // Switch player (1 -> 2, 2 -> 1)
          message.textContent = `${currentPlayer === 1 ? player1Name : player2Name}, you're up!`;
        }
      }
    }

    // Function to check for a win
    function checkWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];

      return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c];
      });
    }

    // Initial message
    message.textContent = `${player1Name}, you're up!`;
