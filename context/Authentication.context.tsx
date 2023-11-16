"use client";

/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, createContext, useContext, useState } from "react";
import {
  getRequestToken,
  createNewSession,
  getAccountData,
  deleteSession,
} from "@/apiHelpers";
import {
  setStorageItem,
  removeStorageItem,
  getStorageItem,
} from "@/helpers/localStorageHelpers";

interface AuthStateType {
  requestToken: string | null;
  accountId: number | null;
  sessionId: string | null;
}

interface AuthenticationContextType extends AuthStateType {
  connectWithTDB: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isAuthorized: boolean;
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  requestToken: null,
  accountId: null,
  sessionId: null,
  connectWithTDB: async () => {},
  login: async () => {},
  logout: async () => {},
  isLoggedIn: false,
  isAuthorized: false,
});

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState(() => ({
    requestToken: getStorageItem("requestToken"),
    accountId: parseInt(getStorageItem("accountId")),
    sessionId: getStorageItem("sessionId"),
  }));

  const updateAuthState = (updates: {
    requestToken?: string;
    sessionId?: string;
    accountId?: number;
  }) => {
    setAuthState((prevState) => ({ ...prevState, ...updates }));
  };

  const connectWithTDB = async () => {
    const { request_token: token } = (await getRequestToken()) || {};
    if (token) {
      setStorageItem("requestToken", token);
      updateAuthState({ requestToken: token });
      window.open(`https://www.themoviedb.org/authenticate/${token}`);
    }
  };

  const login = async () => {
    const { requestToken } = authState;
    if (!requestToken) return;

    const session = await createNewSession(requestToken);
    const sessionId = session?.session_id || "";
    setStorageItem("sessionId", sessionId);
    updateAuthState({ sessionId });

    if (session) {
      const accountData = await getAccountData(sessionId);
      const accountId = accountData?.id || 0;
      setStorageItem("accountId", accountId.toString());
      updateAuthState({ accountId });
    }
  };

  const logout = async () => {
    const { sessionId } = authState;
    if (!sessionId) return;

    await deleteSession(sessionId);
    removeStorageItem("accountId");
    removeStorageItem("requestToken");
    removeStorageItem("sessionId");
    setAuthState({ requestToken: "", sessionId: "", accountId: NaN });
  };

  const contextValue = {
    ...authState,
    connectWithTDB,
    login,
    logout,
    isLoggedIn: !!authState.accountId,
    isAuthorized: !!authState.sessionId,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};
