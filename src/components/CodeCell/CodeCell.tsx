import { Fragment, useState } from "react";
import { bundler } from "../../bundler/bundler";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

const CodeCell: React.FC = () => {
  const [code, setCode] = useState<string>("");

  const rawCodeBundler = async (rawCode: string) => {
    const result = await bundler(rawCode);
    setCode(result.outputFiles![0].text);
  };

  return (
    <Fragment>
      <CodeEditor onBundle={rawCodeBundler} />
      <Preview code={code} />
    </Fragment>
  );
};

export default CodeCell;
