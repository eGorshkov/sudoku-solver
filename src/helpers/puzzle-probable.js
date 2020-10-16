import { getColumn } from './puzzle-column.js';
import { getPuzzleSection } from './puzzle-section.js';
import { SUDOKU_VALUES } from './constans.js';

export function getProbableValues(puzzle, lineIndex, columnIndex) {
  return SUDOKU_VALUES.filter(probable(getAllValues(puzzle, lineIndex, columnIndex)));
}

/**
 *
 * @param {number[][]} puzzle
 * @param {number} lineIndex
 * @param {number} columnIndex
 */
export function getAllValues(puzzle, lineIndex, columnIndex) {
  return [
    ...puzzle[lineIndex],
    ...getColumn(puzzle, columnIndex),
    ...getPuzzleSection(puzzle, lineIndex, columnIndex)
  ].filter(Boolean);
}

/**
 * Фильтрация невыбранных значений
 * @param {number[]} allValues
 */
function probable(allValues) {
  return value => !allValues.includes(value);
}
