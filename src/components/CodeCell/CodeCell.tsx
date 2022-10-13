import { useState } from "react";
import { bundler } from "../../bundler/bundler";
import {Cell} from "../../store";
import Resizable from "../Resizable/Resizable";
import classes from "./CodeCell.module.css";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

interface CodeCellProps {
  id: Cell['id']
}

const CodeCell: React.FC<CodeCellProps> = ({id}) => {
  const [code, setCode] = useState<{ code: string; error: string }>({
    code: "",
    error: "",
  });

  const rawCodeBundler = async (rawCode: string) => {
    try {
      setCode({
        code: `document.getElementById("root").innerHTML =
          '<h3>Compiling...</h3>'`,
        error: "",
      });
      const result = await bundler(rawCode);
      setCode({
        code: result.outputFiles![0].text,
        error: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        setCode({
          code: "",
          error: error.message,
        });
      }
    }
  };

  const prettierErrorHandler = (error: string) => {
    setCode({
      code: "",
      error: error,
    });
  };

  return (
    <div style={{'marginBottom': '70px'}}>
      <Resizable direction="vertical">
        <div
          className={`${classes["cyberpunk-container"]} ${classes.codecell} `}
        >
          <Resizable direction="horizontal">
            <CodeEditor
              id={id}
              onBundle={rawCodeBundler}
              onPrettierError={prettierErrorHandler}
            />
          </Resizable>
          <Preview message={code} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
