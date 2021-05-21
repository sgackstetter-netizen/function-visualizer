import React, { useState } from "react";
import "./App.css";
import LoadBar from "./LoadBar";

function App() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  const loaderClick = () => {
    document.getElementById("loader")!.style.removeProperty('transition');
    document.getElementById("loader")!.style["background-position"] =
      "left bottom";
    document.getElementById("loader")!.style.transition =
    "all 2s ease";
    document.getElementById("loader")!.style["background-position"] =
      "right bottom";
  };

  function debouncedFunc(
    func: (...args: any[]) => void,
    time: number
  ): Function {
    let timeout: any;

    return function executedFunction(this: any, ...args: any[]) {
      var context = this;

      var later = function () {
        timeout = null;
        func.call(context, ...args);
      };

      clearTimeout(timeout);

      timeout = setTimeout(later, time);
    };
  }

  let debouncedAdd = debouncedFunc(add, 2000);
  return (
    <div className="App">
      <button
        onClick={() => {
          debouncedAdd();
          loaderClick();
        }}
      >
        Debounced Add
      </button>
      <button onClick={add}>Regular Add</button>
      <LoadBar />
      <p id="count">{count}</p>
    </div>
  );
}

export default App;
