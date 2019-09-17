import 'normalize.css';

import { AnaliticsProvider } from './packages/analitics';
import analiticsConfig from './analitics.config';
import { ssrGql } from './packages/gql/ssr';

export const wrapPage = Component => {
  return ssrGql(() => {
    return (
      <AnaliticsProvider {...analiticsConfig}>
        <Component />
      </AnaliticsProvider>
    );
  });
};
