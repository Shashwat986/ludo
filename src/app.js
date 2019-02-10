require('./css/main.scss');
import './store/save_object';

import Vue from 'vue';
import store from './store';

import Board from './views/board.vue';
import Infobox from './views/infobox.vue';
import Header from './views/header.vue';

import Cell from './store/cell';
import Player from './store/player';
import * as constants from './store/constants';
import * as save from './store/save';

window.cc = constants;
window.save = save;

window.Cell = Cell;
window.Player = Player;

window.vm = new Vue({
  el: '#main',
  store,
  components: {
    board: Board,
    infobox: Infobox,
    "v-header": Header
  }
})
