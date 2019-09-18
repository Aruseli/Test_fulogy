import React from 'react';
import gql from 'graphql-tag';

import { wrapPage } from '../../imports/wrap-page';
import { useGql, useMutation } from '../../imports/packages/gql/use';

const QUERY = gql`
  query {
    items {
      id
    }
  }
`;

const CLEAR = gql`
  mutation {
    delete_items(where: {}) {
      returning {
        id
      }
    }
  }
`;

const ADD = gql`
  mutation {
    insert_items(objects: {}) {
      returning {
        id
      }
    }
  }
`;

export default wrapPage(() => {
  const result = useGql(QUERY);
  const [clear] = useMutation(CLEAR);
  const [add] = useMutation(ADD);
  return (
    <>
      <div>{JSON.stringify(result.data, null, 1)}</div>
      <div>
        <button onClick={clear}>clear</button>
        <button onClick={add}>add</button>
      </div>
    </>
  );
});
