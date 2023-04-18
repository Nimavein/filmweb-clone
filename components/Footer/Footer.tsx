import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { navbarLinks } from "@/helpers/navbarLinks";

const Footer = () => {
  const links = [
    { label: "popular movies", url: navbarLinks.movies.popular.path },
    { label: "popular tv series", url: navbarLinks.tvSeries.popular.path },
    { label: "popular people", url: navbarLinks.people.popular.path },
    { label: "movies ranking", url: navbarLinks.movies.ranking.path },
  ];

  return (
    <footer role="contentinfo" className={styles["footer"]}>
      <nav aria-label="Footer navigation">
        <ul className={styles["footer__links"]}>
          {links.map((link) => (
            <li className={styles["footer__link"]} key={link.label}>
              <Link href={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>
        &copy; {new Date().getFullYear()} Site created by Michał Żygiel using data from TMDB API.
      </p>
    </footer>
  );
};

export default Footer;
