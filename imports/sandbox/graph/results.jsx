import React, { useEffect, useState } from 'react';

import { useGql } from '../../packages/gql/use';
import { Graph } from '../../packages/graph';
import { useParsed } from '../../packages/graph/parse';

let ReactJson;
if (process.browser) {
  ReactJson = require('react-json-view').default;
}

import './style.css';

export const Results = ({ query, variables, viewMode }) => {
  const result = useGql(query, { variables });
  const [parsed, setParsed] = useState({});
  const { nodes, links } = useParsed(result.data, parsed);

  return <>
    {/* <pre>{JSON.stringify(query, null, 2)}</pre>
    <pre>{JSON.stringify(variables, null, 2)}</pre>
    <pre>{JSON.stringify(result, null, 2)}</pre>
    <pre>{JSON.stringify(nodes, null, 2)}</pre>
    <pre>{JSON.stringify(links, null, 2)}</pre> */}
    {process.browser && viewMode === 'json' && (
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
      onNodeClick={(node) => {
        setSelected([node]);
      }}
    />}
  </>;
};
