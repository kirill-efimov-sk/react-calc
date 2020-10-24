//глобальные переменные
var elemClassDel = '';
var param = false;
var story = Array();
var pattern = /[0-9]/;
var patternNew = /\*|\+|\-|\/|×|÷/;
var patternNan = /\*|\/|/;
var patternDot = /\./;
var inputElem = document.querySelector('input');
var newElem = document.querySelectorAll('button');


//вызов события с клавиатуры
document.addEventListener('keydown', function attach(e) {
  var val = e.key;
  if (patternNew.test(val)) {
    param = false;
  };
  if ((patternNew.test(val) || val == '.' && val !== '=' || val == 'Enter' || val.match(/CE|Backspace|C|c|С|с/) || pattern.test(val)) && val.includes('F') == false) {
    main(val.replace('Enter','=').replace('Backspace','CE').replace('С', 'C').replace('с', 'C').replace('c', 'C'));
  };
  //DETACH
  document.removeEventListener('click', attach, false);
});

//вызов события при клике
document.onclick = function(event) {
  var path = event || (event.composedPath && event.composedPath());
  try {
    var elem = path.path[0];
    var val = elem.innerText;
  }
  catch {
    var elem = path.rangeParent.data;
    var val = elem;
  }
  if (patternNew.test(val)==true || val == '.') {
    param = false;
  };
  if (val!=='history' && elem.tagName !== 'DIV' && elem.tagName !== 'INPUT') {
    main(val);
  };
};
//вызов функции для удаления стилей с кнопок через 200мс
function hoverWork(w) {
  if (w==true) {elemClassDel.remove('active');}
  else {elemClassDel.add('unhover');};
};
//вызов функции после исключения
function err(oldValue) {
  inputElem.classList.remove('font-micro');
  inputElem.value = oldValue;
};


//-------------------------------------------------------------
// функция принимает значение кнопки или ключ клавиши
function main(value) {
  var operation = inputElem.value;
  var storyElem = document.getElementsByClassName('history');
  //уменьшаем шрифт в поле input при переполнении
  font(inputElem);
  //переборка кнопок
  //удаляем стиль active и присваиваем его нажатой кнопке
  for (i=0;i<19;i++) {
    var y = newElem[i].innerText;
    newElem[i].classList.remove('active');
    newElem[i].classList.remove('unhover');
    if (y == value || y.replace('×', '*') == value || y.replace('÷', '/') == value) {
      newElem[i].classList.add('active');
      //удаляем класс active
      elemClassDel = newElem[i].classList;
      setTimeout(hoverWork, 100, true);
      setTimeout(hoverWork, 150, false);
    }
  };
  // если нажат знак равенства или Enter
  if (value.match(/=|Enter/)) {
      // пробуем выполнить операцию
      try {
          // вычисляем значение строки
          // это возможно благодаря методу 'eval' (полезный метод .toFixed(N))
          if (patternNew.test(inputElem.value)) {
            if (inputElem.value!=='') {
              //если это не деление на ноль
              if (!inputElem.value.includes('÷0')) {
                if (patternDot.test(inputElem.value.slice(-1))) {inputElem.value = eval(operation.replace('÷','/').replace('×','*')).toFixed(5);}
                else {inputElem.value = eval(operation.replace('÷','/').replace('×','*'));}
                font(inputElem);
                story.push(operation.replace('÷','/').replace('×','*')+'='+inputElem.value);
              } else {
                var oldValue = inputElem.value;
                inputElem.classList.add('font-micro')
                inputElem.value ='недопустимая операция';
                // сохраняем значение поля
                setTimeout(err, 750, oldValue);
              }
              
              if (story.length>2){
                storyElem[0].textContent =story[2]; story.length=0;
              }
              else if (story.length==1) {
                storyElem[0].textContent = storyElem[0].textContent+', '+story;
                var checkParam = storyElem[0].textContent.slice(0,1);
                if (checkParam==',') {storyElem[0].textContent=storyElem[0].textContent.replace(',', '')}
              }
              else {
                storyElem[0].textContent = story;
              };
            } else {inputElem.value ='';};
            param = true;
          } else {
            return false;
          }
      // если операцию выполнить невозможно
      } catch {
          // сохраняем значение поля
          inputElem.value = inputElem.value;
      };

  //-------------------------------------------------------------  
  // если нажат символ 'C'
  } else if (value.match(/C|c|С|с/) && value!=='CE') {
      // очищаем поле
      story = [];
      inputElem.value = '';
      storyElem[0].textContent = story;
      inputElem.classList.remove('font-micro');
      inputElem.classList.remove('font-min');
  
  //-------------------------------------------------------------
  // если нажат символ 'СЕ' или Backspace
  } else if (value.match(/CE|Backspace/)) {
      // уменьшаем строку на один символ
      inputElem.value = operation.substring(0, operation.length - 1);
      font(inputElem);
  
  //-------------------------------------------------------------  
  // если нажата любая другая кнопка или клавиша
  } else {
    var arrayStr = inputElem.value.split('');
    var arrayLen = arrayStr.length;
    var indexes = [];
    if (arrayLen>0) {
      var indexSbtrY = arrayStr.indexOf('-');
      while (indexSbtrY != -1) { // пока значение переменной index не будет равно -1
        indexes.push(indexSbtrY); // с использованием метода push() добавляем в переменную indexes значение переменной index
        indexSbtrY = arrayStr.indexOf('-',indexSbtrY+ 1); // изменяем значение переменной путем поиска необходимого элемента далее в массиве (если найден - индекс элемента, если нет то -1)
      }
      var indexSbtrP = arrayStr.indexOf('+');
      while (indexSbtrP != -1) { // пока значение переменной index не будет равно -1
        indexes.push(indexSbtrP); // с использованием метода push() добавляем в переменную indexes значение переменной index
        indexSbtrP = arrayStr.indexOf('+',indexSbtrP+ 1); // изменяем значение переменной путем поиска необходимого элемента далее в массиве (если найден - индекс элемента, если нет то -1)
      }
      for (i=0; i<indexes.length;i++) {
        var firstNumber = indexes[0];
        var secondNumber = indexes[i];
        var endNumber = firstNumber;
        if (firstNumber<secondNumber) {
          endNumber = secondNumber;
        }
      }
    }
    // записываем значение в поле
    //если первое значение не цифра, то не вводим его в input
    if (!pattern.test(value) && inputElem.value == '') {inputElem.value = '0'+value; return false};
    //далее штатная обработка
    //если прошлая операция была посчитана, т.е. нажато равно:
    if (param == true) {
      //если пользователь решил изменить символ с + на - или наоборот
      if (value == '±') {
        if (arrayLen>2 && endNumber!==undefined && endNumber!==0) {
          if (arrayStr[endNumber].includes('-')){arrayStr.splice(endNumber,1,'+');inputElem.value = arrayStr.join('');}
          else if (arrayStr[endNumber].includes('+')){arrayStr.splice(endNumber,1,'-');inputElem.value = arrayStr.join('');}
        } else {
          if (inputElem.value.includes('-')){inputElem.value = inputElem.value.replace('-','');}
          else if (inputElem.value.includes('+')){inputElem.value = inputElem.value.replace('+','-');}
          //если в строке нет ни +, ни -
          else {inputElem.value = -inputElem.value};
        }
      } else {
        //если в строке что-то есть - добавялем в конец строки новое значение
        if (inputElem.value.length>0) {inputElem.value += value.replace('/','÷').replace('*','×');}
         //в противном случае добавляем новое значение, затирая предыдущие
        else {inputElem.value = value.replace('/','÷').replace('*','×');};  
      };
      param = false; 
    } else {
      //если равно в прошлой операции не выбиралось (если нажато равно param = true)
      //если пользователь решил изменить символ с + на - или наоборот
      if (value == '±') {
        if (arrayLen>2 && endNumber!==undefined && endNumber!==0) {
          if (arrayStr[endNumber].includes('-')){arrayStr.splice(endNumber,1,'+');inputElem.value = arrayStr.join('');}
          else if (arrayStr[endNumber].includes('+')){arrayStr.splice(endNumber,1,'-');inputElem.value = arrayStr.join('');}
        } else {
          if (inputElem.value.includes('-')){inputElem.value = inputElem.value.replace('-','');}
          else if (inputElem.value.includes('+')){inputElem.value = inputElem.value.replace('+','-');}
          //если в строке нет ни +, ни -
          else if (!inputElem.value.includes("÷") && !inputElem.value.includes("×")) {
            inputElem.value = -inputElem.value
          };
        };
      //Если это не ±, то здесь вводим все символы в input
      } else {
        //split('').reverse().join('');
        var strElem = inputElem.value.slice(-1);
        var strLength = inputElem.value.length;
        //если в строке последним уже присутсвует математический символ нужно проверить какой и при вводе нового - заменить на него
        if (patternNew.test(inputElem.value.slice(-1)) || patternDot.test(inputElem.value.slice(-1))) {
          var subStr = value.replace('÷','/').replace('×','*');
          if (pattern.test(subStr) == false) {
            var str = inputElem.value.slice(0,strLength-1)+inputElem.value.slice(-1).replace(strElem,value);
            inputElem.value = str;
            //если вводится обычное целочисленое значение - добавить в конец строки
          } else {
            inputElem.value += value.replace('/','÷').replace('*','×'); 
          }
        } else if (patternDot.test(inputElem.value.slice(-1)) && value == '.') {
          return false;
        }
        else {
          //если в input стоит точка - не добавляем вторую
          if (patternDot.test(inputElem.value.slice(-1))) {
            inputElem.value = value;
          } else {
            //если в input тольуо 0, то его надо игнорировать и заменять на новый символ, если он не математический
            if (inputElem.value=='0' && patternDot.test(inputElem.value.slice(-1))) {
              inputElem.value = value;
            } else {
              inputElem.value += value.replace('/','÷').replace('*','×'); 
            };
          };
        };
      };
    };
  };
};
//-------------------------------------------------------------
//уменьшение шрифта, если input переполнен
function font(inputElem) {
  var lengthElem = inputElem.value.length;
  if (lengthElem > 11) {
    inputElem.classList.add('font-min');
  };
  if (lengthElem > 16) {
    inputElem.classList.remove('font-min');
    inputElem.classList.add('font-micro');
  };
  if (lengthElem <= 11) {
    inputElem.classList.remove('font-min');
    inputElem.classList.remove('font-micro');
  };
};