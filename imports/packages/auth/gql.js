// @flow

import _ from 'lodash';
import gql from "graphql-tag";
import uniqid from 'uniqid';

// select node by some string

export const SELECT_NODE_ID_BY_STRING = gql`
query SELECT_NODE_ID_BY_STRING($format: String, $type: String, $value: String) {
  nodes(where: {nodes_props_strings: {format: {_eq: $format}, type: {_eq: $type}, value: {_eq: $value}}}) {
    id
  }
}
`;

export const selectNodeIdByString = async ({
  apolloClient, format, type, value,
}: {
  apolloClient: any, format: string, type: string, value: string,
}) => {
  const r0 = await apolloClient.query({
    query: SELECT_NODE_ID_BY_STRING,
    variables: { format, type, value, },
  });
  return _.get(r0, 'data.nodes.0.id');
};

// insert string to node

export const INSERT_STRING_TO_NODE = gql`
mutation INSERT_STRING_TO_NODE($format: String, $type: String, $value: String, $nodeId: String) {
  insert_nodes_props_strings(objects: { format: $format, type: $type, value: $value, prop_node_id: $nodeId }) {
    returning {
      id
    }
  }
}
`;

export const insertStringToNode = ({
  apolloClient, format, type, value, nodeId,
}: {
  apolloClient: any, format: string, type: string, value: string, nodeId: string
}) => apolloClient.mutate({
  mutation: INSERT_STRING_TO_NODE,
  variables: { format, type, value, nodeId },
});

// after google auth, helps to find exists node attached to google id

export const selectNodeIdByAuthGoogleId = ({
  apolloClient, googleId,
}: {
  apolloClient: any; googleId: string;
}) => selectNodeIdByString({
  apolloClient,
  format: 'txt',
  type: 'auth_google_id',
  value: googleId,
});

// define node, upsert based on google_id and create new auth_token

export const define_node_with_google_id_return_new_auth_token = async ({
  apolloClient, googleId
}: {
  apolloClient: any; googleId: string;
}) => {
  const nodeId = await selectNodeIdByAuthGoogleId({ apolloClient, googleId });
  if (!nodeId) {
    return await insertNodeWithAuthGoogleIdAndToken({
      apolloClient,
      googleId,
    });
  } else {
    await insertStringToNode({
      apolloClient,
      format: 'txt',
      type: 'auth_google_id',
      value: googleId,
      nodeId,
    });
    const token = uniqid();
    await insertStringToNode({
      apolloClient,
      format: 'txt',
      type: 'auth_token',
      value: token,
      nodeId,
    });
    return { nodeId, token };
  }
};

// insert node with google id and token

export const INSERT_NODE_WITH_AUTH_GOOGLE_ID_AND_TOKEN = gql`
mutation INSERT_NODE_WITH_AUTH_GOOGLE_ID($googleId: String, $nodeId: String, $token: String) {
  insert_nodes(objects: {id: $nodeId, nodes_props_strings: {data: [{format: "txt", type: "auth_google_id", value: $googleId}, {format: "txt", type: "auth_token", value: $token}]}}) {
    returning {
      id
    }
  }
}
`;

export const insertNodeWithAuthGoogleIdAndToken = async({
  apolloClient, googleId, nodeId = uniqid(), token = uniqid(),
}: {
  apolloClient: any; googleId: string; nodeId?: string; token?: string;
}) => {
  await apolloClient.mutate({
    mutation: INSERT_NODE_WITH_AUTH_GOOGLE_ID_AND_TOKEN,
    variables: { googleId, nodeId, token },
  });
  return { token, nodeId };
};