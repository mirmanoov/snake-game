<template>
    
    <div class="flex items-center justify-center h-screen bg-gray-900">
      <div v-if="gameState === 'start'" class="text-center">
        <h1 class="text-5xl text-green-400 mb-8">Snake Game</h1>
        <button
          @click="startGame"
          class="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xl"
        >
          Start Game
        </button>
      </div>
      <div v-else-if="gameState === 'playing'" class="relative">
        <div class="absolute top-4 left-4 text-white text-2xl">
          Score: {{ score }}
        </div>
        <canvas
          ref="gameCanvas"
          :width="canvasWidth"
          :height="canvasHeight"
          class="border-4 border-gray-700 bg-gray-800"
        ></canvas>
      </div>
      <div v-else-if="gameState === 'gameover'" class="text-center">
        <h1 class="text-5xl text-red-500 mb-6">Game Over</h1>
        <p class="text-white text-2xl mb-4">Your Score: {{ score }}</p>
        <button
          @click="startGame"
          class="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xl"
        >
          Play Again
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        canvasWidth: 400,
        canvasHeight: 400,
        context: null,
        snake: [],
        snakeDirection: 'right',
        food: { x: 0, y: 0 },
        gridSize: 20,
        tileCount: 20,
        gameInterval: null,
        gameState: 'start', // 'start', 'playing', 'gameover'
        score: 0,
      };
    },
    mounted() {

        if (window.Telegram && window.Telegram.WebApp) {
    this.tgWebApp = window.Telegram.WebApp;
    this.tgWebApp.ready();

    // Access theme parameters
    const themeParams = this.tgWebApp.themeParams;
    // Use themeParams to adjust styles, e.g.,
    this.applyTheme(themeParams);
  }
      document.addEventListener('keydown', this.keyDownHandler);
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keyDownHandler);
      clearInterval(this.gameInterval);
    },
    methods: {
      startGame() {
        this.gameState = 'playing';
        this.$nextTick(() => {
          this.context = this.$refs.gameCanvas.getContext('2d');
          this.resetGame();
          this.gameInterval = setInterval(this.gameLoop, 100);
        });
      },
      resetGame() {
        this.snake = [{ x: 10, y: 10 }];
        this.snakeDirection = 'right';
        this.score = 0;
        this.placeFood();
      },
      keyDownHandler(e) {
        if (this.gameState !== 'playing') return;
        switch (e.keyCode) {
          case 37: // left arrow
            if (this.snakeDirection !== 'right') this.snakeDirection = 'left';
            break;
          case 38: // up arrow
            if (this.snakeDirection !== 'down') this.snakeDirection = 'up';
            break;
          case 39: // right arrow
            if (this.snakeDirection !== 'left') this.snakeDirection = 'right';
            break;
          case 40: // down arrow
            if (this.snakeDirection !== 'up') this.snakeDirection = 'down';
            break;
        }
      },
      gameLoop() {
        this.updateSnakePosition();
        if (this.checkSelfCollision()) {
          this.gameOver();
        } else {
          this.drawGame();
        }
      },
      updateSnakePosition() {
        let head = { ...this.snake[0] };
        switch (this.snakeDirection) {
          case 'left':
            head.x--;
            break;
          case 'up':
            head.y--;
            break;
          case 'right':
            head.x++;
            break;
          case 'down':
            head.y++;
            break;
        }
  
        // Wrap around edges
        head.x = (head.x + this.tileCount) % this.tileCount;
        head.y = (head.y + this.tileCount) % this.tileCount;
  
        this.snake.unshift(head);
  
        // Check for food collision
        if (head.x === this.food.x && head.y === this.food.y) {
          this.score++;
          this.placeFood();
        } else {
          this.snake.pop();
        }
      },
      checkSelfCollision() {
        for (let i = 1; i < this.snake.length; i++) {
          if (
            this.snake[i].x === this.snake[0].x &&
            this.snake[i].y === this.snake[0].y
          ) {
            return true;
          }
        }
        return false;
      },
      gameOver() {
        clearInterval(this.gameInterval);
        this.gameState = 'gameover';
      },
      placeFood() {
        let newX, newY;
        do {
          newX = Math.floor(Math.random() * this.tileCount);
          newY = Math.floor(Math.random() * this.tileCount);
        } while (
          this.snake.some((part) => part.x === newX && part.y === newY)
        );
        this.food = { x: newX, y: newY };
      },
      drawGame() {
        // Clear canvas
        this.context.fillStyle = '#1a202c'; // bg-gray-800
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  
        // Draw snake
        this.context.fillStyle = '#68d391'; // green-400
        this.snake.forEach((part) => {
          this.context.fillRect(
            part.x * this.gridSize,
            part.y * this.gridSize,
            this.gridSize,
            this.gridSize
          );
        });
  
        // Draw food
        this.context.fillStyle = '#f56565'; // red-400
        this.context.fillRect(
          this.food.x * this.gridSize,
          this.food.y * this.gridSize,
          this.gridSize,
          this.gridSize
        );
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    margin: 0;
  }
  canvas {
    display: block;
  }
  </style>
  