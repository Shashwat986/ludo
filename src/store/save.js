import Cell from './cell';
import Token from './token';
import Player from './player';

import saveObject from './save_object';

let classObjs = {
  'Player': Player.prototype,
  'Cell': Cell.prototype,
  'Token': Token.prototype
}

import flatted from 'flatted';

function replacer (key, value) {
  if (value == null)
    return value;

  let prototype = Object.getPrototypeOf(value);
  if (Object.values(classObjs).includes(prototype)) {
    return {...value, '__prototype__': prototype.constructor.name};
  }
  return value;
}

function reviver (key, value) {
  if (
       value != null &&
       value.__prototype__ != null &&
       Object.keys(classObjs).includes(value.__prototype__)
     ) {
    value.__proto__ = classObjs[value.__prototype__];
    delete value.__prototype__;
    return value;
  }
  return value;
}

function save (state) {
  return flatted.stringify({
    cellMap: saveObject.cellMap,
    colorPlayer: saveObject.colorPlayer,
    state: state
  }, replacer);
}

function restore (json) {
  let saveObj = flatted.parse(json, reviver);
  saveObject.cellMap = saveObj.cellMap;
  saveObject.colorPlayer = saveObj.colorPlayer;

  return saveObj.state;
}



export {save, restore, saveObject, flatted};
