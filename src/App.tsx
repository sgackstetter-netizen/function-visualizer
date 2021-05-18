
import React, { useState } from 'react';
import './App.css';



function App() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
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
  return (
    <div className="App">
      <button onClick={() => debouncedAdd()}>Debounced Add</button>
      <button onClick={add}>Regular Add</button>
      <p>{count}</p>
    </div>
  );
}

export default App;
