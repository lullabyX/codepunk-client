import { useEffect, useRef } from "react";
import html from "../../utils/iframeHtml";
import './Preview.css'

interface previewProps {
  message: {
    code: string,
    error: string,
  }
}
const Preview: React.FC<previewProps> = ({ message }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {code, error} = message;
  useEffect(() => {
    iframeRef.current!.srcdoc = html;
    const timer = setTimeout(() => {
      iframeRef.current!.contentWindow?.postMessage({code, error}, "*");
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [code, error]);

  return (
    <div className="preview-wrapper">
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
