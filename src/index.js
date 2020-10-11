const SUDOKU_SECTION_DIVIDER = 3;
const SUDOKU_VALUES = Array.from(Array(9)).map((x, i) => i + 1);

window.onload = () => {
  function sudoku(puzzle) {
    for (const lineIndex in puzzle) {
      for (const columnIndex in puzzle[lineIndex]) {
        puzzle[lineIndex][columnIndex] =
          puzzle[lineIndex][columnIndex] || getProbableValue(puzzle, +lineIndex, +columnIndex);
      }
    }
    return puzzle.some(line => line.includes(0)) ? sudoku(puzzle) : puzzle;
  }

  // Получить наиболее вероятное число
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

  const sudokuValue = sudoku([
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

  console.log(
    '---',
    'sudoku result',
    JSON.stringify(sudokuValue) ===
      JSON.stringify([
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ])
  );
};