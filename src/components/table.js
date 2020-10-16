import { compose } from "../helpers/compose.js";
import { createRow } from "./row.js";

/**
 * 
 * @param {HTMLTableSectionElement} tableElement
 * @param {number[][]} puzzle
 * @param {{input: (...args) => Function, blur: (...args) => Function, focus: (...args) => Function}} callbackFn
 */
export function createTable(tableElement, puzzle, callbackFn) {
    puzzle.forEach((line, lineIndex) =>
        compose(tableElement.appendChild.bind(tableElement), createRow)(line, lineIndex, callbackFn)
    );
}