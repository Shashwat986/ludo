import {boardData, colormap, boardPaths, boardPathsCommon, specialCells} from './constants';

let cellMap = [];

class Cell {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.pos = x + ',' + y;
    this.tokens = []

    if (boardPathsCommon[this.pos])
      this.onPath = true;
  }

  static get (x, y) {
    if (typeof x === "string" && typeof y === "undefined") {
      let words = x.split(',');
      x = parseInt(words[0]);
      y = parseInt(words[1]);
    }

    return cellMap[x-1][y-1];
  }

  mapSpecialCell (value) {
    this.isEnd = (value === 100);
    this.isStartingCell = (value === 1);
    this.isStarPoint = (value === 2);
    this.isEndTrack = (value >= 10 && value < 20);
    if (this.isEndTrack) {
      this.distanceFromEnd = value - 10;
    }
  }

  getBgColor () {
    return colormap[boardData[parseInt(this.x) - 1][parseInt(this.y) - 1]];
  }

  getTokens (color) {
    if (typeof color !== "undefined")
      return this.tokens.filter((t) => (t.color === color));
    else
      return this.tokens;
  }

  getToken (color) {
    let t = this.tokens.filter((t) => (t.color === color));
    if (t.length === 0) {
      return null;
    } else {
      return t[0];
    }
  }

  getNextStep (color, steps) {
    if (typeof steps === "undefined")
      steps = 1;

    let pos = this.pos;
    for (let i = 0; i < steps; i++) {
      pos = boardPaths[color][pos];

      if (typeof pos === "undefined")
        return null;
    }
    return pos;
  }
}

for (let i = 0; i < 15; i++) {
  cellMap.push([]);
  for (let j = 0; j < 15; j++) {
    let cell = new Cell(i+1, j+1);
    if (specialCells[cell.pos]) {
      cell.mapSpecialCell(specialCells[cell.pos]);
    }

    cellMap[i].push(cell);
  }
}

export {cellMap, Cell};
export default Cell;
