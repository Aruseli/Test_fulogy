import Gql from 'graphql-tag';
import { useQuery as _useQuery, useSubscription as _useSubscription, useMutation as _useMutation, useApolloClient as _useApolloClient } from '@apollo/react-hooks';
import _ from 'lodash';

export function useQuery(query, ...args) {
  return _useQuery(toGql(query), ...args);
};

export function useSubscription(query, ...args) {
  return _useSubscription(toGql(query), ...args);
};

export function useMutation(query, ...args) {
  return _useMutation(toGql(query), ...args);
};

/**
 * @typedef {object} UseGraphqlResult
 * @property {*} data
 * @property {boolean} loading
 * @property {*} error
 */

export const toGqls = _.memoize(queryString => {
  return queryString ? {
    query: Gql`query ${queryString}`,
    subscription: Gql`subscription ${queryString}`,
  } : {};
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

export function gql(strings) {
  return strings[0];
}

export const toGql = _.memoize((string) => {
  return Gql`${string}`;
});
