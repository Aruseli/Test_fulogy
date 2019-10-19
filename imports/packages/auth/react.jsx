// @flow

import React, { createContext, useCallback, useContext, useEffect } from "react";

import Cookies from 'js-cookie';
import { useRouter } from "next/router";

interface IAuthContext {
  _sandbox_auth_info?: {
    token: string;
    nodeId: string;
  }
}

export const AuthContext = createContext<IAuthContext>({});

export const AuthProvider = ({
  context = AuthContext,
  children,
}: {
  context: React$Context<IAuthContext>;
  children: any;
} = {}) => {
  let _sandbox_auth_info = Cookies.get('_sandbox_auth_info');

  if (_sandbox_auth_info) {
    _sandbox_auth_info = JSON.parse(_sandbox_auth_info);
  }

  return <context.Provider value={{
    _sandbox_auth_info,
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
