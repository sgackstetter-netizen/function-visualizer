import React, { useState } from "react";
import "./App.css";
import LoadBar from "./LoadBar";

function App() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  const loaderClick = () => {
    document.getElementById("loader")!.classList.add("no-transition");
    document.getElementById("loader")!.style["background-position"] =
      "left bottom";
    var reset = document.getElementById("loader")!.offsetHeight;
    console.log(reset);
    document.getElementById("loader")!.classList.remove("no-transition");
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
    // typical debounce is .5 sec or .2 if search cost is low
  let debouncedAdd = debouncedFunc(add, 2000);
  return (
    <div className="App">
      <button
        onClick={() => {
          debouncedAdd();
          loaderClick();
        }}
      >
        Debounced Key Press
      </button>
        <div>
            <h1>
                Debounced Search
            </h1>
            <input onChange={() => {
                debouncedAdd();
                loaderClick();
            }}></input>
        </div>
      <button onClick={add}>Non-debounced Key Press</button>
        <div style={{marginBottom: '20px'}}>
            <h1>
                Non-Debounced Search
            </h1>
            <input onChange={() => {
                add()
            }}></input>
        </div>
      <LoadBar />
      <p id="count">{'Search Count ' + count}</p>
    </div>
  );
}

export default App;
