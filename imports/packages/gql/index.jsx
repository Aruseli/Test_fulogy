import withApollo from 'next-with-apollo';
import fetch from 'node-fetch';
import { InMemoryCache, HttpLink } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink, concat } from 'apollo-link';
import { getDataFromTree } from '@apollo/react-ssr';
import { ApolloProvider } from '@apollo/react-hooks';

export function generateHeaders(options) {
  const headers = {
    ...(options.secret
      ? {
          'x-hasura-admin-secret': `${options.secret}`,
        }
      : options.token
      ? {
          Authorization: `Bearer ${options.token}`,
        }
      : {}),
    ...options.headers,
  };
  return headers;
};

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
 * @param {string} options.path
 * @returns {ApolloClient} ApolloClient
 */
export function generateApolloClient(initialState = {}, options = {}) {
  const headers = generateHeaders(options);

  const httpLink = new HttpLink({
    uri: `https://${options.path}`,
    fetch,
  });

  // @ts-ignore
  const wsLink = !process.browser
    ? null
    : new WebSocketLink({
        uri: `wss://${options.path}`,
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
