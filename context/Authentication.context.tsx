"use client";

/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  PropsWithChildren,
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
import { AccountDataType } from "@/types/types";
import { getCookie, setCookie } from "cookies-next";
import { deleteAuthenticationCookies } from "@/helpers/cookiesHelpers";

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
  accountId: number | undefined;
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  requestToken: null,
  accountData: null,
  sessionId: null,
  accountId: undefined,
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
    requestToken: null,
    accountData: null,
    sessionId: getCookie("sessionId") ?? "",
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
      updateAuthState({ requestToken: token });
      window.open(`https://www.themoviedb.org/authenticate/${token}`);
    }
  };

  const login = async () => {
    const { requestToken } = authState;
    if (!requestToken) return;

    const session = await createNewSession(requestToken);
    const sessionId = session?.session_id || "";
    setCookie("sessionId", sessionId);
    updateAuthState({ sessionId });

    if (session) {
      const accountData = await getAccountData(sessionId);
      setCookie("accountId", accountData?.id);
      updateAuthState({ accountData });
    }
  };

  const logout = async () => {
    const { sessionId } = authState;
    if (!sessionId) return;

    await deleteSession(sessionId);
    deleteAuthenticationCookies();
    setAuthState({ requestToken: "", sessionId: "", accountData: null });
  };

  const contextValue = {
    ...authState,
    connectWithTDB,
    login,
    logout,
    accountId: authState?.accountData?.id,
    isLoggedIn: !!authState?.accountData?.id,
    isAuthorized: !!authState.sessionId,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};
