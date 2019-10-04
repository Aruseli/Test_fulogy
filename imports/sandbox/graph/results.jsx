import React, { useEffect, useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { useGql, useMutation, gql } from '../../packages/gql/use';
import { Graph } from '../../packages/graph';
import { useParsed } from '../../packages/graph/parse';

import uniqid from 'uniqid';

import { ReactJson } from '../../packages/react-json';

const ADD_ROOT_NODE = gql`mutation AddRootNode($nodeId: String) {
  insert_nodes(objects: {id: $nodeId}) {
    returning {
      id
    }
  }
}`;

const DELETE_NODE = gql`mutation DeleteNode($nodeId: String) {
  delete_nodes(where: {id: {_eq: $nodeId}}) {
    returning {
      id
    }
  }
}`;

export const Results = ({ onNodeClick, query, variables, viewMode }) => {
  const { enqueueSnackbar } = useSnackbar();

  const result = useGql(query, { variables });
  const [parsed, setParsed] = useState({});
  const { nodes, links } = useParsed(result.data, parsed);

  const [addRootNode] = useMutation(ADD_ROOT_NODE);
  const [deleteNode] = useMutation(DELETE_NODE);

  return <>
    {/* <pre>{JSON.stringify(query, null, 2)}</pre>
    <pre>{JSON.stringify(variables, null, 2)}</pre>
    <pre>{JSON.stringify(result, null, 2)}</pre>
    <pre>{JSON.stringify(nodes, null, 2)}</pre>
    <pre>{JSON.stringify(links, null, 2)}</pre> */}
    {viewMode === 'json' && (
      <div style={{
        padding: 16,
        height: '100%',
        boxSizing: 'border-box',
        overflow: 'scroll',
      }}>
        <ReactJson
          src={result.data}
          indentWidth={2}
          displayDataTypes={false}
        />
      </div>
    )}
    {(viewMode === '2d' || viewMode === '3d') && <Graph
      type={viewMode}
      nodes={nodes}
      links={links}
      onNodeClick={onNodeClick}
      // addRootNode={() => addRootNode({ variables: { nodeId: uniqid() } })}
      // deleteNode={async (nodeId) => {
      //   try {
      //     await deleteNode({ variables: { nodeId } });
      //     enqueueSnackbar('deleteNode: deleted', nodeId);
      //   } catch(error) {
      //     enqueueSnackbar('deleteNode: error', error);
      //   }
      // }}
    />}
  </>;
};
