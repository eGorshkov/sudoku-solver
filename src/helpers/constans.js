/**
 * Значения судоку
 */
export const SUDOKU_VALUES = Array.from(Array(9)).map((x, i) => i + 1);
/**
 * Делитель судоку на секции
 * @type {number}
 * @readonly
 */
export const SUDOKU_SECTION_DIVIDER = 3;
export const LINE_INDEX = 'line-index';
export const COLUMN_INDEX = 'column-index';
export const MAX_SUDOKU_VALUE = 9;
export const MIN_SUDOKU_VALUE = 1;
