import { initExpress } from '../../../../imports/packages/auth/express';
import { initAuthGoogle } from '../../../../imports/packages/auth/google';
import { generateApolloClient } from '../../../../imports/packages/gql';

const apolloClient = generateApolloClient({}, {
  path: process.env.GQL_PATH,
  secret: process.env.GQL_SECRET,
});

const app = initExpress(apolloClient);

initAuthGoogleStrategy(app, apolloClient);
initAuthGoogle('/api/auth/google', app, apolloClient);

export default app;