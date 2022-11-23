import React from "react";

import styles from "./GhostButton.module.css";

type Props = {
  text: string;
  reactive?: boolean;
  onClick: () => void;
};

function GhostButton({ text, reactive, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={styles.baseStyle + (reactive ? " " + styles.reactive : "")}
    >
      {text}
    </div>
  );
}

export default GhostButton;
