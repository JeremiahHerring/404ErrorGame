const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define game objects
const capy = {
    x: 50,
    y: canvas.height - 60,
    // maybe have y as:
    // canvas.height - capy.height - ground.height
    width: 40,
    height: 40,
    jumpHeight: 0.35 * canvas.height, // The max point height on the canvas where the top of the capy can touch
    isJumping: false,
    jumpSpeed: 5,
};

const ground = {
    height: 10,
    y: canvas.height - 10
};

const camera = {
    x: 0,
};

let worldSpeed = 0; // Change this value to set the initial speed
let isGameStarted = false;
const obstacles = []; // An array to store obstacles
let isGameOver = false;

function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameStarted) {
        camera.x += worldSpeed;
    }

    if (capy.isJumping) {
        capy.y -= capy.jumpSpeed;
        // Check if the jump has reached its peak
        if (capy.y <= capy.jumpHeight) {
            capy.isJumping = false;
            // If so, stop jumping and start falling
        }
    } else {
        // Implement falling logic
        const gravity = 3.5;
        if (capy.y < ground.y - capy.height) {
            capy.y += gravity;
        } else {
            // Reset the capybara's Y position when it lands on the ground
            capy.y = ground.y - capy.height;
        }
    }

    if (!isGameOver) {
        checkCollisions();
    }

    if (Math.random() < 0.007) { // Adjust the probability as needed
        createObstacle();
    }

    // Draw game elements
    drawGround();
    drawObstacles();
    drawCapybara(); // Draw the capybara last to keep it in front

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Handle keyboard input (e.g., spacebar for jumping)
document.addEventListener('keydown', (event) => {
    if (event.key === ' ' && !capy.isJumping) {
        // Prevent page scrolling when pressing spacebar
        event.preventDefault();

        if (!isGameStarted) {
            // Start the game when the spacebar is pressed
            isGameStarted = true;
            worldSpeed = 2; // Set the desired speed when the game starts
            requestAnimationFrame(gameLoop);
        }

        if (capy.y === ground.y - capy.height) {
            capy.isJumping = true;
        }
    }
});

// resize canvas based on screen size
window.addEventListener("resize", () => {
    if (window.innerWidth >= 667) {
        canvas.width = 600;
    } else if (window.innerWidth >= 500) {
        canvas.width = 400;
    } else if (window.innerWidth >= 300) {
        canvas.width = 250;
    } else {
        canvas.width = 180;
    }
})

// Draw the capy
function drawCapybara() {
    ctx.fillStyle = '#ff5733';
    ctx.fillRect(capy.x, capy.y, capy.width, capy.height);
}

// Draw the ground
function drawGround() {
    ctx.fillStyle = '#222';
    const adjustedWidth = canvas.width + camera.x;
    ctx.fillRect(0, ground.y, adjustedWidth, canvas.height - ground.y);
}

// Define an obstacle constructor
function Obstacle(x, width, height) {
    this.x = x;
    this.y = ground.y - height; // Place the obstacle on the ground
    this.width = width;
    this.height = height;
}

// Function to create new obstacles
function createObstacle() {
    const obstacleWidth = 20; // Adjust the width of the obstacles
    const obstacleHeight = 20; // Adjust the height of the obstacles
    const obstacleX = canvas.width; // Start the obstacle off-screen to the right
    const obstacle = new Obstacle(obstacleX, obstacleWidth, obstacleHeight);
    obstacles.push(obstacle);
}

// Update and draw obstacles
function drawObstacles() {
    ctx.fillStyle = '#455d7a'; // Adjust obstacle color
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];

        // Move the obstacle to the left
        obstacle.x -= worldSpeed;

        // Remove obstacles that go off-screen to the left
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(i, 1);
        } else {
            ctx.fillRect(obstacle.x - camera.x, obstacle.y, obstacle.width, obstacle.height);
        }
    }
}

// Check for collisions
function checkCollisions() {
    for (const obstacle of obstacles) {
        if (
            capy.x < obstacle.x + obstacle.width &&
            capy.x + capy.width > obstacle.x &&
            capy.y < obstacle.y + obstacle.height &&
            capy.y + capy.height > obstacle.y
        ) {
            // Collision detected, game over
            isGameOver = true;
            console.log('Game Over');
        }
    }
}

// Start the game loop
gameLoop();





