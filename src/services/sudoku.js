import * as helper from '../helpers/index.js';
import {createCell} from '../components/cell.js'
/**
 * 
 * @param {HTMLTableSectionElement} tableElement 
 * @param {number[][]} puzzle
 */
export function create(tableElement, puzzle) {
  puzzle.forEach((line, lineIndex) => {
    const tr = document.createElement('tr'),
          composeFn = helper.compose(tr.appendChild.bind(tr), createCell);

    tr.setAttribute('line', lineIndex);
    line.forEach((column, columnIndex) => composeFn(column, columnIndex, check(puzzle)));
    tableElement.appendChild(tr);
  });
}

function check(puzzle) {
  return (e) => {
    if(
      getAllValues(
        puzzle,
        +e.target.parentElement.parentElement.getAttribute('line'),
        +e.target.parentElement.getAttribute('column')
        ).includes(e.target.valueAsNumber)
    ) {
      e.target.classList.add('sudoku__td--invalid');
    } else {
      e.target.classList.remove('sudoku__td--invalid');
    };

  }
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
    const probableValues = getProbableValues(puzzle, lineIndex, columnIndex);

    if (!probableValues.length) {
      console.error('has not probableValues', puzzle);
      return 0;
    }

    return probableValues.length > 1 ? 0 : probableValues[0];
  }

  function getProbableValues(puzzle, lineIndex, columnIndex) {
    return helper.constans.SUDOKU_VALUES.filter(probable(getAllValues(puzzle, lineIndex, columnIndex)));
  }

  /**
   * 
   * @param {number[][]} puzzle
   * @param {number} lineIndex
   * @param {number} columnIndex
   */
  function getAllValues(puzzle, lineIndex, columnIndex) {
    return [
      ...puzzle[lineIndex],
      ...helper.getColumn(puzzle, columnIndex),
      ...helper.getPuzzleSection(puzzle, lineIndex, columnIndex)
    ].filter(Boolean)
  }

  /**
   * Фильтрация невыбранных значений
   * @param {number[]} allValues
   */
  function probable(allValues) {
    return value => !allValues.includes(value);
  }