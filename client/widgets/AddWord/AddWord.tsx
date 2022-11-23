import React, { useState } from "react";
import Image from "next/image";

import styles from "./AddWord.module.css";

import CloseSVG from "../../public/img/close-large.svg";
import BackArrowDark from "../../public/img/back-arrow-dark.svg";
import BackArrowLight from "../../public/img/back-arrow-light.svg";
import { playfairDisplay } from "../../constants/fonts";

import Progress, { ProgressItem } from "../../components/Progress/Progress";
import AddWordFirstStep from "./FirstStep/AddWordFirstStep";
import WordSynonyms from "../../types/WordSynonyms";
import GhostButton from "../../components/Button/GhostButton";
import AddWordSecondStep from "./SecondStep/AddWordSecondStep";
import WordInsert, { generateRequest } from "../../types/WordInsertRequest";
import AddWordThirdStep from "./ThirdStep/AddWordThirdStep";
import HttpConfig from "../../constants/HttpConfig";
import axios from "axios";
import { useRouter } from "next/router";

class Step {
  number: number;
  valid: boolean;
  title: string;

  constructor(number: number, valid: boolean, title: string) {
    this.number = number;
    this.valid = valid;
    this.title = title;
  }
}

type Props = {
  closeOverlay: () => void;
};

const AddWord = ({ closeOverlay }: Props) => {
  const [step, setStep] = useState(1);
  const [stepData, setStepData] = useState([
    new Step(1, false, "Define Word"),
    new Step(2, true, "Add Synonyms"),
    new Step(3, true, "Summary"),
  ]);

  const [data, setData] = useState(new WordInsert());

  const router = useRouter();

  const jumpToStep = (target: number) => {
    if (target < step && target > 0) {
      setStep(target);
    }
  };

  const nextStep = () => {
    if (step !== 3 && stepData[0].valid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step !== 1) {
      setStep(step - 1);
    }
  };

  function handleWordChange(event: React.ChangeEvent<HTMLInputElement>) {
    var newData = { ...data };
    newData.text = event.target.value;
    setData(newData);
  }

  function handleDescChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    var newData = { ...data };
    newData.description = event.target.value;
    setData(newData);
  }

  function handleSynonymChange(synonyms: WordSynonyms[]) {
    var newData = { ...data };
    newData.synonyms = synonyms;
    setData(newData);
  }

  function setFirstStepValidity(option: boolean) {
    var newStepData = [...stepData];
    newStepData[0].valid = option;
    setStepData(newStepData);
  }

  function submitData() {
    axios
      .post<WordSynonyms>(HttpConfig.serverAddress, generateRequest(data))
      .then(function (response) {
        router.push(`word/${response.data.id}`);
      })
      .catch(function (error) {
        alert("Error adding word!");
      });
  }

  return (
    <div className={styles.shadow}>
      <div className={styles.close} onClick={closeOverlay}></div>
      <div className={styles.mainContainer}>
        <div className={styles.heading}>
          <div className={styles.title + " " + playfairDisplay.className}>
            Add Word
          </div>
          <div className={styles.line}></div>
          <div className={styles.stepTitle}>{stepData[step - 1].title}</div>
          <Progress
            items={stepData.map(
              (element, index) =>
                new ProgressItem(element.number <= step, () =>
                  jumpToStep(element.number)
                )
            )}
          ></Progress>

          <main className={styles.stepContainer}>
            {step === 1 ? (
              <AddWordFirstStep
                word={data.text}
                description={data.description}
                handleWordChange={handleWordChange}
                handleDescChange={handleDescChange}
                setValidity={setFirstStepValidity}
              ></AddWordFirstStep>
            ) : step === 2 ? (
              <AddWordSecondStep
                synonyms={data.synonyms}
                setSynonyms={handleSynonymChange}
              ></AddWordSecondStep>
            ) : (
              <AddWordThirdStep word={data}></AddWordThirdStep>
            )}
          </main>

          <div className={styles.buttonsSection}>
            {step === 1 ? (
              <div
                className={styles.backButton + " " + styles.backButtonInactive}
              >
                <Image
                  src={BackArrowLight}
                  alt={"Back arrow"}
                  height={17}
                ></Image>
                Back
              </div>
            ) : (
              <div
                className={styles.backButton + " " + styles.backButtonActive}
                onClick={prevStep}
              >
                <Image
                  src={BackArrowDark}
                  alt={"Back arrow"}
                  height={17}
                ></Image>
                Back
              </div>
            )}

            {step === 3 ? (
              <GhostButton text="Submit" onClick={submitData}></GhostButton>
            ) : (
              <GhostButton text="Next step" onClick={nextStep}></GhostButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWord;
