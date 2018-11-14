require('./css/main.scss');

import Vue from 'vue';
import * as constants from './constants.js';
import Board from './views/board.vue';
import Infobox from './views/infobox.vue';

Vue.prototype.$constants = constants;

window.vm = new Vue({
  el: '#main',
  components: {
    board: Board,
    infobox: Infobox
  }
})
