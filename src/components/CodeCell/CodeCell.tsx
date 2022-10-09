import { useState } from "react";
import { bundler } from "../../bundler/bundler";
import "../../cyberpunk.css";
import Resizable from "../Resizable/Resizable";
import classes from "./CodeCell.module.css";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

const CodeCell: React.FC = () => {
  const [code, setCode] = useState<{ code: string; error: string }>({
    code: "",
    error: "",
  });

  const rawCodeBundler = async (rawCode: string) => {
    try {
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
    <Resizable direction="vertical">
      <div className={`cyberpunk ${classes.codecell}`}>
        <Resizable direction="horizontal">
          <CodeEditor
            onBundle={rawCodeBundler}
            onPrettierError={prettierErrorHandler}
          />
        </Resizable>
        <Preview message={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
