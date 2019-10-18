import express from 'express';
import passport from 'passport';
import ApolloClient from 'apollo-client';

import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import { generateApolloClient } from '../../../../imports/packages/gql';
import gql from 'graphql-tag';

const app = express();

app.set('json spaces', 2); // number of spaces for indentation
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, { id });
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

const ADD = gql`
  mutation AddTestSandbox($test: String) {
    insert__sandbox(objects: { test: $test }) {
      returning {
        id
      }
    }
  }
`;

const apolloClient = generateApolloClient({}, {
  path: process.env.GQL_PATH,
  secret: process.env.GQL_SECRET,
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log({ accessToken, refreshToken, profile });
      await apolloClient.mutate({
        mutation: ADD,
        variables: { test: JSON.stringify({ accessToken, refreshToken, profile }) },
      })
      done(null, profile);
    }
  )
);

app.get(
  '/api/auth/google/callback', 
  passport.authenticate('google'),
  (req, res) => {
    req.cookie('_sandbox_auth_info', req.user);
    res.redirect(
      typeof(req.cookies._sandbox_auth_redirect) === 'string'
      ? req.cookies._sandbox_auth_redirect
      : '/'
    );
  },
);

export default app;