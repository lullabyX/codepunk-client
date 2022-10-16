import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";

interface resizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
  onWindowWithUpdate?: (newWidth: number) => void;
}
const Resizable: React.FC<resizableProps> = ({
  direction,
  children,
  onWindowWithUpdate,
}) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.6);
  const [widthScale, setWidthScale] = useState(0.6);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const listener = () => {
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (onWindowWithUpdate) {
          onWindowWithUpdate(window.innerWidth);
        }
        if (window.innerWidth - 20 < width) {
          setWidth(window.innerWidth * widthScale - 20);
        } else setWidth(window.innerWidth * widthScale);
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
      clearTimeout(timer);
    };
  }, [width, widthScale, onWindowWithUpdate]);

  let resizableBoxProps: ResizableBoxProps;
  if (direction === "vertical") {
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
      maxConstraints: [innerWidth - 35, Infinity],
      resizeHandles: ["e"],
      onResizeStop(_, data) {
        setWidthScale(data.size.width / innerWidth);
        setWidth(data.size.width);
      },
    };
  }
  return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
