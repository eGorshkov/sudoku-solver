window.onload = () => {
  const form = document.getElementById('sudoku-radio-form');
  const inputs = form.querySelectorAll('input');
  inputs.forEach(radio => radio.addEventListener('change', setMode));
  console.log(form, inputs);

  function setMode(event) {
    console.log('---', 'setMode', event);
  }
};
