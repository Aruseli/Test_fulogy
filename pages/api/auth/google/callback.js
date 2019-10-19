import { initExpress } from '../../../../imports/packages/auth/express';
import { initAuthGoogleCallback, initAuthGoogleStrategy } from '../../../../imports/packages/auth/google';
import { generateApolloClient } from '../../../../imports/packages/gql';

const app = initExpress();

const apolloClient = generateApolloClient({}, {
  path: process.env.GQL_PATH,
  secret: process.env.GQL_SECRET,
});

initAuthGoogleStrategy(app, apolloClient);
initAuthGoogleCallback('/api/auth/google/callback', app, apolloClient);

export default app;