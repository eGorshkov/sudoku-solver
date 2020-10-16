import { MAX_SUDOKU_VALUE, MIN_SUDOKU_VALUE } from '../helpers/constans.js';

/**
 *
 * @param {number} value
 * @param {IInputCallback} callbackFn
 */
export function createInput(value, callbackFn) {
  const input = document.createElement('input');
  input.type = 'number';
  input.value = value || '';
  input.disabled = !!value;
  input.max = MAX_SUDOKU_VALUE;
  input.min = MIN_SUDOKU_VALUE;

  if (callbackFn) {
    Object.keys(callbackFn).forEach(type => {
      Array.isArray(callbackFn[type])
        ? callbackFn[type].forEach(cb => input.addEventListener(type, cb))
        : input.addEventListener(type, callbackFn[type])
    })
  }

  return input;
}
