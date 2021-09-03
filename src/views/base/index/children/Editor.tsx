import React, { FC } from "react";
import css from "styled-jsx/css";

const styles = css`
  .editor {
  }
`;

interface Props {
  [p: string]: any;
}

const Editor: FC<Props> = (props) => {
  return (
    <div className="editor">
      <style jsx>{styles}</style>
    </div>
  );
};

export default Editor;
