import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import gql from 'graphql-tag';
import { define_node_with_google_id_return_new_auth_token } from './gql';

export const initAuthGoogleStrategy = (app, apolloClient) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        const {
          nodeId,
          token,
        } = await define_node_with_google_id_return_new_auth_token({
          apolloClient,
          googleId: profile.id,
        });
        done(null, { token, nodeId });
      }
    )
  );
};

export const initAuthGoogle = (path, app, apolloClient) => {
  app.get(
    path,
    passport.authenticate(
      'google',
      { scope: 'https://www.googleapis.com/auth/plus.login' },
    ),
  );
};

export const initAuthGoogleCallback = (path, app, apolloClient) => {
  app.get(
    path, 
    passport.authenticate('google'),
    (req, res) => {
      res.cookie('_sandbox_auth_info', req.user);
      const url = _.get(req, 'cookies._sandbox_auth_redirect');
      res.redirect(url || '/');
    },
  );
};