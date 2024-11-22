const board = document.getElementById("board");
const resultDisplay = document.getElementById("result");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameBoard = Array(9).fill(null); // Represents the game state

// Winning combinations
const winningCombos = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal 1
  [2, 4, 6], // Diagonal 2
];

// Create the game board
function createBoard() {
  board.innerHTML = ""; // Clear board
  gameBoard.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.textContent = cell || "";
    cellElement.addEventListener("click", handleCellClick);
    board.appendChild(cellElement);
  });
}

// Handle a player's move
function handleCellClick(e) {
  const cellIndex = e.target.dataset.index;

  // Update the game board
  if (!gameBoard[cellIndex]) {
    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add("taken");

    if (checkWin()) {
      resultDisplay.textContent = `${currentPlayer} Wins! 🎉`;
      endGame();
    } else if (gameBoard.every(cell => cell)) {
      resultDisplay.textContent = "It's a Draw! 🤝";
      endGame();
    } else {
      // Switch players
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      resultDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

// Check if the current player wins
function checkWin() {
  return winningCombos.some(combo =>
    combo.every(index => gameBoard[index] === currentPlayer)
  );
}

// End the game
function endGame() {
  document.querySelectorAll(".cell").forEach(cell => cell.classList.add("taken"));
}

// Restart the game
restartButton.addEventListener("click", () => {
  currentPlayer = "X";
  gameBoard = Array(9).fill(null);
  resultDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  createBoard();
});

// Initialize the game
createBoard();
resultDisplay.textContent = `Player ${currentPlayer}'s Turn`;
