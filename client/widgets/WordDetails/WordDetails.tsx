import React from "react";
import SynonymListItem from "../../components/SynonymListItem/SynonymListItem";
import { roboto, playfairDisplay } from "../../constants/fonts";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import WordSynonyms from "../../types/WordSynonyms";

import styles from "./WordDetails.module.css";

export enum WordDetailsSize {
  standard,
  compact,
}

type Props = {
  word: WordSynonyms;
  size: WordDetailsSize;
};

const WordDetails = ({ word, size = WordDetailsSize.standard }: Props) => {
  return (
    <div style={{ width: size == WordDetailsSize.standard ? "100vw" : "100%" }}>
      <div className={styles.mainText + " " + playfairDisplay.className}>
        {capitalizeFirstLetter(word.text)}
      </div>
      <div className={styles.mainDescription + " " + roboto.className}>
        {word.description}
      </div>
      <div className={styles.separator}></div>
      <div className={styles.synonymsHeading + " " + roboto.className}>
        Synonyms for{" "}
        <span className={playfairDisplay.className}>
          {capitalizeFirstLetter(word.text)}
        </span>
        <div className={styles.synonymsSection}>
          {word.synonyms.map((synonym, index) => (
            <SynonymListItem
              synonym={synonym}
              index={index}
              key={index}
            ></SynonymListItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordDetails;
