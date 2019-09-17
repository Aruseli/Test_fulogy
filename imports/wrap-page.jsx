import 'normalize.css';

import { AnaliticsProvider } from './packages/analitics';
import analiticsConfig from './analitics.config';
import { wrapSsrGql } from './packages/gql/ssr';

export const wrapPage = Component => {
  return wrapSsrGql(() => {
    return (
      <AnaliticsProvider {...analiticsConfig}>
        <Component />
      </AnaliticsProvider>
    );
  });
};
