import { createContext, useCallback, useContext } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({
  context = AuthContext,
}) => {
  let _sandbox_auth_info = Cookies.get('_sandbox_auth_info');

  if (_sandbox_auth_info) {
    _sandbox_auth_info = JSON.parse(_sandbox_auth_info);
  }

  return <context.Provider value={{
    _sandbox_auth_info,
  }}></context.Provider>;
};

export function useAuth({
  context = AuthContext,
}) {
  return useContext(context);
};

export const fakeRouter = {};
export function useAuthRedirect({
  url = null,
}) {
  const router = useRouter();
  const { pathname } = process.browser && router ? router : { pathname: url };

  useEffect(() => {
    Cookies.set('_sandbox_auth_redirect', pathname);
  }, [url, pathname]);
};
