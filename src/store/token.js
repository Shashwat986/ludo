import Cell from './cell';
import {colors} from './constants';

class Token {
  constructor (color, cell, player) {
    this.color = color;
    this.player = player;
    this.cell = cell;
    this.home = cell.pos;

    cell.tokens.push(this);
  }

  moveToken (toCell) {
    this.cell.tokens = this.cell.tokens.filter((t) => t !== this);
    toCell.tokens.push(this);
    this.cell = toCell;
  }

  resetToken () {
    let cell = Cell.get(this.home);
    this.moveToken(cell);
  }

  getNextStep (steps) {
    return this.cell.getNextStep(this.color, steps);
  }

  isSticky (round) {
    if (!this.sticky) {
      return false;
    }
    if (this.sticky && (this.stickyAt + colors.length) > round) {
      return true;
    }

    this.sticky = false;
    this.stickyAt = null;

    return false;
  }
}

export default Token;
