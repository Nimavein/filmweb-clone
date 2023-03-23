import React from "react";
import styles from "./Navbar.module.scss";
import { navbarLinks } from "@/helpers/navbarLinks";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={styles["main-navbar"]}>
      <ul className={styles["main-navbar__links-list"]}>
        {navbarLinks.map((link, index) => (
          <li className={styles["main-navbar__link"]} key={index}>
            <Link href={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
