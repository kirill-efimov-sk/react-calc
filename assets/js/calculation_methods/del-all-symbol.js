// очищаем поле
export function delAll(history, inputElem, storyElem) {
  history = []; //очищаем историю расчетов
  inputElem.value = '';
  storyElem[0].textContent = history;
  inputElem.classList.remove('font-micro');
  inputElem.classList.remove('font-min');
};