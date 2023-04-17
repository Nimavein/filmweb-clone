import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  const links = [
    { label: "Link 1", url: "/" },
    { label: "Link 2", url: "/" },
    { label: "Link 3", url: "/" },
    { label: "Link 4", url: "/" },
  ];

  return (
    <footer role="contentinfo" className={styles["footer"]}>
      <nav aria-label="Footer navigation">
        <ul>
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>
        &copy; {new Date().getFullYear()} Site created using data from TMDB API by Michał Żygiel.
      </p>
    </footer>
  );
};

export default Footer;
