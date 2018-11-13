require('./css/main.scss');

import Vue from 'vue';
import Board from './views/board.vue';

window.vm = new Vue({
  el: '#main',
  components: {
    board: Board
  }
})
