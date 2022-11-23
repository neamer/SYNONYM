import React from "react";
import { PagedListNavigation } from "../../types/PagedList";

import styles from "./Pagination.module.css";

type Props = {
  navigation: PagedListNavigation;
  loadPage: (pageNumber: number) => void;
};

const Pagination = ({ navigation, loadPage }: Props) => {
  const next = () => {
    if (navigation.hasNext) {
      loadPage(navigation.currentPage + 1);
    }
  };

  const previous = () => {
    if (navigation.hasPrevious) {
      loadPage(navigation.currentPage - 1);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div
        className={
          styles.arrowLeft +
          (!navigation.hasPrevious ? " " + styles.disabledArrow : "")
        }
        onClick={previous}
      ></div>
      <div className={styles.pageNumber}>{navigation.currentPage}</div>
      <div
        className={
          styles.arrowRight +
          (!navigation.hasNext ? " " + styles.disabledArrow : "")
        }
        onClick={next}
      ></div>
    </div>
  );
};

export default Pagination;
