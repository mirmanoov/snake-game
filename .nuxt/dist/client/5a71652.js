(window.webpackJsonp=window.webpackJsonp||[]).push([[4,2],{272:function(t,e,n){var content=n(275);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(108).default)("29386298",content,!0,{sourceMap:!1})},273:function(t,e,n){"use strict";n.r(e);n(35),n(44),n(83),n(84),n(45);var o=n(34);n(19),n(36),n(82);function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}var c={data:function(){return{canvasWidth:0,canvasHeight:0,context:null,snake:[],snakeDirection:"right",food:{x:0,y:0},gridSize:20,tileCountX:0,tileCountY:0,gameInterval:null,gameState:"start",score:0,tgWebApp:null}},mounted:function(){if(this.canvasWidth=window.innerWidth,this.canvasHeight=window.innerHeight,this.calculateCanvasSize(),window.addEventListener("resize",this.calculateCanvasSize),window.Telegram&&window.Telegram.WebApp){this.tgWebApp=window.Telegram.WebApp,this.tgWebApp.ready();var t=this.tgWebApp.themeParams;this.applyTheme(t)}document.addEventListener("keydown",this.keyDownHandler)},beforeDestroy:function(){document.removeEventListener("keydown",this.keyDownHandler),window.removeEventListener("resize",this.calculateCanvasSize),clearInterval(this.gameInterval)},methods:{calculateCanvasSize:function(){this.canvasWidth=window.innerWidth,this.canvasHeight=window.innerHeight,this.tileCountX=Math.floor(this.canvasWidth/this.gridSize),this.tileCountY=Math.floor(this.canvasHeight/this.gridSize)},startGame:function(){var t=this;this.gameState="playing",this.calculateCanvasSize(),this.$nextTick((function(){t.context=t.$refs.gameCanvas.getContext("2d"),t.resetGame(),t.gameInterval=setInterval(t.gameLoop,100),t.playAudio(t.$refs.bgMusic),t.$refs.gameCanvas.addEventListener("click",t.canvasClickHandler),t.$refs.gameCanvas.addEventListener("touchstart",t.canvasClickHandler)}))},resetGame:function(){this.snake=[{x:Math.floor(this.tileCountX/2),y:Math.floor(this.tileCountY/2)}],this.snakeDirection="right",this.score=0,this.placeFood()},keyDownHandler:function(t){if("playing"===this.gameState)switch(t.keyCode){case 37:"right"!==this.snakeDirection&&(this.snakeDirection="left");break;case 38:"down"!==this.snakeDirection&&(this.snakeDirection="up");break;case 39:"left"!==this.snakeDirection&&(this.snakeDirection="right");break;case 40:"up"!==this.snakeDirection&&(this.snakeDirection="down")}},canvasClickHandler:function(t){if("playing"===this.gameState){var e,n,rect=this.$refs.gameCanvas.getBoundingClientRect();"touchstart"===t.type?(e=t.touches[0].clientX-rect.left,n=t.touches[0].clientY-rect.top):(e=t.clientX-rect.left,n=t.clientY-rect.top);var head=this.snake[0],o=e-(head.x*this.gridSize+this.gridSize/2),r=n-(head.y*this.gridSize+this.gridSize/2);Math.abs(o)>Math.abs(r)?o<0&&"right"!==this.snakeDirection?this.snakeDirection="left":o>0&&"left"!==this.snakeDirection&&(this.snakeDirection="right"):r<0&&"down"!==this.snakeDirection?this.snakeDirection="up":r>0&&"up"!==this.snakeDirection&&(this.snakeDirection="down")}},gameLoop:function(){this.updateSnakePosition(),this.checkSelfCollision()?this.gameOver():this.drawGame()},updateSnakePosition:function(){var head=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){Object(o.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},this.snake[0]);switch(this.snakeDirection){case"left":head.x--;break;case"up":head.y--;break;case"right":head.x++;break;case"down":head.y++}head.x=(head.x+this.tileCountX)%this.tileCountX,head.y=(head.y+this.tileCountY)%this.tileCountY,this.snake.unshift(head),head.x===this.food.x&&head.y===this.food.y?(this.score++,this.placeFood(),this.playAudio(this.$refs.eatSound)):this.snake.pop()},checkSelfCollision:function(){for(var i=1;i<this.snake.length;i++)if(this.snake[i].x===this.snake[0].x&&this.snake[i].y===this.snake[0].y)return!0;return!1},gameOver:function(){clearInterval(this.gameInterval),this.$refs.bgMusic.pause(),this.$refs.bgMusic.currentTime=0,this.$refs.gameCanvas.removeEventListener("click",this.canvasClickHandler),this.$refs.gameCanvas.removeEventListener("touchstart",this.canvasClickHandler),this.gameState="gameover"},placeFood:function(){var t,e;do{t=Math.floor(Math.random()*this.tileCountX),e=Math.floor(Math.random()*this.tileCountY)}while(this.snake.some((function(n){return n.x===t&&n.y===e})));this.food={x:t,y:e}},drawGame:function(){var t=this;this.context.fillStyle="#000000",this.context.fillRect(0,0,this.canvasWidth,this.canvasHeight),this.drawGrid(),this.context.shadowBlur=10,this.context.shadowColor="#39FF14",this.context.fillStyle="#39FF14",this.snake.forEach((function(e){t.context.fillRect(e.x*t.gridSize,e.y*t.gridSize,t.gridSize,t.gridSize)})),this.context.shadowColor="#FF3131",this.context.fillStyle="#FF3131",this.context.fillRect(this.food.x*this.gridSize,this.food.y*this.gridSize,this.gridSize,this.gridSize),this.context.shadowBlur=0},drawGrid:function(){this.context.strokeStyle="#0F0F0F",this.context.lineWidth=1;for(var i=0;i<=this.tileCountX;i++)this.context.beginPath(),this.context.moveTo(i*this.gridSize,0),this.context.lineTo(i*this.gridSize,this.canvasHeight),this.context.stroke();for(var t=0;t<=this.tileCountY;t++)this.context.beginPath(),this.context.moveTo(0,t*this.gridSize),this.context.lineTo(this.canvasWidth,t*this.gridSize),this.context.stroke()},applyTheme:function(t){},playAudio:function(t){if(t){var e=t.play();void 0!==e&&e.catch((function(t){console.error("Audio play prevented:",t)}))}}}},h=c,l=(n(274),n(46)),component=Object(l.a)(h,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"bg-black min-h-screen w-full h-full"},["start"===t.gameState?e("div",{staticClass:"flex items-center justify-center h-screen text-center"},[e("h1",{staticClass:"text-5xl text-neon-green mb-8"},[t._v("Play Snake Game")]),t._v(" "),e("button",{staticClass:"px-8 py-4 bg-neon-blue text-white rounded-lg hover:bg-neon-blue-dark text-xl",on:{click:t.startGame}},[t._v("\n      Start Game\n    ")])]):"playing"===t.gameState?e("div",[e("canvas",{ref:"gameCanvas",staticClass:"bg-black",attrs:{width:t.canvasWidth,height:t.canvasHeight}})]):"gameover"===t.gameState?e("div",{staticClass:"flex items-center justify-center h-screen text-center"},[e("div",[e("h1",{staticClass:"text-5xl text-neon-red mb-6"},[t._v("Game Over")]),t._v(" "),e("p",{staticClass:"text-neon-green text-2xl mb-4"},[t._v("Your Score: "+t._s(t.score))]),t._v(" "),e("button",{staticClass:"px-8 py-4 bg-neon-blue text-white rounded-lg hover:bg-neon-blue-dark text-xl",on:{click:t.startGame}},[t._v("\n        Play Again\n      ")])])]):t._e(),t._v(" "),e("audio",{ref:"eatSound",attrs:{src:"assets/eat.mp3"}}),t._v(" "),e("audio",{ref:"bgMusic",attrs:{src:"assets/music.mp3",loop:""}})])}),[],!1,null,"0843bd98",null);e.default=component.exports},274:function(t,e,n){"use strict";n(272)},275:function(t,e,n){var o=n(107)((function(i){return i[1]}));o.push([t.i,"body[data-v-0843bd98]{background-color:#000;margin:0}canvas[data-v-0843bd98]{display:block}.text-neon-green[data-v-0843bd98]{color:#39ff14}.text-neon-red[data-v-0843bd98]{color:#ff3131}.bg-neon-blue[data-v-0843bd98]{background-color:#1b03a3}.bg-neon-blue-dark[data-v-0843bd98]{background-color:navy}button[data-v-0843bd98]{box-shadow:0 0 10px #1b03a3}button[data-v-0843bd98]:hover{box-shadow:0 0 20px navy}",""]),o.locals={},t.exports=o},277:function(t,e,n){var content=n(281);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(108).default)("af9b2eae",content,!0,{sourceMap:!1})},280:function(t,e,n){"use strict";n(277)},281:function(t,e,n){var o=n(107)((function(i){return i[1]}));o.push([t.i,"",""]),o.locals={},t.exports=o},283:function(t,e,n){"use strict";n.r(e);var o={components:{SnakeGame:n(273).default}},r=(n(280),n(46)),component=Object(r.a)(o,(function(){return(0,this._self._c)("SnakeGame")}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{SnakeGame:n(273).default})}}]);