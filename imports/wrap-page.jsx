import 'normalize.css';

import { AnaliticsProvider } from './packages/analitics';
import analiticsConfig from './analitics.config';
import gqlConfig from './gql.config';
import { wrapSsrGql } from './packages/gql/ssr';

/**
 * Base app page wrapper. Provide ssr gql and analitics.
 * @param {function} Component
 * @returns {function} WrappedComponent
 */
export const wrapPage = Component => {
  return wrapSsrGql({
    ...gqlConfig,
    Component: () => {
      return (
        <AnaliticsProvider {...analiticsConfig}>
          <Component />
        </AnaliticsProvider>
      );
    },
  });
};
