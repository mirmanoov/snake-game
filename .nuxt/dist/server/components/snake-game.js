exports.ids = [1];
exports.modules = {

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("29d556bd", content, true, context)
};

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("c1bd9d9e", content, true, context)
};

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/SnakeGame.vue?vue&type=template&id=6e7cad3c&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "bg-black min-h-screen w-full h-full"
  }, [_vm._ssrNode((_vm.gameState === 'start' ? "<div class=\"flex items-center justify-center h-screen text-center\" data-v-6e7cad3c><div data-v-6e7cad3c><h1 class=\"text-5xl text-neon-green mb-8\" data-v-6e7cad3c>Play Snake Game</h1> <button class=\"px-8 py-4 bg-neon-blue text-white rounded-lg hover:bg-neon-blue-dark text-xl\" data-v-6e7cad3c>\n        Start Game\n      </button></div></div>" : _vm.gameState === 'playing' ? "<div data-v-6e7cad3c><canvas" + _vm._ssrAttr("width", _vm.canvasWidth) + _vm._ssrAttr("height", _vm.canvasHeight) + " class=\"bg-black\" data-v-6e7cad3c></canvas></div>" : _vm.gameState === 'gameover' ? "<div class=\"flex items-center justify-center h-screen text-center\" data-v-6e7cad3c><div data-v-6e7cad3c><h1 class=\"text-5xl text-neon-red mb-6\" data-v-6e7cad3c>Game Over</h1> <p class=\"text-neon-green text-2xl mb-4\" data-v-6e7cad3c>" + _vm._ssrEscape("Your Score: " + _vm._s(_vm.score)) + "</p> <button class=\"px-8 py-4 bg-neon-blue text-white rounded-lg hover:bg-neon-blue-dark text-xl\" data-v-6e7cad3c>\n        Play Again\n      </button></div></div>" : "<!---->") + " <audio src=\"/eat.mp3\" data-v-6e7cad3c></audio> <audio src=\"/music.mp3\" loop=\"loop\" data-v-6e7cad3c></audio>")]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./components/SnakeGame.vue?vue&type=template&id=6e7cad3c&scoped=true

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/SnakeGame.vue?vue&type=script&lang=js
/* harmony default export */ var SnakeGamevue_type_script_lang_js = ({
  data() {
    return {
      canvasWidth: 0,
      canvasHeight: 0,
      context: null,
      snake: [],
      snakeDirection: 'right',
      food: {
        x: 0,
        y: 0
      },
      gridSize: 20,
      tileCountX: 0,
      tileCountY: 0,
      gameInterval: null,
      gameState: 'start',
      // 'start', 'playing', 'gameover'
      score: 0,
      tgWebApp: null,
      touchStartX: 0,
      touchStartY: 0,
      touchEndX: 0,
      touchEndY: 0
    };
  },
  mounted() {
    if (false) {}
  },
  beforeDestroy() {
    if (false) {}
  },
  methods: {
    calculateCanvasSize() {
      this.canvasWidth = window.innerWidth;
      this.canvasHeight = window.innerHeight;
      this.tileCountX = Math.floor(this.canvasWidth / this.gridSize);
      this.tileCountY = Math.floor(this.canvasHeight / this.gridSize);
    },
    startGame() {
      this.enterFullScreen(); // Request full-screen mode

      this.gameState = 'playing';
      this.calculateCanvasSize();
      this.$nextTick(() => {
        this.context = this.$refs.gameCanvas.getContext('2d');
        this.resetGame();
        this.gameInterval = setInterval(this.gameLoop, 100);

        // Play background music
        this.playAudio(this.$refs.bgMusic);

        // Add touch event listeners for swipe detection with passive: false
        this.$refs.gameCanvas.addEventListener('touchstart', this.handleTouchStart, {
          passive: false
        });
        this.$refs.gameCanvas.addEventListener('touchend', this.handleTouchEnd, {
          passive: false
        });

        // Remove any existing click handlers
        this.$refs.gameCanvas.removeEventListener('click', this.canvasClickHandler);
      });
    },
    enterFullScreen() {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    },
    onFullScreenChange() {
      if (!document.fullscreenElement) {
        // The user exited full-screen mode
        // Optionally, pause the game or handle accordingly
        // For example, you can pause the game loop
        clearInterval(this.gameInterval);
        alert('You have exited full-screen mode. The game is paused.');
      } else {
        // Re-entered full-screen mode
        // Optionally, resume the game
        if (this.gameState === 'playing' && !this.gameInterval) {
          this.gameInterval = setInterval(this.gameLoop, 100);
        }
      }
    },
    resetGame() {
      this.snake = [{
        x: Math.floor(this.tileCountX / 2),
        y: Math.floor(this.tileCountY / 2)
      }];
      this.snakeDirection = 'right';
      this.score = 0;
      this.placeFood();
    },
    keyDownHandler(e) {
      if (this.gameState !== 'playing') return;
      switch (e.keyCode) {
        case 37:
          // left arrow
          if (this.snakeDirection !== 'right') this.snakeDirection = 'left';
          break;
        case 38:
          // up arrow
          if (this.snakeDirection !== 'down') this.snakeDirection = 'up';
          break;
        case 39:
          // right arrow
          if (this.snakeDirection !== 'left') this.snakeDirection = 'right';
          break;
        case 40:
          // down arrow
          if (this.snakeDirection !== 'up') this.snakeDirection = 'down';
          break;
      }
    },
    handleTouchStart(event) {
      event.preventDefault(); // Prevent default scrolling behavior
      const touch = event.changedTouches[0];
      this.touchStartX = touch.screenX;
      this.touchStartY = touch.screenY;
    },
    handleTouchEnd(event) {
      event.preventDefault(); // Prevent default scrolling behavior
      const touch = event.changedTouches[0];
      this.touchEndX = touch.screenX;
      this.touchEndY = touch.screenY;
      this.handleGesture();
    },
    handleGesture() {
      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;
      const threshold = 30; // Minimum distance to be considered a swipe

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > threshold && this.snakeDirection !== 'left') {
          // Swipe right
          this.snakeDirection = 'right';
        } else if (deltaX < -threshold && this.snakeDirection !== 'right') {
          // Swipe left
          this.snakeDirection = 'left';
        }
      } else {
        // Vertical swipe
        if (deltaY > threshold && this.snakeDirection !== 'up') {
          // Swipe down
          this.snakeDirection = 'down';
        } else if (deltaY < -threshold && this.snakeDirection !== 'down') {
          // Swipe up
          this.snakeDirection = 'up';
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
      let head = {
        ...this.snake[0]
      };
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
        if (this.snake[i].x === this.snake[0].x && this.snake[i].y === this.snake[0].y) {
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

      // Remove touch event listeners
      this.$refs.gameCanvas.removeEventListener('touchstart', this.handleTouchStart, {
        passive: false
      });
      this.$refs.gameCanvas.removeEventListener('touchend', this.handleTouchEnd, {
        passive: false
      });
      this.gameState = 'gameover';
    },
    placeFood() {
      let newX, newY;
      do {
        newX = Math.floor(Math.random() * this.tileCountX);
        newY = Math.floor(Math.random() * this.tileCountY);
      } while (this.snake.some(part => part.x === newX && part.y === newY));
      this.food = {
        x: newX,
        y: newY
      };
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
      this.snake.forEach(part => {
        this.context.fillRect(part.x * this.gridSize, part.y * this.gridSize, this.gridSize, this.gridSize);
      });

      // Draw food with neon glow
      this.context.shadowColor = '#FF3131'; // Neon red
      this.context.fillStyle = '#FF3131'; // Neon red
      this.context.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);

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
          playPromise.catch(error => {
            // Auto-play was prevented
            // Show a UI element to let the user manually start playback
            console.error('Audio play prevented:', error);
          });
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./components/SnakeGame.vue?vue&type=script&lang=js
 /* harmony default export */ var components_SnakeGamevue_type_script_lang_js = (SnakeGamevue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./components/SnakeGame.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(25)
if (style0.__inject__) style0.__inject__(context)
var style1 = __webpack_require__(27)
if (style1.__inject__) style1.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SnakeGamevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "6e7cad3c",
  "73827e87"
  
)

/* harmony default export */ var SnakeGame = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_6e7cad3c_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_6e7cad3c_prod_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_6e7cad3c_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_6e7cad3c_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_6e7cad3c_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, "body,html{height:100%;margin:0;overflow:hidden;overscroll-behavior:none;padding:0;touch-action:none}*{box-sizing:border-box}body{background-color:#000}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_1_id_6e7cad3c_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_1_id_6e7cad3c_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_1_id_6e7cad3c_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_1_id_6e7cad3c_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_1_id_6e7cad3c_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, "canvas[data-v-6e7cad3c]{display:block}.text-neon-green[data-v-6e7cad3c]{color:#39ff14}.text-neon-red[data-v-6e7cad3c]{color:#ff3131}.bg-neon-blue[data-v-6e7cad3c]{background-color:#1b03a3}.bg-neon-blue-dark[data-v-6e7cad3c]{background-color:navy}button[data-v-6e7cad3c]{box-shadow:0 0 10px #1b03a3}button[data-v-6e7cad3c]:hover{box-shadow:0 0 20px navy}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ })

};;
//# sourceMappingURL=snake-game.js.map