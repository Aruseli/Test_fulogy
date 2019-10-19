import { initExpress } from '../../../imports/packages/auth/express';
import { generateApolloClient } from '../../../imports/packages/gql';
import { initAuthLogout } from '../../../imports/packages/auth/logout';

const apolloClient = generateApolloClient({}, {
  path: process.env.GQL_PATH,
  secret: process.env.GQL_SECRET,
});

const app = initExpress(apolloClient);

initAuthLogout('/api/auth/logout', app, apolloClient);

export default app;