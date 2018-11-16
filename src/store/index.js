import Vue from 'vue';
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

const colormap = {
  'W': 'light',
  'R': 'danger',
  'Y': 'warning',
  'G': 'success',
  'B': 'link',
  'X': 'black'
}

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

const store = new Vuex.Store({
  state: {
    tokens: {...tokens},
    colors: ['R', 'B', 'G', 'Y'],
    move: 'R'
  },
  getters: {
    getBgColor (state) {
      return function (x, y) {
        return colormap[boardData[parseInt(x) - 1][parseInt(y) - 1]];
      };
    },
    getTokens (state) {
      return function (color, pos) {
        if (state.tokens[color + ',' + pos] == null)
          return 0

        return state.tokens[color + ',' + pos]
      };
    },
    getAllTokens (state) {
      return function (pos) {
        let allTokens = [];
        state.colors.forEach(function (color) {
          if (state.tokens[color + ',' + pos] > 0) {
            allTokens.push(color);
          }
        });

        moveIndex = allTokens.indexOf(state.move);

        if (moveIndex === -1)
          return allTokens;

        allTokens.splice(moveIndex, 1);
        return [state.move] + allTokens;
      }
    }
  },
  mutations: {
    setTokens (state, {color, pos, value}) {
      Vue.set(state.tokens, color + ',' + pos, value)
    }
  },
  actions: {
    move ({commit, state, getters}, {color, from, count}) {

      if (state.colors.indexOf(color) === -1) {
        return;
      }

      let curr = from;
      let i = 0;

      function f() {
        if (i < count) {
          i++;
          if (typeof boardPaths[color][curr] !== "undefined") {
            from = curr;
            curr = boardPaths[color][curr];

            commit('setTokens', {
              color,
              pos: curr,
              value: getters.getTokens(color, curr) + 1
            })
            commit('setTokens', {
              color,
              pos: from,
              value: getters.getTokens(color, from) - 1
            })

            setTimeout(f, 150)
          }
        }
      }

      f();
    }
  }
});

export default store;
