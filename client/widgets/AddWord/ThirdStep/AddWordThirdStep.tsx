import React from "react";
import SynonymActionItem, {
  ActionType,
} from "../../../components/SynonymActionItem/SynonymActionItem";
import { playfairDisplay } from "../../../constants/fonts";
import capitalizeFirstLetter from "../../../helpers/capitalizeFirstLetter";
import WordInsert from "../../../types/WordInsertRequest";

import styles from "./AddWordThirdStep.module.css";

type Props = {
  word: WordInsert;
};

const AddWordThirdStep = ({ word }: Props) => {
  return (
    <div className={styles.stepWrapper}>
      <div className={styles.mainText + " " + playfairDisplay.className}>
        {capitalizeFirstLetter(word.text)}
      </div>
      <div className={styles.mainDescription}>{word.description}</div>
      <div className={styles.separator}></div>
      <div className={styles.synonymsHeading}>
        Synonyms for{" "}
        <span className={playfairDisplay.className}>
          {capitalizeFirstLetter(word.text)}
        </span>
        <div className={styles.synonymsSection}>
          {word.synonyms.map((synonym, index) => (
            <SynonymActionItem
              key={index}
              synonym={synonym}
              index={index}
              onClick={() => null}
              type={ActionType.NoAction}
            ></SynonymActionItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddWordThirdStep;
