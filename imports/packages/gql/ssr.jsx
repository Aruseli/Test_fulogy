// @flow

import React from 'react';

import ApolloClient from 'apollo-client';

import { getDataFromTree } from '@apollo/react-ssr';
import { parseCookies } from 'nookies'
import { ApolloProvider } from '@apollo/react-hooks';

import { generateApolloClient } from './';
import { CookiesProvider } from '../cookies'

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
  const Component = ({ apolloClient, cookies }: { apolloClient: ApolloClient, cookies: any }) => {
    return (
      <CookiesProvider cookies={cookies}>
        <ApolloProvider client={apolloClient}>
          <Content />
        </ApolloProvider>
      </CookiesProvider>
    );
  };

  const Page = ({ apolloState, token, cookies }: { apolloState: any; token: string | void, cookies: any }) => {
    const apolloClient = generateApolloClient(apolloState, {
      token,
      secret: gqlSecret,
      path: gqlPath,
    });
    const container = <Component apolloClient={apolloClient} token={token} cookies={cookies}/>;
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
      <Component apolloClient={apolloClient} token={token} cookies={cookies} />,
    );
    const apolloState: any = apolloClient.extract();
    apolloClient.stop();
    return { apolloState, token, cookies };
  };

  return Page;
};
