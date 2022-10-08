import { useState } from "react";
import { bundler } from "../../bundler/bundler";
import "../../cyberpunk.css";
import Resizable from "../Resizable/Resizable";
import classes from "./CodeCell.module.css";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

const CodeCell: React.FC = () => {
  const [code, setCode] = useState<string>("");

  const rawCodeBundler = async (rawCode: string) => {
    const result = await bundler(rawCode);
    setCode(result.outputFiles![0].text);
  };

  return (
    <Resizable direction="vertical">
      <div className={`cyberpunk ${classes.codecell}`}>
        <Resizable direction="horizontal">
          <CodeEditor onBundle={rawCodeBundler} />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
