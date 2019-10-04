import React from 'react';

import { wrapPage } from '../../imports/wrap-page';
import { gql, useGql, useMutation } from '../../imports/packages/gql/use';

const QUERY = gql`
  query {
    _sandbox {
      id
    }
  }
`;

const CLEAR = gql`
  mutation {
    delete__sandbox(where: {}) {
      returning {
        id
      }
    }
  }
`;

const ADD = gql`
  mutation {
    insert__sandbox(objects: {}) {
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
