//импортируемые модули
//основной модуль по вычислениям
import { calculation } from './calculation.js';
//regexp выражения
import { globalObjectPattern } from './calc-global-parameters.js';
//import для работы с размером шрифтов
import { font } from './other_function/font.js';
//import для динамичной работы со стилями
import { hoverWork } from './other_function/work-with-hover.js';

//глобальные переменные
var inputElem = document.querySelector('input');
var btns = document.querySelectorAll('button');

(function () {
  //глобальные переменные IIFE
  var param = false;
  var history = Array();

  //вызов события с клавиатуры
  document.addEventListener('keydown', function attach(e) {
    var val = e.key;
    if (globalObjectPattern.patternNew.test(val)) {
      param = false;
    };
    if ((globalObjectPattern.patternNew.test(val)
      ||
      val == '.' && val !== '=' || val == 'Enter'
      ||
      val.match(/CE|Backspace|C|c|С|с/)
      ||
      globalObjectPattern.pattern.test(val))
      &&
      val.includes('F') == false
    ) {
      main(val.replace('Enter', '=').replace('Backspace', 'CE').replace('С', 'C').replace('с', 'C').replace('c', 'C'));
    };
    //DETACH
    document.removeEventListener('click', attach, false);
  });
  //вызов события при клике
  btns.forEach(btns => {
    btns.onclick = function (event) {
      var path = event || (event.composedPath && event.composedPath()) || event.srcElement.innerText;
      //реализовано для поддержки кроссбраузерности
      try {
        var elem = path.path[0];
        var val = elem.innerText;
      }
      catch {
        var elem = path.rangeParent.data;
        var val = elem;
      }
      if (globalObjectPattern.patternNew.test(val) || val == '.') {
        param = false;
      };
      main(val);
    }
  });


  //-------------------------------------------------------------
  // основная процелура
  // функция принимает значение кнопки или ключ клавиши
  function main(value) {
    let operation = inputElem.value;
    let storyElem = document.getElementsByClassName('history');
    const calcParameters = { value, history, globalObjectPattern, inputElem, param, operation, storyElem }

    //уменьшаем шрифт в поле input при переполнении строки
    font(inputElem);
    //добавляем класс и удаляем для кнопок при нажатии/клике
    workWithClassListBtns(value);
    //основная функция, производящая вычисления
    calculation(calcParameters);
  };
  function workWithClassListBtns(value) {
    let totalBtns = 19; //кол-во кнопок калькулятора
    //переборка кнопок: удаляем стиль active и присваиваем его нажатой кнопке
    for (var i = 0; i < totalBtns; i++) {
      var valueBtns = btns[i].innerText;
      btns[i].classList.remove('active');
      btns[i].classList.remove('unhover');
      if (valueBtns == value || valueBtns.replace('×', '*') == value || valueBtns.replace('÷', '/') == value) {
        btns[i].classList.add('active');
        //удаляем класс active
        var elemClass = btns[i].classList;
        //Функции, работающие с UI
        //вызов функции для удаления стилей с кнопок через 200мс
        setTimeout(hoverWork, 100, true, elemClass);
        setTimeout(hoverWork, 150, false, elemClass);
        break;
      }
    };
  }
})();