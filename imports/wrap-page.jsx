import 'normalize.css';

import { AnaliticsProvider } from './packages/analitics';
import analiticsConfig from './analitics.config';
import { wrapSsrGql } from './packages/gql/ssr';

/**
 * Base app page wrapper. Provide ssr gql and analitics.
 * @param {function} Component
 * @returns {function} WrappedComponent
 */
export const wrapPage = Component => {
  return wrapSsrGql(() => {
    return (
      <AnaliticsProvider {...analiticsConfig}>
        <Component />
      </AnaliticsProvider>
    );
  });
};
