"use client";

/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { AccountDataType } from "@/types/types";

interface AuthStateType {
  requestToken: string | null;
  accountData: AccountDataType | null;
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
  accountData: null,
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

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState<AuthStateType>({
    requestToken: getStorageItem("requestToken"),
    accountData: null,
    sessionId: getStorageItem("sessionId"),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (authState.sessionId) {
        const accountData = await getAccountData(authState.sessionId);
        updateAuthState({ accountData });
      }
    };

    fetchData();
  }, [authState.sessionId]);

  const updateAuthState = (updates: {
    requestToken?: string;
    sessionId?: string;
    accountData?: AccountDataType;
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
      updateAuthState({ accountData });
    }
  };

  const logout = async () => {
    const { sessionId } = authState;
    if (!sessionId) return;

    await deleteSession(sessionId);
    removeStorageItem("accountId");
    removeStorageItem("requestToken");
    removeStorageItem("sessionId");
    setAuthState({ requestToken: "", sessionId: "", accountData: null });
  };

  const contextValue = {
    ...authState,
    connectWithTDB,
    login,
    logout,
    isLoggedIn: !!authState?.accountData?.id,
    isAuthorized: !!authState.sessionId,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};
