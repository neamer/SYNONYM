import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HttpConfig from "../../constants/HttpConfig";
import WordSynonyms from "../../types/WordSynonyms";

import styles from "./Lookup.module.css";

import Head from "next/head";
import Header from "../../widgets/Header/Header";
import WordDetails, {
  WordDetailsSize,
} from "../../widgets/WordDetails/WordDetails";
import Slider from "../../components/Slider/Slider";
import Progress, { ProgressItem } from "../../components/Progress/Progress";
import SliderMobile from "../../components/Slider/SliderMobile";

type Props = {
  words: WordSynonyms[];
};

const LookupResults = ({ words }: Props) => {
  const [position, setPosition] = useState(1);

  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : -1
  );

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleWindowSizeChange);
      }
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <div className={styles.container}>
      <Head>
        <title>Synonyms for {words[0].text} | SYNONYM</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <main className={styles.mainSection}>
        {isMobile ? (
          <SliderMobile
            position={position}
            setPosition={setPosition}
            itemWidth={typeof window !== "undefined" ? window.innerWidth : 1366}
            gapWidth={0}
            noOfItems={words.length}
          >
            {words.map((element, index) => (
              <div className={styles.sliderItemWrapper} key={index}>
                <WordDetails
                  word={element}
                  size={WordDetailsSize.standard}
                ></WordDetails>
              </div>
            ))}
          </SliderMobile>
        ) : (
          <Slider
            position={position}
            setPosition={setPosition}
            itemWidth={process.browser ? window.innerWidth : 1366}
            gapWidth={0}
            noOfItems={words.length}
          >
            {words.map((element, index) => (
              <div className={styles.sliderItemWrapper} key={index}>
                <WordDetails
                  word={element}
                  size={WordDetailsSize.standard}
                ></WordDetails>
              </div>
            ))}
          </Slider>
        )}

        <div className={styles.navigation}>
          <span>
            RESULT {position} of {words.length}{" "}
          </span>
          <Progress
            items={words.map(
              (element, index) =>
                new ProgressItem(index + 1 === position, () =>
                  setPosition(index + 1)
                )
            )}
          ></Progress>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const req = await fetch(
      HttpConfig.endPoints.lookup(context.params?.input as string)
    );
    const data = await req.json();

    return {
      props: { words: data },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

/*
export const getStaticProps: GetStaticProps = async (context) => {
  const req = await fetch(
    HttpConfig.endPoints.lookup(context.params?.input as string)
  );
  const data = await req.json();

  return {
    props: { words: data },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const req = await fetch(HttpConfig.endPoints.getAll());
  const data = await req.json();

  const paths = data.json().map((word: string) => {
    return { params: { input: word } };
  });

  return {
    paths,
    fallback: false,
  };
};
*/

export default LookupResults;
