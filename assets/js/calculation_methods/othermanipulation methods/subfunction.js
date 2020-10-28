export function subfunction(inputElem, globalObjectPattern, value) {
  var strElem = inputElem.value.slice(-1);
  var strLength = inputElem.value.length;
  // если в строке последним уже присутсвует математический символ нужно проверить какой и при вводе нового - заменить на него
  if (globalObjectPattern.patternNew.test(inputElem.value.slice(-1)) || globalObjectPattern.patternDot.test(inputElem.value.slice(-1))) {
    replaceMath(strElem, strLength);
  } else if (globalObjectPattern.patternDot.test(inputElem.value.slice(-1)) && value == '.') {
    return false;
  }
  else {
    // если в input стоит точка - не добавляем вторую
    if (globalObjectPattern.patternDot.test(inputElem.value.slice(-1))) {
      inputElem.value = value;
    } else {
    pointOperations();
    };
  };
  function replaceMath(strElem, strLength) {
    var subStr = value.replace('÷', '/').replace('×', '*');
    if (globalObjectPattern.pattern.test(subStr) == false) {
      var str = inputElem.value.slice(0, strLength - 1) + inputElem.value.slice(-1).replace(strElem, value);
      inputElem.value = str;
      // если вводится обычное целочисленое значение - добавить в конец строки
    } else {
      inputElem.value += value.replace('/', '÷').replace('*', '×');
    }
    };
    function pointOperations() {
      // для начал подсчитаем сколько вообще точек
      let dotLen = (inputElem.value.match(/\./g)||[]).length;
      // если в input тольуо 0, то его надо игнорировать и заменять на новый символ, если он не математический
      if (inputElem.value == '0' && globalObjectPattern.patternDot.test(inputElem.value.slice(-1))) {
        inputElem.value = value;
      } else if (dotLen>=1 && value === '.') {
        inputElem.value = inputElem.value;
      }
      else {
        inputElem.value += value.replace('/', '÷').replace('*', '×');
      };
    };
  };