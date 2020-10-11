const SUDOKU_SECTION_DIVIDER = 3;

window.onload = () => {
  // TODO removed
  function toHtml(puzzle) {
    const table = document.getElementById('sudoku');
    puzzle.forEach(element => {
      const tr = document.createElement('tr');
      element.forEach(tdValue => {
        const td = document.createElement('td');
        td.innerText = tdValue;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
  }

  function setValues(puzzle) {
    return puzzle.every(line => line.every(Boolean)) ? puzzle : sudoku(puzzle);
  }

  function sudoku(puzzle) {
    toHtml(puzzle);
    //return the solved puzzle as a 2d array of 9 x 9
    return setValues(puzzle);
  }

  // Получить наиболее вероятное число
  // Получение секции
  // Фильтрации невыбранных значений по линии
  // Фильтрации невыбранных значений по колонке
  // Фильтрация невыбраных значений в секции

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
};