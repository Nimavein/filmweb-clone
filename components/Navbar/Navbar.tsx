import { navbarLinks } from "@/helpers/navbarLinks";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav>
        <ul>
          {navbarLinks.map((link, index) => {
            return (
              <Link href={link.path} key={index}>
                <li>{link.name}</li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
