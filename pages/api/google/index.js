import express from 'express';
import passport from 'passport';
import ApolloClient from 'apollo-client';

import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import { generateApolloClient } from '../../../imports/packages/gql';
import gql from 'graphql-tag';

const app = express();

app.set('json spaces', 2); // number of spaces for indentation
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

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
      done('no');
    }
  )
);

app.get(
  '/api/google',
  passport.authenticate(
    'google',
    { scope: 'https://www.googleapis.com/auth/plus.login' },
  ),
);

export default app;