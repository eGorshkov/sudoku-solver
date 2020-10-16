import * as mode from './services/sudoku.js';
const sudokuPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

window.onload = () => {
  const table = document.getElementById('sudoku-table');
  const buttons = document.getElementById('sudoku-buttons');
  const text = document.getElementById('sudoku-text');

  mode._focusedChange.next((focused) => {
    console.log('_focusedChange value: ', mode._focusedChange.getValue());
    buttons.querySelector('#check-unselected-button').disabled = !focused;
  });

  mode._textChange.next((value) => {
    console.log('_textChange value: ', mode._textChange.getValue());
    text.innerText = value
  });

  mode.create(table, sudokuPuzzle);
};
