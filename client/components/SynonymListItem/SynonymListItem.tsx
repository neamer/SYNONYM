import React from "react";
import { playfairDisplay } from "../../constants/fonts";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import Word from "../../types/Word";

import styles from "./SynonymListItem.module.css";

type Props = {
  synonym: Word;
  index: number;
};

const SynonymListItem = ({ synonym, index }: Props) => {
  return (
    <div
      className={
        styles.synonym + (index === 0 ? " " + styles.firstSynonym : "")
      }
    >
      <div className={styles.synonymText + " " + playfairDisplay.className}>
        {capitalizeFirstLetter(synonym.text)}
      </div>{" "}
      <div className={styles.synonymSeparator}>•</div>{" "}
      <div className={styles.synonymDescription}>{synonym.description}</div>{" "}
    </div>
  );
};

export default SynonymListItem;
