import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./Slider.module.css";

import ArrowBackSVG from "../../public/img/arrow-back.svg";
import ArrowForwardSVG from "../../public/img/arrow-forward.svg";

type Props = {
  itemWidth: number;
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  gapWidth: number;
  noOfItems: number;
  children: React.ReactNode;
};

const Slider = ({
  itemWidth,
  gapWidth,
  noOfItems,
  position,
  setPosition,
  children,
}: Props) => {
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    setShowNext(position < noOfItems);

    return () => {};
  }, [position, noOfItems]);

  function GetSliderTransform() {
    return (itemWidth + gapWidth) * (position - 1);
  }

  function next() {
    if (noOfItems > position - 1) {
      setPosition(position + 1);
    }
  }

  function back() {
    if (position !== 1) {
      setPosition(position - 1);
    }
  }

  return (
    <div className={styles.sliderWrapper}>
      <div
        className={styles.contentWrapper}
        style={{ transform: "translateX(-" + GetSliderTransform() + "px)" }}
      >
        {children}
      </div>
      {position !== 1 ? (
        <div className={styles.backButton} onClick={back}>
          <Image src={ArrowBackSVG} alt="Back Arrow" height={30}></Image>
        </div>
      ) : (
        ""
      )}

      {showNext ? (
        <div className={styles.nextButton} onClick={next}>
          <Image src={ArrowForwardSVG} alt="Forward Arrow" height={30}></Image>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Slider;
