"use client";

import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import { useAuthentication } from "@/context/Authentication.context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import styles from "./HeaderAuth.module.scss";

const HeaderAuth = () => {
  const {
    login,
    logout,
    connectWithTDB,
    requestToken,
    isLoggedIn,
    accountData,
  } = useAuthentication();
  const router = useRouter();
  const pathname = usePathname();
  const avatarPath = accountData?.avatar?.tmdb?.avatar_path;

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
    <div className={styles["header-auth"]}>
      {!requestToken && (
        <button
          className={styles["header-auth__connect-button"]}
          onClick={connectWithTDB}
        >
          Connect with TDB
        </button>
      )}
      {isLoggedIn && (
        <Link href="/profile">
          <ProfileAvatar avatarPath={avatarPath} />
        </Link>
      )}
      {requestToken && (
        <button
          className={styles["header-auth__login-button"]}
          onClick={isLoggedIn ? handleLogout : handleLogin}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      )}
    </div>
  );
};

export default HeaderAuth;
