import React, { useState } from "react";
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

const SliderMobile = ({
  itemWidth,
  gapWidth,
  noOfItems,
  position,
  setPosition,
  children,
}: Props) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  function GetSliderTransform() {
    return (itemWidth + gapWidth) * (position - 1);
  }

  function next() {
    if (noOfItems > position) {
      setPosition(position + 1);
    }
  }

  function back() {
    if (position !== 1) {
      setPosition(position - 1);
    }
  }
  if (process.browser) {
    const minSwipeDistance = 50;

    ontouchstart = (e: any) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };

    ontouchmove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

    ontouchend = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      if (isLeftSwipe || isRightSwipe)
        console.log("swipe", isLeftSwipe ? "left" : "right");

      if (isRightSwipe) {
        back();
      } else if (isLeftSwipe) {
        next();
      }
    };
  }
  return (
    <div className={styles.sliderWrapper}>
      <div
        className={styles.contentWrapper}
        style={{ transform: "translateX(-" + GetSliderTransform() + "px)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default SliderMobile;
