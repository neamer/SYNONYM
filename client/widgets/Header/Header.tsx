import React from "react";
import Image from "next/image";

import styles from "./Header.module.css";

import LogoSVG from "../../public/img/synonym-logo.svg";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className={styles.background}>
      <Link href="/">
        <Image src={LogoSVG} alt="App logo." height={15}></Image>
      </Link>
    </div>
  );
};

export default Header;
