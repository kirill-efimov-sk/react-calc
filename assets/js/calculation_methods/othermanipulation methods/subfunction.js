export function subfunction(inputElem, globalObjectPattern, value) {
  function replaceMath(strElem, strLength) {
    var subStr = value.replace('÷', '/').replace('×', '*');
    if (globalObjectPattern.pattern.test(subStr) && globalObjectPattern.patternNew.test(strElem)) {
      inputElem.value = inputElem.value + value.replace('/', '÷').replace('*', '×');
      // если вводится обычное целочисленое значение - добавить в конец строки
    } else if (globalObjectPattern.pattern.test(subStr) && globalObjectPattern.patternDot.test(strElem)) {
      inputElem.value = inputElem.value + value.replace('/', '÷').replace('*', '×');
    } else {
      var str = inputElem.value.slice(0, strLength - 1) + inputElem.value.slice(-1).replace(strElem, value);
      inputElem.value = str;
    }
  };
  function pointOperations() {
    // для начал подсчитаем сколько вообще точек
    let dotLen = (inputElem.value.match(/\./g) || []).length;
    // если в input тольуо 0, то его надо игнорировать и заменять на новый символ, если он не математический
    if (inputElem.value == '0' && globalObjectPattern.patternDot.test(inputElem.value.slice(-1))) {
      inputElem.value = value;
    } else if (dotLen >= 1 && value === '.') {
      // сначала нужно проверить есть ли между операндами оператор
      var totalStr = inputElem.value.split('');
      var checkPoint1 = false;
      var checkPoint2 = true;
      for (var i = 0; i < totalStr.length; i++) {
        if (globalObjectPattern.patternNew.test(totalStr[i])) {
          checkPoint1 = true;
          checkPoint2 = true;
        }
        if (globalObjectPattern.patternDot.test(totalStr[i]) && checkPoint1 == true) {
          checkPoint2 = false;
        }
      };
      if (checkPoint1 == true && checkPoint2 == true) {
        inputElem.value += value.replace('/', '÷').replace('*', '×');
      } else {
        inputElem.value = inputElem.value;
        ;
      }
    }
    else {
      inputElem.value += value.replace('/', '÷').replace('*', '×');
    };
  };
  
  var strElem = inputElem.value.slice(-1);
  var strLength = inputElem.value.length;
  // если в строке последним уже присутсвует математический символ нужно проверить какой и при вводе нового - заменить на него
  if (globalObjectPattern.patternNew.test(inputElem.value.slice(-1)) || globalObjectPattern.patternDot.test(inputElem.value.slice(-1))) {
    if (value === '.' && globalObjectPattern.patternDot.test(inputElem.value.slice(-1))) {
      inputElem.value = inputElem.value;
    } else if (value === '.' && !globalObjectPattern.patternDot.test(inputElem.value.slice(-1))) {
      inputElem.value = inputElem.value + '0' + value;
    } else {
      replaceMath(strElem, strLength);
    };
  } else {
    // если в input стоит точка - не добавляем вторую
    if (globalObjectPattern.patternDot.test(inputElem.value.slice(-1))) {
      inputElem.value = value;
    } else if (inputElem.value.slice(-1) === '0' && value !== '.') {
      if (globalObjectPattern.pattern.test(inputElem.value.slice(-2)) && inputElem.value.length >1) {
        inputElem.value += value;
      } else {
      var str = inputElem.value.slice(0, strLength - 1) + inputElem.value.slice(-1).replace(strElem, value);
      inputElem.value = str;
      };
   } else {
      pointOperations();
    };
  };
};