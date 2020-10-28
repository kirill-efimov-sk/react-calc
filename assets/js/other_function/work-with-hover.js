//import для динамичной работы со стилями
export function hoverWork(state, elemClass) {
    //state = true or false
    if (state) {
      elemClass.remove('active');
    }
    else {
      elemClass.add('unhover');
    };
  };