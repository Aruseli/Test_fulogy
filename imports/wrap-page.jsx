import { AnaliticsProvider } from './packages/analitics';
import { wrapSsrGql } from './packages/gql/ssr';
import { defaultTheme } from './themes/default';

import 'normalize.css';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';

/**
 * Base app page wrapper. Provide ssr gql and analitics.
 * @param {function} Component
 * @returns {function} WrappedComponent
 */
export const wrapPage = Component => {
  return wrapSsrGql({
    gqlPath: process.env.GQL_PATH,
    gqlSecret: process.env.GQL_SECRET,
    Component: () => {
      return (
        <ThemeProvider theme={defaultTheme}>
          <SnackbarProvider maxSnack={3}>
            <AnaliticsProvider 
              facebookPixel={process.env.BG_TOKEN}
              googleAnalitics={process.env.GA_TOKEN}
              yandexMetrika={process.env.YM_TOKEN}
            >
              <Component />
            </AnaliticsProvider>
          </SnackbarProvider>
        </ThemeProvider>
      );
    },
  });
};
