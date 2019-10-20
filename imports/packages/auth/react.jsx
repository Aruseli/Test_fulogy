// @flow

import React, { createContext, useCallback, useContext, useEffect } from "react";

import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import useAxios from 'axios-hooks';
import axios from 'axios';

import { useCookies } from "../cookies";

interface IAuthContext {
  auth_token?: string;
  node_id?: string;
  localLogin: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const defaultAuthContext = {
  localLogin: async (username: string, password: string) => {},
  logout: async () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider = ({
  context = AuthContext,
  children,
}: {
  context: React$Context<IAuthContext>;
  children: any;
} = {}) => {
  const { cookies, setCookie } = useCookies();

  const auth_token = cookies._sandbox_auth_token;
  const node_id = cookies._sandbox_auth_node_id;

  const localLogin = async (username: string, password: string) => {
    const result = await axios.get(`/api/auth/local?username=${username}&password=${password}`);
    if (result.data && !result.data.error) {
      setCookie('_sandbox_auth_token', result.data.token);
      setCookie('_sandbox_auth_node_id', result.data.nodeId);
    }
    return result.data;
  };

  const logout = async () => {
    const result = await axios.get(`/api/auth/logout`);
    if (result.data && !result.data.error) {
      setCookie('_sandbox_auth_token', '');
      setCookie('_sandbox_auth_node_id', '');
    }
    return result.data;
  };

  return <context.Provider value={{
    auth_token,
    node_id,
    localLogin,
    logout,
  }}>{children}</context.Provider>;
};

export function useAuth({
  context = AuthContext,
}: {
  context: React$Context<IAuthContext>;
} = {}) {
  return useContext(context);
};

export const fakeRouter = {};
export function useAuthRedirect({
  url,
}: {
  url?: string;
} = {}) {
  const router = useRouter();
  const { pathname } = router || { pathname: url };

  useEffect(() => {
    Cookies.set('_sandbox_auth_redirect', pathname);
  }, [url, pathname]);
};
