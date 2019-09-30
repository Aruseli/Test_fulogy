import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { Paper, Button, makeStyles, Grid, Tabs, Tab } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Resizable } from 're-resizable';

import LayersOutlinedIcon from '@material-ui/icons/LayersOutlined';
import LayersClearOutlinedIcon from '@material-ui/icons/LayersClearOutlined';

import { wrapPage } from '../../imports/wrap-page';
import { useGql, useMutation, toGqls, gql } from '../../imports/packages/gql/use';
import { useUrlState } from '../../imports/packages/use-url-state';
import { Graph } from '../../imports/packages/graph';
import { useParsed } from '../../imports/packages/graph/parse';
import { gqlUnwrap } from '../../imports/packages/gql/methods';

import Graphiql, { generateGraphiqlFetcher } from '../../imports/packages/graphiql';

import { defaultTheme } from '../../imports/themes/default';
import { Results } from '../../imports/sandbox/graph/results';

const QUERY = gql`{
  nodes {
    id
    links_indexes_by_list_node {
      id
      index_link_id
      index_node_id
      list_id
      list_node_id
      depth
    }
    links_by_source {
      id
      source_id
      target_id
      node_id
      type_id
    }
    links_by_target {
      id
      source_id
      target_id
      node_id
      type_id
    }
  }
}`;

const _fetcher = generateGraphiqlFetcher({
  path: process.env.GQL_PATH,
  secret: process.env.GQL_SECRET,
});

export default wrapPage(() => {
  const [gql, setGql] = useUrlState('gql', { query: QUERY });
  
  const [query, setQuery] = useState(gql.query);

  const [giqlExplorerIsOpen, setGiqlExplorerIsOpen] = useState(true);
  const [giqlSizeType, setGiqlSizeType] = useState({ height: 200 });
  const [giqlVisible, setGiqlVisible] = useState(true);
  const [giqlLayers, setGiqlLayers] = useState(false);

  const [viewMode, setViewMode] = useState('3d');

  const fetcher = async (params) => {
    const result = await _fetcher(params);

    if (!result.errors) {
      if (!params.query.includes('__schema') && !params.query.includes('mutation')) {
        setGql({ query: gqlUnwrap(params.query) });
      }
    }

    return result;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper
        style={{
          position: 'absolute',
          zIndex: 99,
          left: 0, top: 0,
          width: '100%',
          height: 48,
        }}
        elevation={6}
      >
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid container justify="flex-start" alignItems="center">
              <Grid item>
                <Tabs value={giqlVisible ? 'giql' : null}>
                  <Tab value="giql" onClick={() => setGiqlVisible(!giqlVisible)} label="GQL"/>
                </Tabs>
              </Grid>
              <Grid item>
                <Tabs value={giqlLayers ? 'layers' : null}>
                  <Tab value="layers" onClick={() => setGiqlLayers(!giqlLayers)} icon={giqlLayers ? <LayersOutlinedIcon/> : <LayersClearOutlinedIcon/>}/>
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Tabs value={viewMode}>
              <Tab value="3d" onClick={() => setViewMode('3d')} label="3d"/>
              <Tab value="2d" onClick={() => setViewMode('2d')} label="2d"/>
              <Tab value="json" onClick={() => setViewMode('json')} label="json"/>
            </Tabs>
          </Grid>
        </Grid>
      </Paper>
      <Paper
        style={{
          position: 'absolute',
          zIndex: 98,
          left: 0, top: 48,
          overflow: 'hidden',
          width: '100%',
          height: giqlSizeType.size,
          ...(
            giqlVisible
            ? {
              top: 48,
            }
            :{
              top: -400,
            }
          ),
          transition: 'top 1s ease',
        }}
        elevation={giqlVisible ? giqlLayers ? 6 : 2 : 0}
      >
        <Resizable
          size={{ width: '100%', height: giqlSizeType.height }}
          onResizeStop={(e, direction, ref, d) => {
            setGiqlSizeType({
              height: giqlSizeType.height + d.height,
            });
          }}
        >
          <div>
            <Graphiql
              query={query}
              setQuery={setQuery}
              explorerIsOpen={giqlExplorerIsOpen}
              setExplorerIsOpen={setGiqlExplorerIsOpen}
              fetcher={fetcher}
              buttons={[
                {
                  onClick: () => setGiqlVisible(false),
                  label: 'Hide',
                  title: 'Hide Graphiql',
                },
              ]}
            />
          </div>
        </Resizable>
      </Paper>
      <div style={{
        position: 'absolute',
        left: 0,
        bottom: 5,
        width: '100%',
        height: giqlLayers || !giqlVisible ? 'calc(100% - 48px)' : `calc(100% - 48px - ${giqlSizeType.height}px)`,
      }}>
        <Results query={gql.query} variables={gql.variables} viewMode={viewMode}/>
      </div>
    </ThemeProvider>
  );
});
