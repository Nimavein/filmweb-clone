"use client";

import React from "react";
import styles from "./Navbar.module.scss";
import { navbarLinks } from "@/helpers/navbarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className={styles["main-navbar"]}>
      {Object.values(navbarLinks).map((link) => (
        <Link
          className={`${styles["main-navbar__link"]} ${
            pathname === link.path ? styles["main-navbar__link--active"] : ""
          }`}
          key={link.key}
          href={link.path}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
