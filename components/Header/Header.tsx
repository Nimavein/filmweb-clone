import React from "react";
import styles from "./Header.module.scss";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  return (
    <header className={styles["main-header"]}>
      <Navbar />
    </header>
  );
};

export default Header;
