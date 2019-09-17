import React, { useContext } from 'react';

import { getDataFromTree } from '@apollo/react-ssr';

import gql from 'graphql-tag';
import {
  useQuery,
  useSubscription,
  useMutation as _useMutation,
  ApolloProvider,
} from '@apollo/react-hooks';

import { initApollo } from '../../imports/packages/gql';
import { wrapPage } from '../../imports/wrap-page';

const query = gql`
  query {
    items {
      id
    }
  }
`;

export default wrapPage(() => {
  const result = useQuery(query, { ssr: true });
  return <div>{JSON.stringify(result.data)}</div>;
});
