import React from 'react';

import { getDataFromTree } from '@apollo/react-ssr';

import { ApolloProvider } from '@apollo/react-hooks';

import { generateApolloClient } from './';

/**
 * Wrap page for privide apolloClient and build server render based on nextjs async getInitialProps.
 * @param {function} Component
 * @returns {function} WrappedComponent
 */
export const wrapSsrGql = Content => {
  const Component = ({ apolloClient }) => {
    return (
      <ApolloProvider client={apolloClient}>
        <Content />
      </ApolloProvider>
    );
  };

  const Page = ({ apolloState, token }) => {
    const apolloClient = generateApolloClient(apolloState, { token });
    const container = <Component apolloClient={apolloClient} token={token} />;
    apolloClient.stop();
    return container;
  };

  Page.getInitialProps = async props => {
    if (Content.getInitialProps) await Content.getInitialProps(props);

    const { req } = props;
    const token = req && req.cookies ? req.cookies.token : undefined;
    const apolloClient = generateApolloClient({}, { token });
    await getDataFromTree(
      <Component apolloClient={apolloClient} token={token} />,
    );
    const apolloState = apolloClient.extract();
    apolloClient.stop();
    return { apolloState, token };
  };

  return Page;
};
