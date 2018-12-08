const colors = ['R', 'B', 'G', 'Y'];

const stepsMap = {
  start: "START",
  selectCell: "SELECT_CELL",
  selectOwnToken: "SELECT_OWN_TOKEN",
  selectToken: "SELECT_TOKEN",
  end: "END"
}

const steps = Object.values(stepsMap);

const btnConsts = {
  sticky: "Sticky",
  newStar: "New Star",
  get6: "Get a 6"
}

const btnPowers = {
  [btnConsts.sticky]: 40,
  [btnConsts.newStar]: 20,
  [btnConsts.get6]: 30
}

const btnTypes = Object.values(btnConsts);

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
  "10,8": "9,8"
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

const colorName = {
  'R': 'Red',
  'B': 'Blue',
  'G': 'Green',
  'Y': 'Yellow'
}

const baseTokens = {
  R: ["3,2", "5,3", "4,5", "2,4"],
  B: ["3,11", "2,13", "5,12", "4,14"],
  G: ["11,13", "13,14", "12,11", "14,12"],
  Y: ["13,5", "14,3", "11,4", "12,2"]
}

const specialCells = {
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

export {colors, stepsMap, steps, btnConsts, btnPowers, btnTypes, boardData, colormap, boardPaths, boardPathsCommon, colorName, baseTokens, specialCells};
