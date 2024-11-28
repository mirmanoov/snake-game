<template>
  <div class="bg-black min-h-screen w-full h-full">
    <div v-if="gameState === 'start'" class="flex items-center justify-center h-screen text-center">
      <h1 class="text-5xl text-neon-green mb-8">Play Snake Game</h1>
      <button
        @click="startGame"
        class="px-8 py-4 bg-neon-blue text-white rounded-lg hover:bg-neon-blue-dark text-xl"
      >
        Start Game
      </button>
    </div>
    <div v-else-if="gameState === 'playing'">
      <canvas
        ref="gameCanvas"
        :width="canvasWidth"
        :height="canvasHeight"
        class="bg-black"
      ></canvas>
    </div>
    <div v-else-if="gameState === 'gameover'" class="flex items-center justify-center h-screen text-center">
      <div>
        <h1 class="text-5xl text-neon-red mb-6">Game Over</h1>
        <p class="text-neon-green text-2xl mb-4">Your Score: {{ score }}</p>
        <button
          @click="startGame"
          class="px-8 py-4 bg-neon-blue text-white rounded-lg hover:bg-neon-blue-dark text-xl"
        >
          Play Again
        </button>
      </div>
    </div>

    <!-- Audio Elements -->
    <audio ref="eatSound" src="assets/eat.mp3"></audio>
    <audio ref="bgMusic" src="assets/music.mp3" loop></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasWidth: 0,
      canvasHeight: 0,
      context: null,
      snake: [],
      snakeDirection: 'right',
      food: { x: 0, y: 0 },
      gridSize: 20,
      tileCountX: 0,
      tileCountY: 0,
      gameInterval: null,
      gameState: 'start', // 'start', 'playing', 'gameover'
      score: 0,
      tgWebApp: null,
    };
  },
  mounted() {
    // Ensure window is defined before accessing it
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
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
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;
      this.tileCountX = Math.floor(this.canvasWidth / this.gridSize);
      this.tileCountY = Math.floor(this.canvasHeight / this.gridSize);
    },
    startGame() {
      this.gameState = 'playing';
      this.calculateCanvasSize();
      this.$nextTick(() => {
        this.context = this.$refs.gameCanvas.getContext('2d');
        this.resetGame();
        this.gameInterval = setInterval(this.gameLoop, 100);

        // Play background music
        this.playAudio(this.$refs.bgMusic);

        // Add event listeners
        this.$refs.gameCanvas.addEventListener('click', this.canvasClickHandler);
        this.$refs.gameCanvas.addEventListener('touchstart', this.canvasClickHandler);
      });
    },
    resetGame() {
      this.snake = [{ x: Math.floor(this.tileCountX / 2), y: Math.floor(this.tileCountY / 2) }];
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

      const head = this.snake[0];
      const headX = head.x * this.gridSize + this.gridSize / 2;
      const headY = head.y * this.gridSize + this.gridSize / 2;

      const dx = x - headX;
      const dy = y - headY;

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
      head.x = (head.x + this.tileCountX) % this.tileCountX;
      head.y = (head.y + this.tileCountY) % this.tileCountY;

      this.snake.unshift(head);

      // Check for food collision
      if (head.x === this.food.x && head.y === this.food.y) {
        this.score++;
        this.placeFood();

        // Play eat sound
        this.playAudio(this.$refs.eatSound);
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
        newX = Math.floor(Math.random() * this.tileCountX);
        newY = Math.floor(Math.random() * this.tileCountY);
      } while (this.snake.some((part) => part.x === newX && part.y === newY));
      this.food = { x: newX, y: newY };
    },
    drawGame() {
      // Clear canvas with a black background
      this.context.fillStyle = '#000000';
      this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // Draw grid lines for a futuristic feel
      this.drawGrid();

      // Draw snake with neon glow
      this.context.shadowBlur = 10;
      this.context.shadowColor = '#39FF14'; // Neon green

      this.context.fillStyle = '#39FF14'; // Neon green
      this.snake.forEach((part) => {
        this.context.fillRect(
          part.x * this.gridSize,
          part.y * this.gridSize,
          this.gridSize,
          this.gridSize
        );
      });

      // Draw food with neon glow
      this.context.shadowColor = '#FF3131'; // Neon red
      this.context.fillStyle = '#FF3131'; // Neon red
      this.context.fillRect(
        this.food.x * this.gridSize,
        this.food.y * this.gridSize,
        this.gridSize,
        this.gridSize
      );

      // Reset shadow blur
      this.context.shadowBlur = 0;
    },
    drawGrid() {
      this.context.strokeStyle = '#0F0F0F';
      this.context.lineWidth = 1;

      for (let i = 0; i <= this.tileCountX; i++) {
        // Vertical lines
        this.context.beginPath();
        this.context.moveTo(i * this.gridSize, 0);
        this.context.lineTo(i * this.gridSize, this.canvasHeight);
        this.context.stroke();
      }

      for (let i = 0; i <= this.tileCountY; i++) {
        // Horizontal lines
        this.context.beginPath();
        this.context.moveTo(0, i * this.gridSize);
        this.context.lineTo(this.canvasWidth, i * this.gridSize);
        this.context.stroke();
      }
    },
    applyTheme(themeParams) {
      // You can adjust the game's colors based on Telegram's theme parameters
      // For simplicity, this function is left empty
    },
    playAudio(audioElement) {
      if (audioElement) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Auto-play was prevented
            // Show a UI element to let the user manually start playback
            console.error('Audio play prevented:', error);
          });
        }
      }
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  background-color: #000000; /* Black background */
}

canvas {
  display: block;
}

.text-neon-green {
  color: #39FF14; /* Neon green */
}

.text-neon-red {
  color: #FF3131; /* Neon red */
}

.bg-neon-blue {
  background-color: #1B03A3; /* Neon blue */
}

.bg-neon-blue-dark {
  background-color: #000080; /* Darker neon blue */
}

button {
  box-shadow: 0 0 10px #1B03A3;
}

button:hover {
  box-shadow: 0 0 20px #000080;
}
</style>
