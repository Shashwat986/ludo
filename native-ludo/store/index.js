import Vue from 'vue-native-core';
import Vuex from 'vuex';

Vue.use(Vuex);

const boardData = [
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

let boardPathsCommon = {
  "2,9": "3,9",
  "3,9": "4,9",
  "4,9": "5,9",
  "5,9": "6,9",
  "6,9": "7,10",
  "7,10": "7,11",
  "7,11": "7,12",
  "7,12": "7,13",
  "7,13": "7,14",
  "7,14": "7,15",
  "7,15": "8,15",
  "8,15": "9,15",
  "9,15": "9,14",
  "9,14": "9,13",
  "9,13": "9,12",
  "9,12": "9,11",
  "9,11": "9,10",
  "9,10": "10,9",
  "10,9": "11,9",
  "11,9": "12,9",
  "12,9": "13,9",
  "13,9": "14,9",
  "14,9": "15,9",
  "15,9": "15,8",
  "15,8": "15,7",
  "15,7": "14,7",
  "14,7": "13,7",
  "13,7": "12,7",
  "12,7": "11,7",
  "11,7": "10,7",
  "10,7": "9,6",
  "9,6": "9,5",
  "9,5": "9,4",
  "9,4": "9,3",
  "9,3": "9,2",
  "9,2": "9,1",
  "9,1": "8,1",
  "8,1": "7,1",
  "7,1": "7,2",
  "7,2": "7,3",
  "7,3": "7,4",
  "7,4": "7,5",
  "7,5": "7,6",
  "7,6": "6,7",
  "6,7": "5,7",
  "5,7": "4,7",
  "4,7": "3,7",
  "3,7": "2,7",
  "2,7": "1,7",
  "1,7": "1,8",
  "1,8": "1,9",
  "1,9": "2,9",
  "2,8": "3,8",
  "3,8": "4,8",
  "4,8": "5,8",
  "5,8": "6,8",
  "6,8": "7,8",
  "8,2": "8,3",
  "8,3": "8,4",
  "8,4": "8,5",
  "8,5": "8,6",
  "8,6": "8,7",
  "8,14": "8,13",
  "8,13": "8,12",
  "8,12": "8,11",
  "8,11": "8,10",
  "8,10": "8,9",
  "14,8": "13,8",
  "13,8": "12,8",
  "12,8": "11,8",
  "11,8": "10,8",
  "10,8": "9,8",
  "9,8": "WIN",
  "8,7": "WIN",
  "8,9": "WIN",
  "7,8": "WIN"
}

let boardPaths = {
  R: {
    ...boardPathsCommon,
    ...{"3,2":"7,2","5,3":"7,2","4,5":"7,2","2,4":"7,2","8,1":"8,2"}
  },
  B: {
    ...boardPathsCommon,
    ...{"3,11":"2,9","2,13":"2,9","5,12":"2,9","4,14":"2,9","1,8":"2,8"}
  },
  G: {
    ...boardPathsCommon,
    ...{"11,13":"9,14","13,14":"9,14","12,11":"9,14","14,12":"9,14","8,15":"8,14"}
  },
  Y: {
    ...boardPathsCommon,
    ...{"13,5":"14,7","14,3":"14,7","11,4":"14,7","12,2":"14,7","15,8":"14,8"}
  }
}

let tokens = {
  "R,3,2": 1,
  "R,5,3": 1,
  "R,4,5": 1,
  "R,2,4": 1,

  "B,3,11": 1,
  "B,2,13": 1,
  "B,5,12": 1,
  "B,4,14": 1,

  "G,11,13": 1,
  "G,13,14": 1,
  "G,12,11": 1,
  "G,14,12": 1,

  "Y,13,5": 1,
  "Y,14,3": 1,
  "Y,11,4": 1,
  "Y,12,2": 1
}

t = {
  R: ["3,2", "5,3", "4,5", "2,4"],
  B: ["3,11", "2,13", "5,12", "4,14"],
  G: ["11,13", "13,14", "12,11", "14,12"],
  Y: ["13,5", "14,3", "11,4", "12,2"]
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
    tokens: tokens,
    colors: ['R', 'B', 'G', 'Y'],
    colormap: colormap
  },
  getters: {
    getBgColor (state) {
      return function (x, y) {
        return colormap[boardData[x-1][y-1]];
      }
    }
  },
  mutations: {
    move (state, {color, from, count}) {
      let curr = from;
      for (let i = 0; i < count; i++) {
        if (typeof boardPaths[color][curr] !== "undefined") {
          curr = boardPaths[color][curr];
        } else {
          return;
        }
      }
      if (state.tokens[color + ',' + curr] == null)
        state.tokens[color + ',' + curr] = 0;
      state.tokens[color + ',' + curr] += 1;
      state.tokens[color + ',' + from] -= 1;
    }
  }
});

export default store;
