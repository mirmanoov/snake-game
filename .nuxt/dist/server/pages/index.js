exports.ids = [3,1];
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
  add("29386298", content, true, context)
};

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/SnakeGame.vue?vue&type=template&id=0843bd98&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "bg-black min-h-screen w-full h-full"
  }, [_vm._ssrNode((_vm.gameState === 'start' ? "<div class=\"flex items-center justify-center h-screen text-center\" data-v-0843bd98><h1 class=\"text-5xl text-neon-green mb-8\" data-v-0843bd98>Play Snake Game</h1> <button class=\"px-8 py-4 bg-neon-blue text-white rounded-lg hover:bg-neon-blue-dark text-xl\" data-v-0843bd98>\n      Start Game\n    </button></div>" : _vm.gameState === 'playing' ? "<div data-v-0843bd98><canvas" + _vm._ssrAttr("width", _vm.canvasWidth) + _vm._ssrAttr("height", _vm.canvasHeight) + " class=\"bg-black\" data-v-0843bd98></canvas></div>" : _vm.gameState === 'gameover' ? "<div class=\"flex items-center justify-center h-screen text-center\" data-v-0843bd98><div data-v-0843bd98><h1 class=\"text-5xl text-neon-red mb-6\" data-v-0843bd98>Game Over</h1> <p class=\"text-neon-green text-2xl mb-4\" data-v-0843bd98>" + _vm._ssrEscape("Your Score: " + _vm._s(_vm.score)) + "</p> <button class=\"px-8 py-4 bg-neon-blue text-white rounded-lg hover:bg-neon-blue-dark text-xl\" data-v-0843bd98>\n        Play Again\n      </button></div></div>" : "<!---->") + " <audio src=\"assets/eat.mp3\" data-v-0843bd98></audio> <audio src=\"assets/music.mp3\" loop=\"loop\" data-v-0843bd98></audio>")]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./components/SnakeGame.vue?vue&type=template&id=0843bd98&scoped=true

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
      tgWebApp: null
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
  "0843bd98",
  "73827e87"
  
)

/* harmony default export */ var SnakeGame = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_0843bd98_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_0843bd98_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_0843bd98_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_0843bd98_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SnakeGame_vue_vue_type_style_index_0_id_0843bd98_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, "body[data-v-0843bd98]{background-color:#000;margin:0}canvas[data-v-0843bd98]{display:block}.text-neon-green[data-v-0843bd98]{color:#39ff14}.text-neon-red[data-v-0843bd98]{color:#ff3131}.bg-neon-blue[data-v-0843bd98]{background-color:#1b03a3}.bg-neon-blue-dark[data-v-0843bd98]{background-color:navy}button[data-v-0843bd98]{box-shadow:0 0 10px #1b03a3}button[data-v-0843bd98]:hover{box-shadow:0 0 20px navy}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("af9b2eae", content, true, context)
};

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_04b41d50_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_04b41d50_prod_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_04b41d50_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_04b41d50_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_04b41d50_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 31:
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

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=template&id=04b41d50
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('SnakeGame');
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./pages/index.vue?vue&type=template&id=04b41d50

// EXTERNAL MODULE: ./components/SnakeGame.vue + 4 modules
var SnakeGame = __webpack_require__(23);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=script&lang=js

/* harmony default export */ var lib_vue_loader_options_pagesvue_type_script_lang_js = ({
  components: {
    SnakeGame: SnakeGame["default"]
  }
});
// CONCATENATED MODULE: ./pages/index.vue?vue&type=script&lang=js
 /* harmony default export */ var pagesvue_type_script_lang_js = (lib_vue_loader_options_pagesvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./pages/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(30)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pagesvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "509fa229"
  
)

/* harmony default export */ var pages = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {SnakeGame: __webpack_require__(23).default})


/***/ })

};;
//# sourceMappingURL=index.js.map