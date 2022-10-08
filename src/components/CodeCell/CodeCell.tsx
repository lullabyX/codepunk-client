import { useState } from "react";
import { bundler } from "../../bundler/bundler";
import "../../cyberpunk.css";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

const CodeCell: React.FC = () => {
  const [code, setCode] = useState<string>("");

  const rawCodeBundler = async (rawCode: string) => {
    const result = await bundler(rawCode);
    setCode(result.outputFiles![0].text);
  };

  return (
    <div className="cyberpunk">
      <CodeEditor onBundle={rawCodeBundler} />
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
