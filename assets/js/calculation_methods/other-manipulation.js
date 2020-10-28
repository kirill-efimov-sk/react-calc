//import функции для смены символа
import { changeSymbol } from './othermanipulation methods/changeSymbol.js';
//import вспомогательной функции
import { subfunction } from './othermanipulation methods/subfunction.js';

export function other_manipulation(value, globalObjectPattern, inputElem, param) {
  var arrayStr = inputElem.value.split('');
  var arrayLen = arrayStr.length;
  var indexes = [];
  if (arrayLen > 0) {
    var indexSbtrY = arrayStr.indexOf('-');
    while (indexSbtrY != -1) { // пока значение переменной index не будет равно -1
      indexes.push(indexSbtrY); // с использованием метода push() добавляем в переменную indexes значение переменной index
      indexSbtrY = arrayStr.indexOf('-', indexSbtrY + 1); // изменяем значение переменной путем поиска необходимого элемента далее в массиве (если найден - индекс элемента, если нет то -1)
    }
    var indexSbtrP = arrayStr.indexOf('+');
    while (indexSbtrP != -1) { // пока значение переменной index не будет равно -1
      indexes.push(indexSbtrP); // с использованием метода push() добавляем в переменную indexes значение переменной index
      indexSbtrP = arrayStr.indexOf('+', indexSbtrP + 1); // изменяем значение переменной путем поиска необходимого элемента далее в массиве (если найден - индекс элемента, если нет то -1)
    }
    for (var i = 0; i < indexes.length; i++) {
      var firstNumber = indexes[0];
      var secondNumber = indexes[i];
      var endNumber = firstNumber;
      if (firstNumber < secondNumber) {
        endNumber = secondNumber;
      }
    }
  }

  // записываем значение в поле
  // если первое значение не цифра, то не вводим его в input
  if (!globalObjectPattern.pattern.test(value) && inputElem.value == '') {
    inputElem.value = '0' + value; return false
  };
  // далее штатная обработка
  // если прошлая операция была посчитана, т.е. нажато равно:
  if (param == true) {
    // если пользователь решил изменить символ с + на - или наоборот
    if (value === '±') {
      changeSymbol(arrayStr, inputElem, arrayLen, endNumber);
    } else {
      // если в строке что-то есть - добавялем в конец строки новое значение
      if (inputElem.value.length > 0) { inputElem.value += value.replace('/', '÷').replace('*', '×'); }
      // в противном случае добавляем новое значение, затирая предыдущие
      else { inputElem.value = value.replace('/', '÷').replace('*', '×'); };
    };
    param = false;
  } else {
    // если равно в прошлой операции не выбиралось (если нажато равно param = true)
    // если пользователь решил изменить символ с + на - или наоборот
    changeAll();
  };
  function changeAll() {
    if (value == '±') {
      changeSymbol(arrayStr, inputElem, arrayLen, endNumber);
      // Если это не ±, то здесь вводим все символы в input
    } else {
      subfunction(inputElem, globalObjectPattern, value);
    };
  };
};