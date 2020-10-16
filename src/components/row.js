import { compose } from '../helpers/compose.js';
import { LINE_INDEX } from '../helpers/constans.js';
import { validate } from '../services/validation.js';
import { createCell } from "./cell.js";


/**
 * 
 * @param {number[]} line
 * @param {number} lineIndex
 * @param {{input: Function, blur: Function, focus: Function}} callbackFn
 */
export function createRow(line, lineIndex, callbackFn) {
    const tr = document.createElement('tr'),
          composeFn = compose(tr.appendChild.bind(tr), createCell);

    tr.setAttribute(LINE_INDEX, lineIndex);
    line.forEach((column, columnIndex) => composeFn(
        column,
        columnIndex,
        callbackFn
      )
    );

    return tr;
}