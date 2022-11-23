import React from "react";

import styles from "./SearchBar.module.css";

import { roboto } from "../../constants/fonts";

type Props = {
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reactive?: boolean;
};

function SearchBar({ value, placeholder, onChange, reactive }: Props) {
  return (
    <div
      className={styles.mainWrapper + (reactive ? " " + styles.reactive : "")}
    >
      <input
        className={
          styles.baseStyle + " " + styles.baseColor + " " + roboto.className
        }
        itemID="search-bar"
        type="text"
        placeholder={placeholder}
        name=""
        id=""
        value={value}
        onChange={onChange}
      />
      <button className={styles.button + " " + roboto.className}>SEARCH</button>
    </div>
  );
}

export default SearchBar;
