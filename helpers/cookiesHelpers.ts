"use server";

import { cookies } from "next/headers";
import { deleteCookie, getCookie } from "cookies-next";

const getAuthenticationCookies = (): {
  sessionId: string;
  accountId: number;
} => {
  return {
    sessionId: getCookie("sessionId", { cookies })?.toString() ?? "",
    accountId: parseInt(getCookie("accountId", { cookies }) ?? "0"),
  };
};

const deleteAuthenticationCookies = () => {
  deleteCookie("sessionId", { cookies });
  deleteCookie("accountId", { cookies });
};

export { getAuthenticationCookies, deleteAuthenticationCookies };
