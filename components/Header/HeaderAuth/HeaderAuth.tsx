"use client";

import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import { useAuthentication } from "@/context/Authentication.context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { removeStorageItem } from "@/helpers/localStorageHelpers";

import styles from "./HeaderAuth.module.scss";

const HeaderAuth = () => {
  const {
    login,
    logout,
    connectWithTDB,
    requestToken,
    isLoggedIn,
    accountData,
    setAuthState,
  } = useAuthentication();
  const router = useRouter();
  const pathname = usePathname();
  const avatarPath = accountData?.avatar?.tmdb?.avatar_path;

  useEffect(() => {
    if (!isLoggedIn) {
      removeStorageItem("requestToken");
      setAuthState((prevState) => ({ ...prevState, requestToken: "" }));
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    if (pathname.includes("/profile")) {
      router.push("/", { scroll: false });
    }
  };

  const handleLogin = () => {
    login();
  };

  return (
    <div className={styles["header-auth"]}>
      {!requestToken && !isLoggedIn && (
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
      {requestToken && !isLoggedIn && (
        <button
          className={styles["header-auth__login-button"]}
          onClick={handleLogin}
        >
          Login
        </button>
      )}
      {isLoggedIn && (
        <button
          className={styles["header-auth__login-button"]}
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default HeaderAuth;
