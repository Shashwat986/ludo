import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {colors, steps, stepsMap} from './constants';
import {boardData, colormap, boardPaths, colorName, baseTokens, btnPowers, btnConsts} from './constants';
import Cell from './cell';
import Player from './player';
import Token from './token';

import {save, restore} from './save';


const store = new Vuex.Store({
  state: {
    colors: colors,
    round: 1,
    move: colors[0],
    steps: steps,
    step: steps[0],
    activeBtn: null,
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
        let idx = colors.indexOf(state.move)
        if (idx !== -1) {
          colors = [state.move].concat(colors.splice(idx, 1));
        }
        return colors;
      }
    },
    canTokenMove (state, getters) {
      return function (from, color = null) {
        if (color == null) {
          color = state.move;
        }

        let rms = {
          rejectStatus: false
        };

        let cell = Cell.get(from);
        let token = getters.getToken(color, from);

        if (state.dieRoll === 6) {  //FIXME
          rms.repeatMove = true;
        }

        if (state.activeBtn === btnConsts.get6) {
          rms.repeatMove = false;
          rms.unsetActiveBtn = true;
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

        if (token.isSticky(state.round)) {
          rms.dieRoll = Math.ceil(state.dieRoll / 2);
        }

        if (cell.isEndTrack) {
          if (state.dieRoll > cell.distanceFromEnd) {
            rms.rejectStatus = true;
          }
        }

        return rms;
      }
    },
    canKillTokens (state) {
      return function(pos) {
        return !Cell.get(pos).isStarPoint;
      }
    },
    isStep (state, getters) {
      return function (ref, val) {
        let color = state.move;

        if (state.disabled) {
          return false;
        }

        if (ref === "dice") {
          return val === color &&
                 state.step === stepsMap.start;
        }

        if (ref === "cell") {
          let cell = Cell.get(val);

          let retVal = cell.getToken(color) &&
                       (!getters.canTokenMove(val).rejectStatus) &&
                       state.step === stepsMap.selectOwnToken;

          retVal = retVal || (cell.onPath && state.step === stepsMap.selectCell);

          retVal = retVal || (cell.getTokens().length && state.step === stepsMap.selectToken);

          return retVal;
        }

        if (ref === "pass") {
          return val === color &&
                 state.step !== stepsMap.start;
        }

        if (ref === "btn") {
          let player = Player.get(val.color);
          if (btnPowers[val.btn] > player.energy) {
            return false;
          }
          return val.color === color &&
                 state.step === stepsMap.start;
        }

        return true;
      }
    }
  },
  mutations: {
    setRepeatMove (state) {
      state.repeatMove = true;
    },
    unsetRepeatMove (state) {
      state.repeatMove = false;
    },
    setActiveBtn (state, btnVal) {
      state.activeBtn = btnVal;
    },
    unsetActiveBtn (state) {
      state.activeBtn = null;
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

      let len = state.colors.length;
      let idx = state.colors.indexOf(state.move);

      if (idx === -1) {
        throw "WHAT";
      } else {
        state.move = state.colors[(idx + 1) % len];
      }

      state.round += 1;
    },
    nextStep (state, ref) {
      if (typeof ref !== "undefined" && state.steps.indexOf(ref) !== -1) {
        state.step = ref;
        return;
      }

      if (state.step === stepsMap.start) {
        state.step = stepsMap.selectOwnToken;
      } else {
        state.step = stepsMap.start;
      }
    },
    roll (state, val) {
      if (val == null)
        state.dieRoll = window.roll || Math.floor(Math.random() * 6 + 1); // FIXME
      else
        state.dieRoll = val;
    }
  },
  actions: {
    completeStep ({commit, state, dispatch}, ref) {
      dispatch('checkForWin');

      if (state.repeatMove) {
        // FIXME: This fires the moment state.repeatMove is set at any completeStep.
        //        Make it fire at the end of the step?
        commit('nextStep', stepsMap.start);
        commit('unsetRepeatMove');

        return;
      }

      if (state.step === stepsMap.end || ref === stepsMap.end) {
        commit('nextPlayer');
        commit('nextStep', stepsMap.start);

        return;
      }

      commit('nextStep', ref);
    },
    checkForWin ({state, commit}) {
      state.colors.forEach(function (color) {
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
      dispatch('completeStep', stepsMap.selectOwnToken);

      return Promise.resolve(state.dieRoll);
    },
    movePass({commit, state, getters, dispatch}) {
      let color = state.move;

      if (getters.isStep('pass', color)) {
        if (state.dieRoll > 3) {
          let value = 0;

          value = (state.dieRoll - 3) * 10;
          commit('increaseEnergy', {color, value});
        }

        dispatch('completeStep', stepsMap.end);
      }
    },
    moveBtn({commit, state, getters, dispatch}, {btn}) {
      let color = state.move;
      let player = Player.get(color);

      if (!getters.isStep('btn', {color, btn}))
        return;

      commit('decreaseEnergy', {color, value: btnPowers[btn]});

      commit('setActiveBtn', btn);
      switch (btn) {
        case btnConsts.newStar:
          dispatch('completeStep', stepsMap.selectCell);
          break;
        case btnConsts.sticky:
          dispatch('completeStep', stepsMap.selectToken);
          break;
        case btnConsts.get6:
          commit('roll', 6);
          dispatch('completeStep', stepsMap.selectOwnToken);
      }

    },
    moveCell ({commit, state, dispatch, getters}, params) {
      if (state.step === stepsMap.selectOwnToken) {
        return dispatch('moveToken', params);
      }

      if (state.step === stepsMap.selectCell) {
        let pos = params.from;

        let cell = Cell.get(pos);
        switch (state.activeBtn) {
          case btnConsts.newStar:
            cell.isStarPoint = true;
            commit('unsetActiveBtn');
            break;
        }

        dispatch('completeStep', stepsMap.end);
      }

      if (state.step === stepsMap.selectToken) {
        let pos = params.from;

        let cell = Cell.get(pos);
        switch (state.activeBtn) {
          case btnConsts.sticky:
            getters.getAllTokens(pos).forEach(function (token) {
              token.sticky = true;
              token.stickyAt = state.round;
            });
            commit('unsetActiveBtn');
            break;
        }

        dispatch('completeStep', stepsMap.end);
      }

      return true;
    },
    moveToken ({commit, state, getters, dispatch}, {from}) {
      /* Move a particular token `dieRoll` times
         return value: Was the move valid?
      */
      let color = state.move;

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
      if (rejectMoveStatus.unsetActiveBtn) {
        commit('unsetActiveBtn');
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

      if (Cell.get(to).isEnd) {
        commit('setRepeatMove');
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
          if (getters.canKillTokens(to)) {
            /* Can kill tokens */

            let tokensToKill = getters.getAllTokens(to);

            tokensToKill.forEach(function (token) {
              if (color === token.color)
                return;

              commit('resetToken', {color: token.color, from: token.cell.pos});
              commit('setRepeatMove');
            });
          }

          commit('unsetDisabled');
          dispatch('completeStep', stepsMap.end);
        }
      }

      f();
      return true;
    },
    saveState ({state}) {
      window.saveFile = save(state);
    },
    restoreState () {

      let newState = restore(window.saveFile);
      this.replaceState(newState);
    }
  }
});

export default store;
