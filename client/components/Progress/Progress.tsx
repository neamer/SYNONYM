import React from "react";

import styles from "./Progress.module.css";

export class ProgressItem {
  checked: boolean;
  action: () => void;

  constructor(checked: boolean, action: () => void) {
    this.checked = checked;
    this.action = action;
  }
}

type Props = {
  items: ProgressItem[];
};

const Progress = ({ items }: Props) => {
  return (
    <div className={styles.mainWrapper}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={
              styles.position +
              (item.checked ? " " + styles.positionChecked : "")
            }
            onClick={item.action}
          ></div>
          {index !== items.length - 1 ? (
            <div className={styles.line}></div>
          ) : (
            ""
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Progress;
