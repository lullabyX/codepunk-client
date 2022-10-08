import { useEffect, useRef } from "react";
import html from "../../utils/iframeHtml";

interface previewProps {
  code: string;
}
const Preview: React.FC<previewProps> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    iframeRef.current!.srcdoc = html;
    const timer = setTimeout(() => {
      iframeRef.current!.contentWindow?.postMessage(code, "*");
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [code]);

  return (
    <div>
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      ></iframe>
    </div>
  );
};

export default Preview;
