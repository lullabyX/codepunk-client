import { Fragment, useEffect, useRef, useState } from "react";
import { bundler, startService } from "../utils/bundler";

const CodeBox: React.FC = () => {
  const [codeInput, setCodeInput] = useState<string>("");

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const html = `
  <html lang="en">
  <head>
    <title>Sandbox</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
        window.addEventListener(
          "message",
          (event) => {
            try{
              eval(event.data)
            } catch (error) {
              document.getElementById("root").innerHTML =
                '<div style="color: red;"><h3>Runtime Error</h3>' + error + '</div>';
              console.error(error);
            }
          },
          false
        );
      </script>
  </body>
  </html>
  `;

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    iframeRef.current!.srcdoc = html;
    const result = await bundler(codeInput);
    const code = result.outputFiles![0].text;
    iframeRef.current!.contentWindow?.postMessage(code, "*");
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
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      ></iframe>
    </Fragment>
  );
};

export default CodeBox;
