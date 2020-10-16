import { COLUMN_INDEX, LINE_INDEX, MAX_SUDOKU_VALUE, MIN_SUDOKU_VALUE } from '../helpers/constans.js';
import { getColumn } from '../helpers/index.js';
import { getPuzzleSection } from '../helpers/puzzle-section.js';

/**
 *
 * @param {HTMLTableSectionElement} table
 * @param {number[][]} puzzle
 */
export function validate(puzzle, table, callbackFn) {
  return e => {
    e.target.value = validateValue(e.target.valueAsNumber);
    removeValidation(table);

    const column = e.target.parentElement,
      line = column.parentElement,
      columnIndex = +column.getAttribute(COLUMN_INDEX),
      lineIndex = +line.getAttribute(LINE_INDEX);

    validateCell(
      column,
      hasInValues(e, [
        puzzle[lineIndex],
        getColumn(puzzle, columnIndex),
        getPuzzleSection(puzzle, lineIndex, columnIndex)
      ])
    );
    validateRow(line);

    callbackFn(lineIndex, columnIndex, e.target.valueAsNumber || 0);
    // validateColumn(tbody, column.getAttribute(COLUMN_INDEX));
  };
}

export function removeValidation(table) {
  Array.from(table.rows).forEach(remove);
}

function hasInValues(e, valuesArray) {
  return valuesArray.map(array => hasIn(e, array));
}

function validateValue(value) {
  value = value || '';
  return value > MAX_SUDOKU_VALUE ? MAX_SUDOKU_VALUE : value < MIN_SUDOKU_VALUE ? '' : value;
}

function validateCell(column, checks) {
  checkInvalid(column, checks.some(Boolean));
}

function validateRow(line) {
  checkInvalid(
    line,
    Array.from(line.children).some(cell => cell.hasAttribute('invalid'))
  );
}

function validateColumn(table, columnIndex) {
  checkInvalid();
}

function hasIn(e, values) {
  return e.type === 'focus' ? hasDuplicate(values) : values.includes(e.target.valueAsNumber);
}

function hasDuplicate(values) {
  values = values.filter(Boolean).sort();
  for (let i = 0; i < values.length; i++) {
    if (values[i] === values[i + 1]) return true;
  }
  return false;
}

function remove(element) {
  checkInvalid(element, false);
  if (element.children) {
    Array.from(element.children).forEach(remove);
  }
}

/**
 *
 * @param {HTMLElement} element
 * @param {boolean} value
 * @param {string} className?
 */
function checkInvalid(element, value, className) {
  value ? element.setAttribute('invalid', '') : element.removeAttribute('invalid');
  if (className) {
    value ? element.classList.add(className) : element.classList.remove(className);
  }
}
