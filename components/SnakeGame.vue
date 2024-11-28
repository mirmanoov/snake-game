<template>
  <div class="flex items-center justify-center bg-gray-900 min-h-screen">
    <div v-if="gameState === 'start'" class="text-center">
      <h1 class="text-5xl text-green-400 mb-8">Snake Game</h1>
      <button
        @click="startGame"
        class="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xl"
      >
        Start Game
      </button>
    </div>
    <div v-else-if="gameState === 'playing'" class="flex flex-col items-center">
      <div class="text-white text-2xl mb-2">Score: {{ score }}</div>
      <canvas
        ref="gameCanvas"
        :width="canvasSize"
        :height="canvasSize"
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

    <!-- Audio Elements -->
    <audio ref="eatSound" src="/eat.mp3"></audio>
    <audio ref="bgMusic" src="/music.mp3" loop></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasSize: 0,
      context: null,
      snake: [],
      snakeDirection: 'right',
      food: { x: 0, y: 0 },
      gridSize: 0,
      tileCount: 20,
      gameInterval: null,
      gameState: 'start', // 'start', 'playing', 'gameover'
      score: 0,
      tgWebApp: null,
    };
  },
  mounted() {
    this.calculateCanvasSize();
    window.addEventListener('resize', this.calculateCanvasSize);

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
    window.removeEventListener('resize', this.calculateCanvasSize);
    clearInterval(this.gameInterval);
  },
  methods: {
    calculateCanvasSize() {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
      // Ensure canvasSize is divisible by tileCount
      this.canvasSize = Math.floor(size / this.tileCount) * this.tileCount;
      this.gridSize = this.canvasSize / this.tileCount;
    },
    startGame() {
      this.gameState = 'playing';
      this.$nextTick(() => {
        this.context = this.$refs.gameCanvas.getContext('2d');
        this.resetGame();
        this.gameInterval = setInterval(this.gameLoop, 100);

        // Play background music
        this.$refs.bgMusic.play();

        // Add event listeners
        this.$refs.gameCanvas.addEventListener('click', this.canvasClickHandler);
        this.$refs.gameCanvas.addEventListener('touchstart', this.canvasClickHandler);
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
    canvasClickHandler(event) {
      if (this.gameState !== 'playing') return;
      let x, y;
      const rect = this.$refs.gameCanvas.getBoundingClientRect();
      if (event.type === 'touchstart') {
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
      } else {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      }

      const dx = x - this.canvasSize / 2;
      const dy = y - this.canvasSize / 2;

      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal movement
        if (dx < 0 && this.snakeDirection !== 'right') {
          this.snakeDirection = 'left';
        } else if (dx > 0 && this.snakeDirection !== 'left') {
          this.snakeDirection = 'right';
        }
      } else {
        // Vertical movement
        if (dy < 0 && this.snakeDirection !== 'down') {
          this.snakeDirection = 'up';
        } else if (dy > 0 && this.snakeDirection !== 'up') {
          this.snakeDirection = 'down';
        }
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

        // Play eat sound
        this.$refs.eatSound.currentTime = 0;
        this.$refs.eatSound.play();
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

      // Stop background music
      this.$refs.bgMusic.pause();
      this.$refs.bgMusic.currentTime = 0;

      // Remove event listeners
      this.$refs.gameCanvas.removeEventListener('click', this.canvasClickHandler);
      this.$refs.gameCanvas.removeEventListener('touchstart', this.canvasClickHandler);
      this.gameState = 'gameover';
    },
    placeFood() {
      let newX, newY;
      do {
        newX = Math.floor(Math.random() * this.tileCount);
        newY = Math.floor(Math.random() * this.tileCount);
      } while (this.snake.some((part) => part.x === newX && part.y === newY));
      this.food = { x: newX, y: newY };
    },
    drawGame() {
      // Clear canvas
      this.context.fillStyle = '#1a202c'; // bg-gray-800
      this.context.fillRect(0, 0, this.canvasSize, this.canvasSize);

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
    applyTheme(themeParams) {
      // You can adjust the game's colors based on Telegram's theme parameters
      // For simplicity, this function is left empty
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
