import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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
  return <div>{JSON.stringify(result.data, null, 1)}</div>;
});
