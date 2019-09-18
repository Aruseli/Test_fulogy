import withApollo from 'next-with-apollo';
import fetch from 'node-fetch';
import { InMemoryCache, HttpLink } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink, concat } from 'apollo-link';
import { getDataFromTree } from '@apollo/react-ssr';
import { ApolloProvider } from '@apollo/react-hooks';

const GRAPHQL = 'isg-hasura.herokuapp.com/v1/graphql';

// TODO token and secret

/**
 * Generate ApolloClient with ssr and subscriptions support.
 * @description
 * By default create anonmous connection.
 * You can provide token for Authorization Bearer or secret for x-hasura-admin-secret headers.
 * Attention! token and secret disabled!
 * @param {object} initialState
 * @param {object} options
 * @param {string=} options.token
 * @param {string=} options.secret
 * @returns {ApolloClient} ApolloClient
 */
export function generateApolloClient(initialState = {}, options = {}) {
  const headers = {
    // ...(options.token ? {
    //   'Authorization': `Bearer ${options.token}`,
    // } : {}),
    // ...(options.secret ? {
    //   'x-hasura-admin-secret': `${options.secret}`,
    // } : {}),
    'x-hasura-admin-secret': '1234',
    ...options.headers,
  };

  const httpLink = new HttpLink({
    uri: `https://${GRAPHQL}`,
    fetch,
  });

  // @ts-ignore
  const wsLink = !process.browser
    ? null
    : new WebSocketLink({
        uri: `wss://${GRAPHQL}`,
        options: {
          lazy: true,
          reconnect: true,
          connectionParams: () => ({
            headers,
          }),
        },
      });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers,
    });

    return forward(operation);
  });

  // @ts-ignore
  const link = !process.browser
    ? httpLink
    : split(
        ({ query }) => {
          // TODO wtf is the gql kind operation?
          // const { kind, operation } = getMainDefinition(query);
          // return kind === 'OperationDefinition' && operation === 'subscription';
          return true;
        },
        wsLink,
        httpLink,
      );

  return new ApolloClient({
    ssrMode: true,
    link: concat(authMiddleware, link),
    cache: new InMemoryCache({
      freezeResults: false,
      resultCaching: false,
    }).restore(initialState),
  });
}
