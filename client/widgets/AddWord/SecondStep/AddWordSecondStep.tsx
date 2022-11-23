import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import SynonymActionItem, {
  ActionType,
} from "../../../components/SynonymActionItem/SynonymActionItem";
import HttpConfig from "../../../constants/HttpConfig";
import { Validator } from "../../../helpers/Validator/Validator";
import { PagedList } from "../../../types/PagedList";
import WordSynonyms from "../../../types/WordSynonyms";

import styles from "./AddWordSecondStep.module.css";

type Props = {
  synonyms: WordSynonyms[];
  setSynonyms: (data: WordSynonyms[]) => void;
};

const AddWordSecondStep = ({ synonyms, setSynonyms }: Props) => {
  const [addMode, setAddMode] = useState(false);

  const [filter, setFilter] = useState("");
  const [results, setResults] = useState(new PagedList<WordSynonyms>());

  useEffect(() => {
    loadPage(1);

    return () => {};
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    loadPage(1, event.target.value);
  };

  const loadPage = (pageNumber: number, _filter?: string) => {
    axios
      .get<PagedList<WordSynonyms>>(
        HttpConfig.endPoints.search(
          _filter != undefined ? _filter : filter,
          25,
          pageNumber
        )
      )
      .then((res) => {
        setResults(res.data);
      })
      .catch(function (error) {
        alert("Unable to load words!");
      });
  };

  const addSynonym = (item: WordSynonyms) => {
    if (Validator.validateNewSynonym(synonyms, item)) {
      axios
        .get<WordSynonyms>(HttpConfig.endPoints.get(item.id))
        .then((res) => {
          var newSynonyms = [...synonyms];
          newSynonyms.push(res.data);
          setSynonyms(newSynonyms);
          setAddMode(false);
        })
        .catch(function (error) {
          alert("Unable to add synonym!");
        });
    } else {
      alert("The chosen synonym was already added (directly or transitively)!");
    }
  };

  const removeSynonym = (item: WordSynonyms) => {
    if (confirm(`Remove synonym "${item.text}"`)) {
      var newSynonyms = [...synonyms];
      newSynonyms = newSynonyms.filter((element) => element.id !== item.id);
      setSynonyms(newSynonyms);
      setAddMode(false);
    }
  };

  return (
    <div className={styles.stepWrapper}>
      {addMode ? (
        <div className={styles.addWrapper}>
          <div className={styles.label} onClick={() => setAddMode(false)}>
            BACK TO LIST
          </div>
          <input
            className={styles.baseInput + " " + styles.baseColor}
            type="text"
            name="input"
            id="input"
            placeholder="Enter search criteria"
            value={filter}
            onChange={handleInput}
          />
          <div className={styles.listContainer}>
            {results.data?.map((element, index) => (
              <SynonymActionItem
                synonym={element}
                index={index}
                key={index}
                onClick={() => addSynonym(element)}
                type={ActionType.Add}
              ></SynonymActionItem>
            ))}
          </div>
          <Pagination
            navigation={results.navigation}
            loadPage={loadPage}
          ></Pagination>
        </div>
      ) : (
        <div className={styles.viewWrapper}>
          <div className={styles.label} onClick={() => setAddMode(true)}>
            ADD NEW SYNONYM
          </div>

          {synonyms.length !== 0 ? (
            <div className={styles.listContainer}>
              {synonyms.map((element, index) => (
                <SynonymActionItem
                  synonym={element}
                  index={index}
                  key={index}
                  onClick={() => removeSynonym(element)}
                  type={ActionType.Remove}
                ></SynonymActionItem>
              ))}{" "}
            </div>
          ) : (
            <div
              className={styles.listContainer + " " + styles.emptylistContainer}
              onClick={() => setAddMode(true)}
            >
              <div className={styles.noItems}>
                Added synonyms will appear here
              </div>
            </div>
          )}
        </div>
      )}

      <div className="loading-wrapper"></div>
    </div>
  );
};

export default AddWordSecondStep;
