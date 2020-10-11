/**
 * Делитель судоку на секции
 * @type {number}
 * @readonly
 */
const SUDOKU_SECTION_DIVIDER = 3;

/**
   * Получение секции
   * @param {number[][]} puzzle
   * @param {number} lineIndex
   * @param {number} columnIndex
   */
  export function getPuzzleSection(puzzle, lineIndex, columnIndex) {
    const sectionLineIndex = getPuzzleSectionIndex(lineIndex),
          sectionColumnIndex = getPuzzleSectionIndex(columnIndex),
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