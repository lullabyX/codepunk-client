import {Cell} from "../../store";
import useTypedSelector from "./use-typed-selector";

const useCumulativeCode = (id: Cell['id']) => {
  const displayFunc = `
      import _React from "react";
      import _ReactDOM from "react-dom";
      const rootEl = document.getElementById("root");
      var display = (value) => {
        if(typeof value === "object") {
          if(value.$$typeof && value.props) {
            const root = _ReactDOM.createRoot(
              rootEl
            );
            root.render(value)
          } else {
            const preEl = document.createElement("pre");
            const preContent = document.createTextNode(JSON.stringify(value, null, 2));
            preEl.appendChild(preContent);
            rootEl.appendChild(preEl);
          }
          
        } else {
          rootEl.innerText = value
        }
      }
    `;

  const displayFuncNoOp = `
      var display = () => {}
  `;

  return useTypedSelector(({ cell: { data, order } }) => {
    let cumu = [displayFuncNoOp];
    for (const cellId of order) {
      if (data[cellId].type !== "text") {
        if (cellId === id) {
          cumu.push(displayFunc);
        }
        cumu.push(data[cellId].content);
      }
      if (cellId === id) {
        break;
      }
    }
    return cumu;
  }).join("\n");
}

export default useCumulativeCode;