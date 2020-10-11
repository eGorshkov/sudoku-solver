const SUDOKU_SECTION_DIVIDER = 3;
const SUDOKU_VALUES = Array.from(Array(9)).map((x, i) => i + 1);

function sudoku(puzzle) {
  for (const lineIndex in puzzle) {
    for (const columnIndex in puzzle[lineIndex]) {
      puzzle[lineIndex][columnIndex] =
        puzzle[lineIndex][columnIndex] || getProbableValue(puzzle, +lineIndex, +columnIndex);
    }
  }
  return puzzle.some(line => line.includes(0)) ? sudoku(puzzle) : puzzle;
}

  /**
   * Получить наиболее вероятное число
   * @param {number[][]} puzzle
   * @param {number} lineIndex
   * @param {number} columnIndex
   */
  function getProbableValue(puzzle, lineIndex, columnIndex) {
    const probableValues = SUDOKU_VALUES.filter(
      probable(puzzle[lineIndex], getColumn(puzzle, columnIndex), getPuzzleSection(puzzle, lineIndex, columnIndex))
    );

    if (!probableValues.length) {
      console.error('has not probableValues', puzzle);
      return 0;
    }

    return probableValues.length > 1 ? 0 : probableValues[0];
  }

  /**
   * Фильтрация невыбранных значений
   * @param {number[]} line
   * @param {number[]} column
   * @param {number[]} section
   */
  function probable(line, column, section) {
    const checked = [...line, ...column, ...section].filter(Boolean);
    return value => !checked.includes(value);
  }
  /**
   * Получение всей колонки по индексу
   * @param {number[][]} puzzle
   * @param {number} columnIndex
   */
  function getColumn(puzzle, columnIndex) {
    return puzzle.reduce((acc, line) => [...acc, line[columnIndex]], []);
  }
  /**
   * Получение секции
   * @param {number[][]} puzzle
   * @param {number} lineIndex
   * @param {number} columnIndex
   */
  function getPuzzleSection(puzzle, lineIndex, columnIndex) {
    const sectionLineIndex = getPuzzleSectionIndex(lineIndex);
    sectionColumnIndex = getPuzzleSectionIndex(columnIndex);
    result = [];
    for (let i = sectionLineIndex; i < sectionLineIndex + SUDOKU_SECTION_DIVIDER; i++) {
      result.push(...puzzle[i].slice(sectionColumnIndex, sectionColumnIndex + SUDOKU_SECTION_DIVIDER));
    }
    return result;
  }
  /**
   * Получение индекса для секции
   * @param {number} index
   */
  function getPuzzleSectionIndex(index) {
    return Math.max(0, Math.ceil((index + 1) / SUDOKU_SECTION_DIVIDER) - 1) * SUDOKU_SECTION_DIVIDER;
  }

  sudoku([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ]);