import {ResizableBox, ResizableBoxProps} from "react-resizable";
import "./Resizable.css";

interface resizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}
const Resizable: React.FC<resizableProps> = (props) => {
  let resizableBoxProps: ResizableBoxProps;
  if (props.direction === "vertical") {
    resizableBoxProps = {
      minConstraints: [Infinity, 30],
      maxConstraints: [Infinity, window.innerHeight * .9],
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
    };
  } else {
    resizableBoxProps = {
      width: 300,
      height: Infinity,
      resizeHandles: ["e"],
    };
  }
  return <ResizableBox {...resizableBoxProps}>{props.children}</ResizableBox>;
};

export default Resizable;
