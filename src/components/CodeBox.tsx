import { Fragment, useEffect, useState } from "react";
import { bundler, startService } from "../utils/bundler";
import CodeRender from "./CodeRender";

const CodeBox: React.FC = () => {
  const [codeInput, setCodeInput] = useState<string>("");
  const [transformedOutput, setTransformedOutput] = useState<string>("");

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
      const result = await bundler(codeInput);
      setTransformedOutput(result.outputFiles![0].text);
  };

  useEffect(() => {
    startService();
  }, []);

  const textareaChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setCodeInput(event.target.value);
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <textarea value={codeInput} onChange={textareaChangeHandler}></textarea>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <CodeRender transpiled={transformedOutput} />
    </Fragment>
  );
};

export default CodeBox;
