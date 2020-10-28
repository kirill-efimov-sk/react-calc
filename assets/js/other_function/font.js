//уменьшение шрифта, если input переполнен
export function font(inputElem) {
  var lengthElem = inputElem.value.length;
  if (lengthElem > 11) {
    inputElem.classList.add('font-min');
  };
  if (lengthElem > 16) {
    inputElem.classList.remove('font-min');
    inputElem.classList.add('font-micro');
  };
  if (lengthElem <= 16) {
    inputElem.classList.add('font-min');
    inputElem.classList.remove('font-micro');
  };
  if (lengthElem <= 11) {
    inputElem.classList.remove('font-min');
    inputElem.classList.remove('font-micro');
  };
  };