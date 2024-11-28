exports.ids = [2,1];
exports.modules = {

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("3f6eca8c", content, true, context)
};

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/SnakeGame.vue?vue&type=template&id=21c00987&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "flex items-center justify-center bg-black min-h-screen"
  }, [_vm._ssrNode((_vm.gameState === 'start' ? "<div class=\"text-center\" data-v-21c00987><h1 class=\"text-5xl text-neon-green mb-8\" data-v-21c00987>Play Snake Game</h1> <button class=\"px-8 py-4 bg-neon-blue text-white rounded-lg hover:bg-neon-blue-dark text-xl\" data-v-21c00987>\n      Start Game\n    </button></div>" : _vm.gameState === 'playing' ? "<div class=\"flex flex-col items-center\" data-v-21c00987><div class=\"text-neon-green text-2xl mb-2\" data-v-21c00987>" + _vm._ssrEscape("Score: " + _vm._s(_vm.score)) + "</div> <canvas" + _vm._ssrAttr("width", _vm.canvasSize) + _vm._ssrAttr("height", _vm.canvasSize) + " class=\"border-4 border-neon-blue bg-black\" data-v-21c00987></canvas></div>" : _vm.gameState === 'gameover' ? "<div class=\"text-center\" data-v-21c00987><h1 class=\"text-5xl text-neon-red mb-6\" data-v-21c00987>Game Over</h1> <p class=\"text-neon-green text-2xl mb-4\" data-v-21c00987>" + _vm._ssrEscape("Your Score: " + _vm._s(_vm.score)) + "</p> <button class=\"px-8 py-4 bg-neon-blue text-white rounded-lg hover:bg-neon-blue-dark text-xl\" data-v-21c00987>\n      Play Again\n    </button></div>" : "<!---->") + " <audio src=\"assets/eat.mp3\" data-v-21c00987></audio> <audio src=\"assets/music.mp3\" loop=\"loop\" data-v-21c00987></audio>")]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./components/SnakeGame.vue?vue&type=template&id=21c00987&scoped=true

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/SnakeGame.vue?vue&type=script&lang=js
/* harmony default export */ var SnakeGamevue_type_script_lang_js = ({
  data() {
    return {
      canvasSize: 0,
      context: null,
      snake: [],
      snakeDirection: 'right',
      food: {
        x: 0,
        y: 0
      },
      gridSize: 0,
      tileCount: 20,
      gameInterval: null,
      gameState: 'start',
      // 'start', 'playing', 'gameover'
      score: 0,
      tgWebApp: null
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
        // Uncomment if you have background music
        // this.$refs.bgMusic.play();

        // Add event listeners
        this.$refs.gameCanvas.addEventListener('click', this.canvasClickHandler);
        this.$refs.gameCanvas.addEventListener('touchstart', this.canvasClickHandler);
      });
    },
    resetGame() {
      this.snake = [{
        x: 10,
        y: 10
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
      head.x = (head.x + this.tileCount) % this.tileCount;
      head.y = (head.y + this.tileCount) % this.tileCount;
      this.snake.unshift(head);

      // Check for food collision
      if (head.x === this.food.x && head.y === this.food.y) {
        this.score++;
        this.placeFood();

        // Play eat sound
        // Uncomment if you have an eat sound
        // this.$refs.eatSound.currentTime = 0;
        // this.$refs.eatSound.play();
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
      // Uncomment if you have background music
      // this.$refs.bgMusic.pause();
      // this.$refs.bgMusic.currentTime = 0;

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
      } while (this.snake.some(part => part.x === newX && part.y === newY));
      this.food = {
        x: newX,
        y: newY
      };
    },
    drawGame() {
      // Clear canvas with a black background
      this.context.fillStyle = '#000000';
      this.context.fillRect(0, 0, this.canvasSize, this.canvasSize);

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
      for (let i = 0; i <= this.tileCount; i++) {
        // Vertical lines
        this.context.beginPath();
        this.context.moveTo(i * this.gridSize, 0);
        this.context.lineTo(i * this.gridSize, this.canvasSize);
        this.context.stroke();

        // Horizontal lines
        this.context.beginPath();
        this.context.moveTo(0, i * this.gridSize);
        this.context.lineTo(this.canvasSize, i * this.gridSize);
        this.context.stroke();
      }
    },
    applyTheme(themeParams) {
      // You can adjust the game's colors based on Telegram's theme parameters
      // For simplicity, this function is left empty
    }
  }
});
// CONCATENATED MODULE: ./components/SnakeGame.vue?vue&type=script&lang=js
 /* harmony default export */ var components_SnakeGamevue_type_script_lang_js = (SnakeGamevue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./components/SnakeGame.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(24)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_SnakeGamevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "21c00987",
  "73827e87"
  
)

/* harmony default export */ var SnakeGame = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_21c00987_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_21c00987_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_21c00987_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_21c00987_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_21c00987_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, "body[data-v-21c00987]{background-color:#000;margin:0}canvas[data-v-21c00987]{display:block}.text-neon-green[data-v-21c00987]{color:#39ff14}.text-neon-red[data-v-21c00987]{color:#ff3131}.bg-neon-blue[data-v-21c00987]{background-color:#1b03a3}.bg-neon-blue-dark[data-v-21c00987]{background-color:navy}.border-neon-blue[data-v-21c00987]{border-color:#1b03a3}button[data-v-21c00987]{box-shadow:0 0 10px #1b03a3}button[data-v-21c00987]:hover{box-shadow:0 0 20px navy}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("58f89ff5", content, true, context)
};

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_game_vue_vue_type_style_index_0_id_c5722cb8_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_game_vue_vue_type_style_index_0_id_c5722cb8_prod_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_game_vue_vue_type_style_index_0_id_c5722cb8_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_game_vue_vue_type_style_index_0_id_c5722cb8_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_game_vue_vue_type_style_index_0_id_c5722cb8_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, "", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/game.vue?vue&type=template&id=c5722cb8
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('SnakeGame');
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/game.vue?vue&type=template&id=c5722cb8

// EXTERNAL MODULE: ./components/SnakeGame.vue + 4 modules
var SnakeGame = __webpack_require__(23);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/game.vue?vue&type=script&lang=js

/* harmony default export */ var gamevue_type_script_lang_js = ({
  components: {
    SnakeGame: SnakeGame["default"]
  }
});
// CONCATENATED MODULE: ./pages/game.vue?vue&type=script&lang=js
 /* harmony default export */ var pages_gamevue_type_script_lang_js = (gamevue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./pages/game.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(28)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_gamevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "378ac1eb"
  
)

/* harmony default export */ var game = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {SnakeGame: __webpack_require__(23).default})


/***/ })

};;
//# sourceMappingURL=game.js.map