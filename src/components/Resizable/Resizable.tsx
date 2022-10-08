import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";

interface resizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}
const Resizable: React.FC<resizableProps> = (props) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const listener = () => {
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth- 5 < width) {
          setWidth(window.innerWidth - 5);
        }
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
      clearTimeout(timer);
    };
  }, [width]);

  let resizableBoxProps: ResizableBoxProps;
  if (props.direction === "vertical") {
    resizableBoxProps = {
      width: Infinity,
      height: 300,
      minConstraints: [Infinity, 30],
      maxConstraints: [Infinity, innerHeight * 0.9],
      resizeHandles: ["s"],
    };
  } else {
    resizableBoxProps = {
      className: "resize-horizontal",
      width,
      height: Infinity,
      minConstraints: [5, Infinity],
      maxConstraints: [innerWidth - 5, Infinity],
      resizeHandles: ["e"],
      onResizeStop(_, data) {
        setWidth(data.size.width);
      },
    };
  }
  return <ResizableBox {...resizableBoxProps}>{props.children}</ResizableBox>;
};

export default Resizable;
