let numSquares = 6;
let colors = [];
let pickedColor;
let lives = 3;
let gameOver = false;

const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("color-display");
const messageDisplay = document.getElementById("message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const livesDisplay = document.getElementById("lives-display");

init();

function init() {
    setupSquares();
    reset();
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        // Add click listeners to squares
        squares[i].addEventListener("click", function() {
            if (gameOver) return;

            // Grab color of clicked square
            let clickedColor = this.style.backgroundColor;
            
            // Compare color to pickedColor
            // Note: browsers normalize colors, so spacing might vary. 
            // Usually "rgb(x, y, z)" is standard.
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
                gameOver = true;
            } else {
                this.style.backgroundColor = "#232323"; // Fade out
                messageDisplay.textContent = "Try Again";
                lives--;
                updateLives();
                
                if (lives === 0) {
                    messageDisplay.textContent = "Game Over!";
                    gameOver = true;
                    // Reveal the correct color by setting all to it? 
                    // Or just let them see the remaining ones?
                    // Let's reveal the correct one visually or stop interaction.
                    // For now, interaction stops via gameOver flag.
                }
            }
        });
    }
}

function reset() {
    gameOver = false;
    lives = 3;
    updateLives();
    
    // Generate all new colors
    colors = generateRandomColors(numSquares);
    // Pick a new random color from array
    pickedColor = pickColor();
    // Change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    
    // Change colors of squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.display = "block";
        squares[i].style.backgroundColor = colors[i];
    }
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function() {
    reset();
});

function changeColors(color) {
    // Loop through all squares
    for (let i = 0; i < squares.length; i++) {
        // Change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // Make an array
    let arr = [];
    // Repeat num times
    for (let i = 0; i < num; i++) {
        // Get random color and push into arr
        arr.push(randomColor());
    }
    // Return that array
    return arr;
}

function randomColor() {
    // Pick a "red" from 0 - 255
    let r = Math.floor(Math.random() * 256);
    // Pick a "green" from 0 - 255
    let g = Math.floor(Math.random() * 256);
    // Pick a "blue" from 0 - 255
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function updateLives() {
    livesDisplay.textContent = "Lives: " + lives;
}