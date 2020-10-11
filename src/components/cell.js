import { compose } from '../helpers/compose.js';

const MAX_VALUE = 9;
const MIN_VALUE = 1;

export function createCell([columnValue, columnIndex, validationFn]) {
  const td = document.createElement('td');
  td.setAttribute('column', columnIndex);
  td.appendChild(createInput(columnValue, validationFn));
  return td;
}

function createInput(value, validationFn) {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = value || '';
        input.disabled = !!value;
        input.max = MAX_VALUE;
        input.min = MIN_VALUE;

        input.addEventListener('input', compose(validationFn, validate));
            return input;
    }

function validate(e) {
        const current = e.target.valueAsNumber || '';
        e.target.value = current > MAX_VALUE ? MAX_VALUE : current < MIN_VALUE ? '' : current;
        return e;
}