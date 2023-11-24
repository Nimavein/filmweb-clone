import React from "react";
import Navbar from "./Navbar/Navbar";
import HeaderAuth from "./HeaderAuth/HeaderAuth";

import styles from "./Header.module.scss";
import HeaderSearch from "./HeaderSearch/HeaderSearch";

const Header = () => {
  return (
    <header className={styles["main-header"]}>
      <div className={styles["main-header__content"]}>
        <div className={styles["main-header__top"]}>
          <HeaderSearch />
          <HeaderAuth />
        </div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
