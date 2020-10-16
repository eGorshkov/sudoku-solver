import { COLUMN_INDEX } from '../helpers/constans.js';
import { createInput } from './input.js';

/**
 *
 * @param {number} columnValue
 * @param {number} columnIndex
 * @param {IInputCallback} callbackFn
 */
export function createCell(columnValue, columnIndex, callbackFn) {
  const td = document.createElement('td');
  td.setAttribute(COLUMN_INDEX, columnIndex.toString());
  td.appendChild(createInput(columnValue, callbackFn));
  return td;
}
