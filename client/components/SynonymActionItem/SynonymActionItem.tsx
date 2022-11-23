import axios from "axios";
import React, { useState } from "react";
import { playfairDisplay } from "../../constants/fonts";
import HttpConfig from "../../constants/HttpConfig";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import WordSynonyms from "../../types/WordSynonyms";

import styles from "./SynonymActionItem.module.css";

export enum ActionType {
  Add,
  Remove,
  NoAction,
}

type Props = {
  synonym: WordSynonyms;
  index: number;
  onClick: () => void;
  type: ActionType;
};

const SynonymActionItem = ({ synonym, index, onClick, type }: Props) => {
  return (
    <div
      className={styles.mainWrapper + (index === 0 ? " " + styles.first : "")}
    >
      <div className={styles.mainSynonym} onClick={onClick}>
        <div className={styles.Text + " " + playfairDisplay.className}>
          {capitalizeFirstLetter(synonym.text)}
        </div>{" "}
        <div className={styles.Separator}>•</div>{" "}
        <div className={styles.Description}>{synonym.description}</div>{" "}
        {type === ActionType.Add ? (
          <div className={styles.add}></div>
        ) : type === ActionType.Remove ? (
          <div className={styles.close}></div>
        ) : (
          ""
        )}
      </div>
      {synonym.synonyms?.length ? (
        <>
          <div className={styles.treeRoot}></div>
          <div className={styles.synonymsWrapper}>
            {synonym.synonyms?.map((element, index) => (
              <div className={styles.synonym} key={index}>
                <div className={index !== 0 ? styles.treeBranch : ""}></div>
                <div className={styles.Text + " " + playfairDisplay.className}>
                  {capitalizeFirstLetter(element.text)}
                </div>{" "}
                <div className={styles.Separator}>•</div>{" "}
                <div className={styles.Description}>{element.description}</div>
              </div>
            ))}
          </div>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SynonymActionItem;
