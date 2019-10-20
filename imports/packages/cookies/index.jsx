// @flow

import React, { createContext, useContext, useState, useCallback } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Cookies from 'js-cookie';

export const CookiesContext = createContext<any>();

export function useCookies(context: any = CookiesContext) {
  const res = useContext(context);
  return res;
}

export const CookiesProvider = ({
  cookies = parseCookies(),
  context = CookiesContext,
  children,
}: {
  cookies: any;
  context?: any;
  children: any;
}) => {
  const [stateCookies, setStateCookies] = useState(cookies);

  const setCookie = useCallback((key, value) => {
    Cookies.set(key, value);
    setStateCookies(parseCookies());
  });

  return <context.Provider value={{
    cookies: stateCookies,
    setCookie,
  }}>{children}</context.Provider>;
};
