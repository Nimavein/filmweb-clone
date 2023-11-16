"use client";

import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { navbarLinks } from "@/helpers/navbarLinks";
import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { MenuItem, NavbarLink } from "@/types/types";
import { HomeFilled, UserOutlined } from "@ant-design/icons";
import NavbarSearch from "./NavbarSearch/NavbarSearch";
import Button from "@/components/Button/Button";
import { useAuthentication } from "@/context/Authentication.context";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [current, setCurrent] = useState(navbarLinks.home.key);
  const { login, logout, connectWithTDB, requestToken, isLoggedIn } = useAuthentication();
  const router = useRouter();
  const pathname = usePathname();

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

  const createLink = (link: NavbarLink) => <Link href={link.path}>{link.name}</Link>;

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
    getNavbarItem(createLink(navbarLinks.rankings), navbarLinks.rankings.key),
    getNavbarItem(createLink(navbarLinks.vod), navbarLinks.vod.key),
  ];

  const handleLogout = async () => {
    await logout();
    if (pathname.includes("/profile")) {
      router.push("/");
    }
  };

  const handleLogin = () => {
    login();
  };

  return (
    <nav className={styles["main-navbar"]}>
      <div className={styles["main-navbar__top"]}>
        <NavbarSearch />
        <div className={styles["main-navbar__auth"]}>
          {!requestToken && <Button onClick={connectWithTDB}>Connect with TDB</Button>}
          {isLoggedIn && (
            <Link href="/profile">
              <UserOutlined style={{ color: "white" }} />
            </Link>
          )}
          {requestToken && (
            <Button onClick={isLoggedIn ? handleLogout : handleLogin}>
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
          )}
        </div>
      </div>
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
