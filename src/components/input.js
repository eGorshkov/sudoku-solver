import { MAX_SUDOKU_VALUE, MIN_SUDOKU_VALUE } from "../helpers/constans.js";

/**
 * 
 * @param {number} value 
 * @param {{input: Function, blur: Function, focus: Function}} callbackFn
 */
export function createInput(value, callbackFn) {
    const input = document.createElement('input');
           input.type = 'number';
           input.value = value || '';
           input.disabled = !!value;
           input.max = MAX_SUDOKU_VALUE;
           input.min = MIN_SUDOKU_VALUE;
   
           input.addEventListener('input', callbackFn.input);
           input.addEventListener('focus', callbackFn.focus);
           input.addEventListener('blur', callbackFn.blur);
           return input;
       }