// @flow

import { selectNodeIdByString } from "./gql";

export const initPassportSessions = (passport: any, apolloClient: any) => {
  passport.serializeUser((auth, done) => {
    done(null, auth.token);
  });

  passport.deserializeUser(async (token, done) => {
    try {
      const nodeId = await selectNodeIdByString({
        apolloClient,
        format: 'txt',
        type: 'auth_token',
        value: token,
      })
      done(null, { token, nodeId });
    } catch(error) {
      done(error);
    }
  });
};