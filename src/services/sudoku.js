import * as helper from '../helpers/index.js';
import { removeValidation, validate } from './validation.js';
import { createTable } from '../components/table.js';
import { Subject } from '../helpers/custom-subject.js';

export const _focusedChange = new Subject(false);
export const _textChange = new Subject('initial');

/**
 *
 * @param {HTMLTableSectionElement} tableElement
 * @param {number[][]} puzzle
 */
export function create(tableElement, puzzle) {
  createTable(tableElement, puzzle, {
    input: validate(puzzle, tableElement, setValue(puzzle)),
    focus: validate(puzzle, tableElement, [
      setValue(puzzle),
      _focusedChange.bind(true),
      _textChange.bind( 'focused')
    ]),
    blur: [
      removeValidation.bind(null, tableElement),
      _focusedChange.bind( false),
      _textChange.bind( 'blured')
    ]
  });
}

function setValue(puzzle) {
  return (lineIndex, columnIndex, value) => (puzzle[lineIndex][columnIndex] = value);
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
