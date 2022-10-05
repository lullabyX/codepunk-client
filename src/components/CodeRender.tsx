const CodeRender: React.FC<{ transpiled: string }> = (props) => {
  return <pre>{props.transpiled}</pre>;
};

export default CodeRender;
