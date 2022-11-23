import React from "react";

import styles from "./textInput.module.css";

import { roboto } from "../../constants/fonts";

type Props = {
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reactive?: boolean;
};

function TextInput({ value, placeholder, onChange, reactive }: Props) {
  return (
    <input
      className={
        styles.baseStyle +
        " " +
        styles.baseColor +
        " " +
        roboto.className +
        (reactive ? " " + styles.reactive : "")
      }
      width={900}
      type="text"
      placeholder={placeholder}
      name=""
      id=""
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;
