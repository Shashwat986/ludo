import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {colors, steps, stepsMap} from './constants';
import {boardData, colormap, boardPaths, colorName, baseTokens, btnPowers} from './constants';
import Cell from './cell';
import Player from './player';
import Token from './token';


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
    sync: 0,
    tokens: {...tokens},
    colors: colors,
    move: colors[0],
    steps: steps,
    step: steps[0],
    colormap: colormap,
    colorName: colorName,
    repeatMove: false,
    dieRoll: null,
    disabled: false
  },
  getters: {
    getBgColor (state) {
      return function (x, y) {
        return Cell.get(x, y).getBgColor();
      };
    },
    getEnergy (state) {
      return function (color) {
        return Player.get(color).energy;
      }
    },
    getToken (state) {
      return function (color, pos) {
        return Cell.get(pos).getToken(color);
      };
    },
    getTokens (state) {
      return function (color, pos) {
        return Cell.get(pos).getTokens(color);
      };
    },
    getAllTokens (state) {
      return function (pos) {
        return Cell.get(pos).getTokens();
      }
    },
    getAllTokenColors (state) {
      return function (pos) {
        let colors = Cell.get(pos).getTokens().map((t) => t.color);
        let idx = colors.indexOf(this.move)
        if (idx !== -1) {
          colors = [this.move].concat(colors.splice(idx, 1));
        }
        return colors;
      }
    },
    canTokenMove (state) {
      return function (from) {
        let rms = {
          rejectStatus: false
        };

        let cell = Cell.get(from);

        if (state.dieRoll === 6) {  //FIXME
          rms.repeatMove = true;
        }

        if (cell.isEnd) {
          rms.rejectStatus = true;
        }

        if (cell.isStartingCell) {
          if (state.dieRoll === 6) {
            rms.dieRoll = 1;
          } else {
            rms.rejectStatus = true;
          }
        }

        if (cell.isStarPoint) {
          rms.killTokens = false;
        }

        if (cell.isEndTrack) {
          if (state.dieRoll > cell.distanceFromEnd) {
            rms.rejectStatus = true;
          }
        }

        return rms;
      }
    },
    isStep (state, getters) {
      return function (ref, val) {
        if (state.disabled) {
          return false;
        }

        if (ref === "dice") {
          return val === state.move &&
                 state.step === stepsMap.start;
        }

        if (ref === "cell") {
          let cell = Cell.get(val);

          return cell.getToken(state.move) &&
                 (!getters.canTokenMove(val).rejectStatus) &&
                 state.step === stepsMap.selectOwnToken;
        }

        if (ref === "pass") {
          return val === state.move &&
                 state.step !== stepsMap.start;
        }

        if (ref.startsWith("btn")) {
          let player = Player.get(val);
          if (btnPowers[ref.substring(3)] > player.energy) {
            return false;
          }
          return val === state.move &&
                 state.step !== stepsMap.start;
        }

        return true;
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
    increaseEnergy (state, {color, value}) {
      let player = Player.get(color);
      player.energy += value;
      if (player.energy > 100)
        player.energy = 100;
    },
    decreaseEnergy (state, {color, value}) {
      let player = Player.get(color);
      player.energy -= value;
      if (player.energy < 0) {
        alert("Energy negative!");
        player.energy = 0;
      }
    },
    resetToken (state, {color, from}) {
      /* Send a token of color `color` back home */
      Cell.get(from).getToken(color).resetToken();
    },
    moveToken (state, {color, from, to, token}) {
      /* Put a particular token at a particular spot
         color: R, G, B, Y
         pos: x,y
         value: Number of `color` tokens at `pos`
      */
      if (token == null) {
        token = Cell.get(from).getToken(color);
      }

      token.moveToken(Cell.get(to));
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
    nextStep (state, ref) {
      if (typeof ref !== "undefined") {
        state.step = ref;
        return;
      }

      if (state.step === stepsMap.start) {
        state.step = stepsMap.selectOwnToken;
      } else {
        state.step = stepsMap.start;
      }
    },
    roll (state) {
      state.dieRoll = window.roll || Math.floor(Math.random() * 6 + 1); // FIXME
    }
  },
  actions: {
    completeStep ({commit, state, dispatch}, ref) {
      dispatch('checkForWin');
      if (state.step === stepsMap.start) {
        commit('nextStep', ref);
      } else {
        commit('nextPlayer');
        commit('nextStep', stepsMap.start);
      }
    },
    checkForWin () {
      colors.forEach(function (color) {
        let colorWins = true;
        let player = Player.get(color);
        player.tokens.forEach(function (token) {
          if (!token.cell.isEnd)
            colorWins = false;
        });

        if (colorWins) {
          alert(color + ' WINS!');
          commit('setDisabled');
        }
      });
    },
    rollDie ({commit, state, getters, dispatch}) {
      if (!getters.isStep("dice", state.move))
        return Promise.reject(null);

      commit('roll');
      dispatch('completeStep');

      return Promise.resolve(state.dieRoll);
    },
    movePass({commit, state, getters, dispatch}, color) {
      if (getters.isStep('pass', color)) {
        if (state.dieRoll > 3) {
          let value = 0;

          value = (state.dieRoll - 3) * 10;
          commit('increaseEnergy', {color, value});
        }

        dispatch('completeStep');
      }
    },
    moveBtn({commit, state, getters}, {color, btn}) {
      let player = Player.get(color);

      if (getters.isStep('btn' + btn, color)) {
        commit('decreaseEnergy', {color, value: btnPowers[btn]});
        dispatch('completeStep');
      }
    },
    moveToken ({commit, state, getters}, {color, from}) {
      /* Move a particular token `dieRoll` times
         return value: Was the move valid?
      */

      let dieRoll = state.dieRoll;

      let rejectMoveStatus = getters.canTokenMove(from);

      if (rejectMoveStatus.rejectStatus === true) {
        return false;
      }

      if (rejectMoveStatus.dieRoll) {
        dieRoll = rejectMoveStatus.dieRoll;
      }
      if (rejectMoveStatus.repeatMove) {
        commit('setRepeatMove');
      }

      let fromCell = Cell.get(from);
      let token = fromCell.getToken(color);

      if (!token) {
        return false;
      }

      let to = token.getNextStep(dieRoll);

      if (to === null) {
        return false;
      }

      let curr = from;
      let i = 0;
      function f() {
        // TODO: Move to Class
        if (i < dieRoll) {
          commit('setDisabled');
          i++;

          from = curr;
          curr = token.getNextStep();

          commit('moveToken', {token, to: curr});

          setTimeout(f, 150);
        } else {
          commit('unsetDisabled');
          if (!(rejectMoveStatus.killTokens === false)) {
            /* Can kill tokens */

            let tokensToKill = getters.getAllTokens(to);

            tokensToKill.forEach(function (token) {
              if (color === token.color)
                return;

              commit('resetToken', {color: token.color, from: token.cell.pos});
            });
          }

          commit('unsetDisabled');
        }
      }

      f();
      return true;
    }
  }
});

export default store;
