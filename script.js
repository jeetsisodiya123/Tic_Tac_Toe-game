// Selecting necessary DOM elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContiner = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let draw = document.querySelector(".draw");
let count = 0;
let turnO = true;

// Defining all possible winning patterns
const winPatterns = [
    [0,1,2], 
    [0,3,6], 
    [0,4,8], 
    [1,4,7], 
    [2,5,8], 
    [2,4,6], 
    [3,4,5], 
    [6,7,8]
];

// Function to reset the game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContiner.classList.add("hide");
    draw.classList.add("hide");
};

// Event listener for player moves
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count++;
        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        box.disabled = true;
        checkWinner();
    });
});

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Function to enable all boxes and reset content
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Function to display the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContiner.classList.remove("hide");
    draw.classList.add("hide");
    disableBoxes();
};

// Function to check for a winner
const checkWinner = () => {
    for (let patterns of winPatterns) {
        let [pos1, pos2, pos3] = patterns;
        let pos1val = boxes[pos1].innerText;
        let pos2val = boxes[pos2].innerText;
        let pos3val = boxes[pos3].innerText;

        if (pos1val && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return;
        }
    }
    checkDraw();
};

// Function to check for a draw
const checkDraw = () => {
    if (count === 9) {
        draw.classList.remove("hide");
        msgContiner.classList.add("hide");
    }
};

// Adding event listeners for reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
