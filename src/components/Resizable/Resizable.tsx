import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";

interface resizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}
const Resizable: React.FC<resizableProps> = (props) => {
  let resizableBoxProps: ResizableBoxProps;
  if (props.direction === "vertical") {
    resizableBoxProps = {
      width: Infinity,
      height: 300,
      minConstraints: [Infinity, 30],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      resizeHandles: ["s"],
    };
  } else {
    resizableBoxProps = {
      className: "resize-horizontal",
      width: window.innerWidth * 0.8,
      height: Infinity,
      minConstraints: [5, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  }
  return <ResizableBox {...resizableBoxProps}>{props.children}</ResizableBox>;
};

export default Resizable;
