/* eslint-disable @typescript-eslint/no-explicit-any */

import { AccountDataType, RequestTokenType, SessionType } from "@/types/types";
import { accountTMDBUrl, authenticationTMDBUrl } from "./urlHelper";

export const getRequestToken = async () => {
  try {
    const response = await fetch(
      `${authenticationTMDBUrl}token/new?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const token: RequestTokenType = await response.json();
    return token;
  } catch (error: any) {
    console.error(error);
  }
};

export const createNewSession = async (requestToken: string) => {
  try {
    const response = await fetch(
      `${authenticationTMDBUrl}session/new?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request_token: requestToken }),
      }
    );
    const session: SessionType = await response.json();
    return session;
  } catch (error: any) {
    console.error(error);
  }
};

export const deleteSession = async (sessionId: string) => {
  try {
    await fetch(
      `${authenticationTMDBUrl}session?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error(error);
  }
};

export const getAccountData = async (sessionId: string) => {
  try {
    const response = await fetch(
      `${accountTMDBUrl}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
    );
    const accountData: AccountDataType = await response.json();
    return accountData;
  } catch (error: any) {
    console.error(error);
  }
};
