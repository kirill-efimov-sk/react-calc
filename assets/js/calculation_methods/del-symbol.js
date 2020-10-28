//import для работы с размером шрифтов
import { font } from '../other_function/font.js';
// уменьшаем строку на один символ
export function del(inputElem, operation) {
  inputElem.value = operation.substring(0, operation.length - 1);
  font(inputElem);
};