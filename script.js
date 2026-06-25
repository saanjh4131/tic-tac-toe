const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

resetBtn.addEventListener("click", resetGame);

function handleClick() {

    if (!gameActive || this.textContent !== "") {
        return;
    }

    this.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (gameActive) {
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {

    for (let pattern of winPatterns) {

        let a = cells[pattern[0]].textContent;
        let b = cells[pattern[1]].textContent;
        let c = cells[pattern[2]].textContent;

        if (a && a === b && b === c) {
            statusText.textContent = `Player ${a} Wins!`;
            gameActive = false;
            return;
        }
    }

    let draw = [...cells].every(cell => cell.textContent !== "");

    if (draw) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
    }
}

function resetGame() {

    cells.forEach(cell => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's Turn";
}