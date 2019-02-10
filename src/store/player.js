import {colors, baseTokens} from './constants';
import Cell from './cell';
import Token from './token';

import saveObject from './save_object';

class Player {
  constructor (color) {
    this.color = color;
    this.tokens = [];
    this.energy = 0;
    saveObject.colorPlayer[color] = this;

    baseTokens[color].forEach((pos) => {
      let cell = Cell.get(pos)

      let tok = new Token(color, cell, this);
      this.tokens.push(tok);
    });
  }

  static get (color) {
    return saveObject.colorPlayer[color];
  }
}

colors.forEach(function (color) {
  new Player(color);
});


export default Player;
