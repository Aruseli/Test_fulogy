// @flow

import React, { useContext } from 'react';

import ApolloClient from 'apollo-client';

import { getDataFromTree } from '@apollo/react-ssr';
import { parseCookies } from 'nookies'
import { ApolloProvider } from '@apollo/react-hooks';
import { RouterContext } from 'next-server/dist/lib/router-context';

import { generateApolloClient } from './';
import { CookiesProvider } from '../cookies';
import { useRouter as _useRouter } from 'next/router';

const getStorage = () => {
  // $flowignore
  if (process.browser) {
    return window;
  } else {
    return {};
  }
};

/**
 * Wrap page for privide apolloClient and build server render based on nextjs async getInitialProps.
 * @param {object} options
 * @param {function} options.Component
 * @param {string=} options.gqlSecret
 * @param {string=} options.gqlPath
 * @returns {function} WrappedComponent
 */
export const wrapSsrGql = ({
  Component: Content, gqlSecret, gqlPath,
}: {
  Component: any; gqlSecret?: string; gqlPath?: string;
}) => {
  const Component = ({
    apolloClient, cookies, token, router,
  }: {
    apolloClient: ApolloClient; cookies: any; token: any; router: any;
  }) => {
    const _router = _useRouter();

    return (
      <RouterContext.Provider value={_router || router}>
        <CookiesProvider cookies={cookies}>
          <ApolloProvider client={apolloClient}>
            <Content />
          </ApolloProvider>
        </CookiesProvider>
      </RouterContext.Provider>
    );
  };

  const Page = ({
    apolloState, token, cookies, router
  }: {
    apolloState: any; token: string | void; cookies: any; router: any;
  }) => {
    const storage = getStorage();
    const apolloClient = storage.__apolloClient ? storage.__apolloClient : generateApolloClient(apolloState, {
      token,
      secret: gqlSecret,
      path: gqlPath,
    });
    storage.__apolloClient = apolloClient;

    const container = <Component apolloClient={apolloClient} token={token} cookies={cookies} router={router}/>;
    apolloClient.stop();
    return container;
  };

  Page.getInitialProps = async props => {
    if (Content.getInitialProps) await Content.getInitialProps(props);

    const cookies = parseCookies(props);
    const token: string | void = cookies.token || undefined;
    const apolloClient = generateApolloClient(
      {},
      {
        token,
        secret: gqlSecret,
        path: gqlPath,
      },
    );
    await getDataFromTree(
      <Component apolloClient={apolloClient} token={token} cookies={cookies} router={{ query: props.query, pathname: props.pathname, asPath: props.asPath }}/>,
    );
    const apolloState: any = apolloClient.extract();
    apolloClient.stop();
    return { apolloState, token, cookies, router: { query: props.query, pathname: props.pathname, asPath: props.asPath } };
  };

  return Page;
};

export function useRouter() {
  return useContext(RouterContext);
}
