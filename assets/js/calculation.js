//import модуля для вычислений, выполняемых через =/Enter
import { calculate } from './calculation_methods/calculate.js';
//import модуля для очистки imput
import { delAll } from './calculation_methods/del-all-symbol.js';
//import модуля для удаления последнего символа в imput
import { del } from './calculation_methods/del-symbol.js';
//import всех остаточных действий
import { other_manipulation } from './calculation_methods/other-manipulation.js';

export function calculation(value, history, globalObjectPattern, inputElem, param, operation, storyElem) {
  // если нажат знак равенства или Enter
  if (value.match(/=|Enter/)) {
    calculate(globalObjectPattern, inputElem, operation, history, storyElem, param);
  // если нажат символ 'C'
  } else if (value.match(/C|c|С|с/) && value !== 'CE') {
    delAll(history, inputElem, storyElem);
  // если нажат символ 'СЕ' или Backspace
  } else if (value.match(/CE|Backspace/)) {
    del(inputElem, operation);
  // если нажата любая другая кнопка или клавиша
  } else {
    other_manipulation(value, globalObjectPattern, inputElem, param);
  };
  return history, param;
};