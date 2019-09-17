import React from 'react';

import { getDataFromTree } from '@apollo/react-ssr';

import { ApolloProvider } from '@apollo/react-hooks';

import { initApollo } from './';

export const ssrGql = Content => {
  const Component = ({ apolloClient }) => {
    console.log({ apolloClient });
    return (
      <ApolloProvider client={apolloClient}>
        <Content />
      </ApolloProvider>
    );
  };

  const Page = ({ apolloState, token }) => {
    const apolloClient = initApollo(apolloState, { token });
    const container = <Component apolloClient={apolloClient} token={token} />;
    apolloClient.stop();
    return container;
  };

  Page.getInitialProps = async props => {
    if (Content.getInitialProps) await Content.getInitialProps(props);

    const { req } = props;
    const token = req && req.cookies ? req.cookies.token : undefined;
    const apolloClient = initApollo({}, { token });
    await getDataFromTree(
      <Component apolloClient={apolloClient} token={token} />,
    );
    const apolloState = apolloClient.extract();
    apolloClient.stop();
    return { apolloState, token };
  };

  return Page;
};
