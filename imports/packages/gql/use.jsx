import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import _ from 'lodash';

export { useQuery, useSubscription, useMutation } from '@apollo/react-hooks';

/**
 * @typedef {object} UseGraphqlResult
 * @property {*} data
 * @property {boolean} loading
 * @property {*} error
 */

export const toGqls = _.memoize(query => {
  return {
    query: gql`query ${query.loc.source.body}`,
    subscription: gql`subscription ${query.loc.source.body}`,
  };
});

/**
 * React hook hybrid of useQuery and useSubscription.
 * @param {GraphqlTag} query
 * @param {*} options - useQuery and useSubscription options
 * @return {UseGraphqlResult} result
 */
export function useGql(queryString, options = {}) {
  const { query, subscription } = toGqls(queryString);
  const qr = useQuery(query, { ssr: true, ...options });
  const sr = useSubscription(subscription, options);

  if (sr && sr.loading)
    return { data: qr.data, loading: qr.loading, error: qr.error };
  return { data: sr.data, loading: sr.loading, error: sr.error };
}
