import 'normalize.css';

import { AnaliticsProvider } from './packages/analitics';
import { wrapSsrGql } from './packages/gql/ssr';

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
        <AnaliticsProvider 
          facebookPixel={process.env.BG_TOKEN}
          googleAnalitics={process.env.GA_TOKEN}
          yandexMetrika={process.env.YM_TOKEN}
        >
          <Component />
        </AnaliticsProvider>
      );
    },
  });
};
