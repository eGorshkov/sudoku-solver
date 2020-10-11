  /**
   * Получение всей колонки по индексу
   * @param {number[][]} puzzle
   * @param {number} columnIndex
   */
  export function getColumn(puzzle, columnIndex) {
    return puzzle.reduce((acc, line) => [...acc, line[columnIndex]], []);
  }