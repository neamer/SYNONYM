import React, { useState } from "react";
import { roboto } from "../../../constants/fonts";
import { FieldType } from "../../../helpers/Validator/FieldType";
import { Validator } from "../../../helpers/Validator/Validator";

import styles from "./AddWordFirstStep.module.css";

class Errors {
  word: string[];
  description: string[];

  constructor() {
    this.word = [];
    this.description = [];
  }
}

type Props = {
  word: string;
  description: string;
  handleWordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setValidity: (option: boolean) => void;
};

const AddWordFirstStep = ({
  word,
  description,
  handleWordChange,
  handleDescChange,
  setValidity,
}: Props) => {
  const [errors, setErrors] = useState(new Errors());

  const onWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newErrors = { ...errors };
    newErrors.word = Validator.validateField(
      FieldType.Word,
      event.target.value
    );
    setErrors(newErrors);
    handleWordChange(event);
    setValidity(calcValidity(newErrors));
  };

  const onDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    var newErrors = { ...errors };
    newErrors.description = Validator.validateField(
      FieldType.Description,
      event.target.value
    );
    setErrors(newErrors);
    handleDescChange(event);
    setValidity(calcValidity(newErrors));
  };

  const calcValidity = (errorList: Errors): boolean =>
    errorList.word.length === 0 && errorList.description.length === 0;

  return (
    <div>
      <div className={styles.label}>
        Word
        {errors.word.map((element) => (
          <>
            <span className={styles.labelSeparator}>•</span>
            <span className={styles.error}>{element}</span>
          </>
        ))}
      </div>
      <input
        className={styles.baseInput + " " + styles.baseColor}
        type="text"
        name="word"
        id="word"
        value={word}
        onChange={onWordChange}
      />
      <div className={styles.label}>
        Short description
        {errors.description.map((element) => (
          <>
            <span className={styles.labelSeparator}>•</span>
            <span className={styles.error}>{element}</span>
          </>
        ))}
      </div>
      <textarea
        name="description"
        id="description"
        cols={30}
        rows={5}
        value={description}
        onChange={onDescChange}
        className={
          styles.baseInput + " " + roboto.className + " " + styles.baseColor
        }
      ></textarea>
    </div>
  );
};

export default AddWordFirstStep;
