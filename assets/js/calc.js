//глобальные переменные
var param = false;
var story = Array();
var pattern = /[0-9]/;
var inputElem = document.getElementsByTagName('input');
var newElem = document.getElementsByTagName('button');


//вызов события с клавиатуры
document.addEventListener('keydown', function(e) {
  var val = e.key;
  if ((val == '÷' || val == '/' || val == '×' || val == '*' || val == '+' || val == '-' || val == '.')) {
    param = false;
  };
  if ((val == '÷' || val == '/' || val == '×' || val == '*' || val == '+' || val == '-' || val == '.' && val !== '=' || val == 'Enter' || val.match(/CE|Backspace|C|c|С|с/) || pattern.test(val) == true) && val.includes('F') == false) {
    main(val.replace('Enter','=').replace('Backspace','CE').replace('С', 'C').replace('с', 'C').replace('c', 'C'));
  };
});
//вызов события при клике
document.onclick = function(event) {
  var elem = event.path[0];
  var val = elem.innerText;
  if ((val == '÷' || val == '/' || val == '×' || val == '*' || val == '+' || val == '-' || val == '.')) {
    param = false;
  };
  if (val!=='history' && elem.tagName !== 'DIV') {
    main(val);
  };
};


//-------------------------------------------------------------
// функция принимает значение кнопки или ключ клавиши
function main(value) {
  var operation = inputElem[0].value;
  //уменьшаем шрифт в поле input при переполнении
  font(inputElem);
  //переборка кнопок
  //удаляем стиль active и присваиваем его нажатой кнопке
  for (i=0;i<19;i++) {
    var y = newElem[i].outerText;
    newElem[i].classList.remove('active');
    if (y == value || y.replace('×', '*') == value || y.replace('÷', '/') == value) {
      newElem[i].classList.add('active');
      var j = i;
    }
  };
  //удаляем класс active
  setTimeout (delClass, 200, newElem, j);
  // если нажат знак равенства или Enter
  if (value.match(/=|Enter/)) {
      // пробуем выполнить операцию
      try {
          // вычисляем значение строки
          // это возможно благодаря методу 'eval' (полезный метод .toFixed(N))
          if (inputElem[0].value!=='') {
            inputElem[0].value = eval(operation.replace('÷','/').replace('×','*'));
            story.push(operation.replace('÷','/').replace('×','*')+'='+inputElem[0].value);

            var storyElem = document.getElementsByClassName('history');
            if (story.length==3){
              storyElem[0].textContent =story[2]; story.length=0;
            }
            else if (story.length==1) {
              storyElem[0].textContent = storyElem[0].textContent+','+story;
              var checkParam = storyElem[0].textContent.slice(0,1);
              if (checkParam==',') {storyElem[0].textContent=storyElem[0].textContent.replace(',', '')}
            }
            else {
              storyElem[0].textContent = story;
            };
          } else {inputElem[0].value ='';};
          param = true;
      // если операцию выполнить невозможно
      } catch {
          // сохраняем значение поля
          inputElem[0].value = inputElem[0].value;
      };

  //-------------------------------------------------------------  
  // если нажат символ 'C'
  } else if (value.match(/C|c|С|с/) && value!=='CE') {
      // очищаем поле
      inputElem[0].value = '';
      inputElem[0].classList.remove('font-micro');
      inputElem[0].classList.remove('font-min');
  
  //-------------------------------------------------------------
  // если нажат символ 'СЕ' или Backspace
  } else if (value.match(/CE|Backspace/)) {
      // уменьшаем строку на один символ
      inputElem[0].value = operation.substring(0, operation.length - 1);
      font(inputElem);
  
  //-------------------------------------------------------------  
  // если нажата любая другая кнопка или клавиша
  } else {
    // записываем значение в поле
    ///[+-/*x22]+/ regexp
    //если первое значение не цифра, то не вводим его в input
    var checkSymbol = pattern.test(value);
    if (checkSymbol == false && inputElem[0].value == '') {inputElem[0].value = '0'+value; return false};

    //далее штатная обработка
    //если прошлая операция была посчитана, т.е. нажато равно:
    if (param == true) {
      //если пользователь решил изменить символ с + на - или наоборот
      if (value == '±') {
        if (inputElem[0].value.includes('-')==true){inputElem[0].value = inputElem[0].value.replace('-','+');}
        else if (inputElem[0].value.includes('+')==true){inputElem[0].value = inputElem[0].value.replace('+','-');};
      } else {
        //в противном случае добавляем новое значение, затирая предыдущие
        inputElem[0].value = value.replace('/','÷').replace('*','×');
      };
      param = false; 
    } else {
      //если равно в прошлой операции не выбиралось (если нажато равно param = true)
      //если пользователь решил изменить символ с + на - или наоборот
      if (value == '±') {
        if (inputElem[0].value.includes('-')==true){inputElem[0].value = inputElem[0].value.replace('-','+');}
        else if (inputElem[0].value.includes('+')==true){inputElem[0].value = inputElem[0].value.replace('+','-');};  
      } else {
        //split('').reverse().join('');
        var patternNew = /\*|\+|\-|\/|×|÷/;
        var e = patternNew.test(inputElem[0].value.slice(-1));
        var strElem = inputElem[0].value.slice(-1);
        var strLength = inputElem[0].value.length;
        //если в строке последним уже присутсвует математический символ нужно проверить какой и при вводе нового - заменить на него
        if (e==true) {
          var subStr = value.replace('÷','/').replace('×','*');
          var test = inputElem[0].value.slice(0,strLength-1)
          if (pattern.test(subStr) == false) {
            switch (subStr) {
              case '+':
                inputElem[0].value = inputElem[0].value.slice(0,strLength-1)+inputElem[0].value.slice(-1).replace(strElem,value);
                break;
              case '-':
                inputElem[0].value = inputElem[0].value.slice(0,strLength-1)+inputElem[0].value.slice(-1).replace(strElem,value);
                break;
              case '/':
                inputElem[0].value = inputElem[0].value.slice(0,strLength-1)+inputElem[0].value.slice(-1).replace(strElem,value);
                break;
              case '*':
                inputElem[0].value = inputElem[0].value.slice(0,strLength-1)+inputElem[0].value.slice(-1).replace(strElem,value);
              break;
            };
            //если вводится обычное целочисленое значение - добавить в конец строки
          } else {
            inputElem[0].value += value.replace('/','÷').replace('*','×'); 
          }
        } else {
          inputElem[0].value += value.replace('/','÷').replace('*','×'); 
        };
      };
    };
  };
};
//-------------------------------------------------------------
//удаление класса active через 200мс через setTimeout
 function delClass(newElem, j) {
  newElem[j].classList.remove('active');
};
//уменьшение шрифта, если input переполнен
function font(inputElem) {
  var lengthElem = inputElem[0].value.length;
  if (lengthElem > 13) {
    inputElem[0].classList.add('font-min');
  };
  if (lengthElem > 18) {
    inputElem[0].classList.remove('font-min');
    inputElem[0].classList.add('font-micro');
  };
  if (lengthElem < 13) {
    inputElem[0].classList.remove('font-min');
    inputElem[0].classList.remove('font-micro');
  };
};