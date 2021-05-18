import React from 'react';
import './App.css';

var total = 0;

const add = () => {
  total++;
}


function debouncedFunc(func: (...args: any[]) => void, time: number): Function {
  let timeout: any;

  return function executedFunction(this: any, ...args: any[]) {
    var context = this;

    var later = function () {
      timeout = null;
      func.call(context, ...args);
    }

    clearTimeout(timeout);

    timeout = setTimeout(later, time);
  }
}

let debouncedAdd = debouncedFunc(add, 2000);


function App() {
  return (
    <div className="App">
      <button onClick={() => debouncedAdd()}>Debounced Add</button>
      <button onClick={add}>Regular Add</button>
      <p>{total}</p>
    </div>
  );
}

export default App;
