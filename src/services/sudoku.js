import * as helper from '../helpers/index.js';
import { createCell } from '../components/cell.js';
import { validate } from './validation.js';
/**
 * 
 * @param {HTMLTableSectionElement} tableElement 
 * @param {number[][]} puzzle
 */
export function create(tableElement, puzzle) {
  puzzle.forEach((line, lineIndex) => {
    const tr = document.createElement('tr'),
          composeFn = helper.compose(tr.appendChild.bind(tr), createCell);

    tr.setAttribute(helper.constans.LINE_INDEX, lineIndex);
    line.forEach((column, columnIndex) => composeFn(
      column,
      columnIndex,
      validate(puzzle, tableElement, (value) => puzzle[lineIndex][columnIndex] = value)
      )
    );
    tableElement.appendChild(tr);
  });
}

export function solve(puzzle) {
  for (const lineIndex in puzzle) {
    for (const columnIndex in puzzle[lineIndex]) {
      puzzle[lineIndex][columnIndex] =
        puzzle[lineIndex][columnIndex] || solveColumnValue(puzzle, +lineIndex, +columnIndex);
    }
  }
  return puzzle.some(line => line.includes(0)) ? solve(puzzle) : puzzle;
}

  /**
   * Получить наиболее вероятное число
   * @param {number[][]} puzzle
   * @param {number} lineIndex
   * @param {number} columnIndex
   */
  function solveColumnValue(puzzle, lineIndex, columnIndex) {
    const probableValues = helper.getProbableValues(puzzle, lineIndex, columnIndex);

    if (!probableValues.length) {
      console.error('has not probableValues', puzzle);
      return 0;
    }

    return probableValues.length > 1 ? 0 : probableValues[0];
  }