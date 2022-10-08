import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";

interface resizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}
const Resizable: React.FC<resizableProps> = (props) => {
  const resizableBoxProps: ResizableBoxProps = {
    width: Infinity,
    height: 500,
    resizeHandles: ["s"],
  };
  return <ResizableBox {...resizableBoxProps}>{props.children}</ResizableBox>;
};

export default Resizable;
