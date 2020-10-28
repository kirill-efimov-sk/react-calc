//import для работы с размером шрифтов
import { font } from '../other_function/font.js';
// пробуем выполнить операцию
// вычисляем значение строки
// это возможно благодаря методу 'eval' (полезный метод .toFixed(N))
export function calculate(globalObjectPattern, inputElem, operation, history, storyElem, param) {
  if (globalObjectPattern.patternNew.test(inputElem.value)) {
    if (inputElem.value !== '') {
      //если это не деление на ноль
      if (!inputElem.value.includes('÷0')) {
        divisionByZero();
      } else {
        if (inputElem.value.slice(-2) == '÷0') {
          invalidOperation();
        } else {
          divisionByZero();
        };
      };
      workWithHistory();
    } else { inputElem.value = '';};
    param = true;
  } else {
    return false;
  };
  //вызов функции после исключения
  function err(oldValue) {
    inputElem.classList.remove('font-micro');
    inputElem.value = oldValue;
  };
  function divisionByZero() {
    if (globalObjectPattern.patternDot.test(inputElem.value.slice(-1))) { 
      let calculationValue = eval(operation.replace('÷', '/').replace('×', '*')).toFixed(5); 
      if (!isFinite(calculationValue)) {
        invalidOperation();
      } else {
        inputElem.value = calculationValue;
      }
    }
    else { 
      let calculationValue = eval(operation.replace('÷', '/').replace('×', '*')); 
      if (!isFinite(calculationValue)) {
        invalidOperation();
      } else {
        inputElem.value = calculationValue;
      }
    }
    font(inputElem);
    history.push(operation.replace('÷', '/').replace('×', '*') + '=' + inputElem.value);
  };
  function workWithHistory() {
    if (history.length > 2) {
      storyElem[0].textContent = history[2]; history.length = 0;
    }
    else if (history.length == 1) {
      storyElem[0].textContent = storyElem[0].textContent + ', ' + history;
      var checkParam = storyElem[0].textContent.slice(0, 1);
      if (checkParam == ',') { storyElem[0].textContent = storyElem[0].textContent.replace(',', '') }
    }
    else {
      storyElem[0].textContent = history;
    };
  };
  function invalidOperation() {
    var oldValue = inputElem.value;
    inputElem.classList.add('font-micro');
    inputElem.value = 'недопустимая операция';
    // сохраняем значение поля
    setTimeout(err, 750, oldValue);
  }
};
