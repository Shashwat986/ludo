import {colors, baseTokens} from './constants';
import Cell from './cell';
import Token from './token';

let colorPlayer = {}

class Player {
  constructor (color) {
    this.color = color;
    this.tokens = [];
    this.energy = 0;
    colorPlayer[color] = this;

    baseTokens[color].forEach((pos) => {
      let cell = Cell.get(pos)

      let tok = new Token(color, cell, this);
      this.tokens.push(tok);
    });
  }

  static get (color) {
    return colorPlayer[color];
  }
}

colors.forEach(function (color) {
  new Player(color);
});


export {colorPlayer, Player};
export default Player;
