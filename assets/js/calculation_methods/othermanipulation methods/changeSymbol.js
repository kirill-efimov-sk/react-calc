export function changeSymbol(arrayStr, inputElem, arrayLen, endNumber) {
  if (arrayLen > 2 && endNumber !== undefined && endNumber !== 0) {
    if (arrayStr[endNumber].includes('-')) { 
      arrayStr.splice(endNumber, 1, '+'); inputElem.value = arrayStr.join(''); 
    }
    else if (arrayStr[endNumber].includes('+')) { 
      arrayStr.splice(endNumber, 1, '-'); inputElem.value = arrayStr.join(''); 
    }
  } else {
    if (inputElem.value.includes('-')) { 
      inputElem.value = inputElem.value.replace('-', ''); 
    }
    else if (inputElem.value.includes('+')) { 
      inputElem.value = inputElem.value.replace('+', '-'); 
    }
    // если в строке нет ни +, ни -
    else if (inputElem.value == '0×' || inputElem.value == '0÷' || inputElem.value == '×' || inputElem.value == '÷') {
      inputElem.value = inputElem.value;
    } else {
      inputElem.value = '-'+inputElem.value;
    };
  };
  };