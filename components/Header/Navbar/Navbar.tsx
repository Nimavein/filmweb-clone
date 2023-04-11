import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { navbarLinks } from "@/helpers/navbarLinks";
import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { MenuItem, NavbarLink } from "@/types/types";
import { HomeFilled } from "@ant-design/icons";

const Navbar = () => {
  const [current, setCurrent] = useState("mail");

  const getNavbarItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };

  const createLink = (link: NavbarLink) => (
    <Link href={link.path}>{link.name}</Link>
  );

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const menuItems: MenuProps["items"] = [
    getNavbarItem(createLink(navbarLinks.home), navbarLinks.home.key, <HomeFilled />),
    getNavbarItem(
      navbarLinks.movies.main.name,
      navbarLinks.movies.main.key,
      null,
      Object.values(navbarLinks.movies).map((link) => getNavbarItem(createLink(link), link.key))
    ),
    getNavbarItem(
      navbarLinks.tvSeries.main.name,
      navbarLinks.tvSeries.main.key,
      null,
      Object.values(navbarLinks.tvSeries).map((link) => getNavbarItem(createLink(link), link.key))
    ),
    getNavbarItem(
      navbarLinks.people.main.name,
      navbarLinks.people.main.key,
      null,
      Object.values(navbarLinks.people).map((link) => getNavbarItem(createLink(link), link.key))
    ),
  ];

  return (
    <nav className={styles["main-navbar"]}>
      <Menu
        theme="dark"
        className={styles["main-navbar__list"]}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItems}
      />
    </nav>
  );
};

export default Navbar;
