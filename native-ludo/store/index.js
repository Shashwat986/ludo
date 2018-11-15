import Vue from 'vue-native-core';
import Vuex from 'vuex';

Vue.use(Vuex);

let boardData = [
  'RRRRRRWWWBBBBBB'.split(''),
  'RRRWRRWBBBBBWBB'.split(''),
  'RWRRRRWBWBWBBBB'.split(''),
  'RRRRWRWBWBBBBWB'.split(''),
  'RRWRRRWBWBBWBBB'.split(''),
  'RRRRRRWBWBBBBBB'.split(''),
  'WRWWWWXBXWWWWWW'.split(''),
  'WRRRRRRXGGGGGGW'.split(''),
  'WWWWWWXYXWWWWGW'.split(''),
  'YYYYYYWYWGGGGGG'.split(''),
  'YYYWYYWYWGGGWGG'.split(''),
  'YWYYYYWYWGWGGGG'.split(''),
  'YYYYWYWYWGGGGWG'.split(''),
  'YYWYYYYYWGGWGGG'.split(''),
  'YYYYYYWWWGGGGGG'.split('')
];

let boardState = [
  '000000XXX000000'.split(''),
  '000X00XXX000X00'.split(''),
  '0X0000XXX0X0000'.split(''),
  '0000X0XXX0000X0'.split(''),
  '00X000XXX00X000'.split(''),
  '000000XXX000000'.split(''),
  'XXXXXX0X0XXXXXX'.split(''),
  'XXXXXXX0XXXXXXX'.split(''),
  'XXXXXX0X0XXXXXX'.split(''),
  '000000XXX000000'.split(''),
  '000X00XXX000X00'.split(''),
  '0X0000XXX0X0000'.split(''),
  '0000X0XXX0000X0'.split(''),
  '00X000XXX00X000'.split(''),
  '000000XXX000000'.split('')
]

let tokens = {
  R: [
    {
      x: 2,
      y: 4
    },
    {
      x: 3,
      y: 2
    },
    {
      x: 5,
      y: 3
    },
    {
      x: 4,
      y: 5
    }
  ]
}

let colormap = {
  'W': 'white',
  'R': 'red',
  'Y': 'yellow',
  'G': 'green',
  'B': 'blue',
  'X': 'black'
}

const store = new Vuex.Store({
  state: {
    boardData: boardData,
    colormap: colormap,
    boardState: boardState
  },
  getters: {
    getBgColor (state) {
      return function (x, y) {
        return state.colormap[state.boardData[x-1][y-1]];
      }
    }
  },
  mutations: {
    move (state, {from, to}) {
      /*
      if (state.boardState[to.x][to.y] != '0') {
        state.boardState[to.x][to.y] = state.boardState[from.x][from.y];
        state.boardState[from.x][from.y] = 'X';
      }
      */
    }
  }
});

export default store;
