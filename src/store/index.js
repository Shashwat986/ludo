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

const colorName = {
  'R': 'Red',
  'B': 'Blue',
  'G': 'Green',
  'Y': 'Yellow'
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

const baseTokens = {
  R: ["3,2", "5,3", "4,5", "2,4"],
  B: ["3,11", "2,13", "5,12", "4,14"],
  G: ["11,13", "13,14", "12,11", "14,12"],
  Y: ["13,5", "14,3", "11,4", "12,2"]
}

let specialCells = {
  "8,7": 100,
  "7,8": 100,
  "8,9": 100,
  "9,8": 100,

  /* Starting Cells */
  "3,2": 1,
  "5,3": 1,
  "4,5": 1,
  "2,4": 1,

  "3,11": 1,
  "2,13": 1,
  "5,12": 1,
  "4,14": 1,

  "11,13": 1,
  "13,14": 1,
  "12,11": 1,
  "14,12": 1,

  "13,5": 1,
  "14,3": 1,
  "11,4": 1,
  "12,2": 1,

  /* Star Points */
  "7,2": 2,
  "3,7": 2,
  "2,9": 2,
  "7,13": 2,
  "9,14": 2,
  "13,9": 2,
  "14,7": 2,
  "9,3": 2,

  /* End track */
  "8,2": 15,
  "8,3": 14,
  "8,4": 13,
  "8,5": 12,
  "8,6": 11,

  "8,14": 15,
  "8,13": 14,
  "8,12": 13,
  "8,11": 12,
  "8,10": 11,

  "2,8": 15,
  "3,8": 14,
  "4,8": 13,
  "5,8": 12,
  "6,8": 11,

  "14,8": 15,
  "13,8": 14,
  "12,8": 13,
  "11,8": 12,
  "10,8": 11,
}

let powers = {
  removeStar: 0,
  immune: 0,
  accelerate: 0
}

let playerPowers = {
  R: {...powers},
  B: {...powers},
  G: {...powers},
  Y: {...powers}
}

const store = new Vuex.Store({
  state: {
    tokens: {...tokens},
    specialCells: {...specialCells},
    colors: ['R', 'B', 'G', 'Y'],
    playerPowers: {...playerPowers},
    colormap: colormap,
    colorName: colorName,
    move: 'R',
    step: 0,
    repeatMove: false,
    dieRoll: null,
    disabled: false
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

        let moveIndex = allTokens.indexOf(state.move);

        if (moveIndex === -1) {
          return allTokens;
        }

        allTokens.splice(moveIndex, 1);
        return [state.move].concat(allTokens);
      }
    },
    rejectMove (state) {
      return function (pos) {
        let rms = {
          rejectStatus: false
        };

        if (state.dieRoll === 6) {
          rms.repeatMove = true;
        }

        if (state.specialCells[pos] === 100) {
          rms.rejectStatus = true;
        } else if (state.specialCells[pos] === 1) {
          if (state.dieRoll === 6) {
            rms.dieRoll = 1;
          } else {
            rms.rejectStatus = true;
          }
        } else if (state.specialCells[pos] === 2) {
          rms.killTokens = false;
        } else if (10 <= state.specialCells[pos] && state.specialCells[pos] < 20) {
          if (state.dieRoll > state.specialCells[pos] - 10) {
            rms.rejectStatus = true;
          }
        }

        return rms;
      }
    }
  },
  mutations: {
    setRepeatMove (state) {
      state.repeatMove = true;
    },
    setDisabled (state) {
      state.disabled = true;
    },
    unsetDisabled (state) {
      state.disabled = false;
    },
    resetToken (state, color) {
      /* Send a token of color `color` back home */
      let pos;
      let i;
      for (i = 0; i < baseTokens[color].length; i++) {
        pos = baseTokens[color][i];
        if (state.tokens[color + ',' + pos] === 0) {
          state.tokens[color + ',' + pos] = 1;
          return;
        }
      }

      if (i === baseTokens[color].length) {
        state.tokens[color + ',' + baseTokens[color][0]] += 1;
      }
    },
    setTokens (state, {color, pos, value}) {
      /* Put a particular token at a particular spot
         color: R, G, B, Y
         pos: x,y
         value: Number of `color` tokens at `pos`
      */

      Vue.set(state.tokens, color + ',' + pos, value)
    },
    nextPlayer (state) {
      /* Change active player */

      if (state.repeatMove) {
        state.repeatMove = false;
        return;
      }

      let len = state.colors.length;
      let idx = state.colors.indexOf(state.move);

      if (idx === -1) {
        throw "WHAT";
      } else {
        state.move = state.colors[(idx + 1) % len];
      }
    },
    nextStep (state) {
      state.step = 1 - state.step;
    },
    roll (state) {
      state.dieRoll = window.roll || Math.floor(Math.random() * 6 + 1); // FIXME
    }
  },
  actions: {
    completeStep ({commit, state}) {
      if (state.step === 0) {
        commit('nextStep');
      } else {
        commit('nextPlayer');
        commit('nextStep');
      }
    },
    move ({commit, state, getters}, {color, from}) {
      /* Move a particular token `dieRoll` times
         return value: Was the move valid?
      */

      let dieRoll = state.dieRoll;

      let rejectMoveStatus = getters.rejectMove(from);

      if (rejectMoveStatus.rejectStatus === true) {
        return false;
      } else {
        if (rejectMoveStatus.dieRoll) {
          dieRoll = rejectMoveStatus.dieRoll;
        }
        if (rejectMoveStatus.repeatMove) {
          commit('setRepeatMove');
        }
      }

      if (state.colors.indexOf(color) === -1) {
        return false;
      }

      let to = from;
      let i = 0;
      for (i = 0; i < dieRoll; i++) {
        if (typeof boardPaths[color][to] !== "undefined") {
          to = boardPaths[color][to];
        } else {
          /* Off Path */
          return false;
        }
      }

      let curr = from;
      i = 0;

      function f() {
        if (i < dieRoll) {
          i++;
          if (typeof boardPaths[color][curr] !== "undefined") {
            from = curr;
            curr = boardPaths[color][curr];

            commit('setTokens', {
              color,
              pos: curr,
              value: getters.getTokens(color, curr) + 1
            });
            commit('setTokens', {
              color,
              pos: from,
              value: getters.getTokens(color, from) - 1
            });

            setTimeout(f, 150);
          }
        } else {
          commit('unsetDisabled');
          if (!(rejectMoveStatus.killTokens === false)) {
            /* Can kill tokens */

            let tokensToKill = getters.getAllTokens(to);

            if (typeof tokensToKill !== "string")
            tokensToKill.forEach(function (tokenColor) {
              if (color === tokenColor)
                return;

              for (let j = 0; j < getters.getTokens(tokenColor, to); j++) {
                commit('resetToken', tokenColor);
              }

              commit('setTokens', {
                color: tokenColor,
                pos: to,
                value: 0
              });
            });
          }

          commit('unsetDisabled');
        }
      }

      commit('setDisabled');
      f();
      return true;
    }
  }
});

export default store;
