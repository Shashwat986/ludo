require('./css/main.scss');

import Vue from 'vue';
import store from './store';

import Board from './views/board.vue';
import Infobox from './views/infobox.vue';
import Header from './views/header.vue';

window.vm = new Vue({
  el: '#main',
  store,
  components: {
    board: Board,
    infobox: Infobox,
    "v-header": Header
  }
})
