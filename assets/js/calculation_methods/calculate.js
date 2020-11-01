//import для работы с размером шрифтов
import { font } from '../other_function/font.js';

class Calculation {
  constructor(operation) {
    this.value = operation;
  }
  getCalculation(inputElem) {
    let calculationValue = eval(this.value.replace('÷', '/').replace('×', '*'));
    if (isFinite(calculationValue)) {
      inputElem.value = calculationValue;
    } else {
      invalidOperation();
    }
  };
};

export function calculate(globalObjectPattern, inputElem, operation, history, storyElem, param) {
  //вызов функции после исключения
  function err(oldValue) {
    inputElem.classList.remove('font-micro');
    inputElem.value = oldValue;
  };
  function divisionByZero() {
    if (globalObjectPattern.patternDot.test(inputElem.value.slice(-1))) {
      let calculationValue = eval(operation.replace('÷', '/').replace('×', '*')).toFixed(5);
      if (isFinite(calculationValue)) {
        inputElem.value = calculationValue;
      } else {
        invalidOperation();
      };
    }
    else {
      var payment = new Calculation(operation);
      payment.getCalculation(inputElem);
    };
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
    let oldValue = inputElem.value;
    inputElem.classList.add('font-micro');
    inputElem.value = 'недопустимая операция';
    // сохраняем значение поля
    setTimeout(err, 750, oldValue);
  };
  if (globalObjectPattern.patternNew.test(inputElem.value)) {
    if (inputElem.value !== '') {
      //если это не деление на ноль
      if (inputElem.value.includes('÷0')) {
        if (inputElem.value.slice(-2) == '÷0') {
          invalidOperation();
        } else {
          divisionByZero();
        };
      } else {
        divisionByZero();
      };
      workWithHistory();
    } else {
      inputElem.value = '';
    };
    param = true;
  };
};
