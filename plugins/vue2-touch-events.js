// plugins/vue2-touch-events.js
import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents, {
  swipeTolerance: 50, // Minimum distance for a swipe to be recognized
});
