import React from 'react';
import { useState } from 'react';
import color from 'material-color-hash';

import _ from 'lodash';

const parseLink = (input, links, _road, nodes) => {
  if (!_.size(input)) return;
  for (let i = 0; i < input.length; i++) {
    const link = input[i];
    if (!_road[`l${link.id}`]) {
      _road[`l${link.id}`] = true;
      nodes[`l${link.id}`] = {
        id: `l${link.id}`,
        group: link.__typename,
        color: color('links', 500).backgroundColor,
        __data: link,
      };
      if (link.source_id) {
        links[`l${link.id}-source`] = {
          id: `l${link.id}-source`,
          source: `n${link.source_id}`,
          target: `l${link.id}`,
          group: `${link.__typename}-source`,
          color: color('links', 500).backgroundColor,
          __data: link,
        };
      }
      if (link.target_id) {
        links[`l${link.id}-target`] = {
          id: `l${link.id}-target`,
          source: `l${link.id}`,
          target: `n${link.target_id}`,
          group: `${link.__typename}-target`,
          color: color('links', 500).backgroundColor,
          __data: link,
        };
      }
      if (link.node_id) {
        links[`l${link.id}-node`] = {
          id: `l${link.id}-node`,
          source: `l${link.id}`,
          target: `n${link.node_id}`,
          group: `${link.__typename}-node`,
          color: color('links.node', 500).backgroundColor,
          __data: link,
        };
      }
    }
  }
};

const parseProp = (node, rel, links, _road, nodes) => {
  if (!_.size(node[rel])) return;
  for (let p = 0; p < node[rel].length; p++) {
    const pr = node[rel][p];
    nodes[`${rel}${pr.id}`] = {
      id: `${rel}${pr.id}`,
      group: pr.__typename,
      color: '#20ec3d',
      __data: pr,
    };
    links[`pr-${rel}-${pr.id}`] = {
      id: `pr-${rel}-${pr.id}`,
      source: `${rel}${pr.id}`,
      target: `n${pr.of_id}`,
      group: pr.__typename,
      color: '#20ec3d',
      __data: pr,
    };
  }
};

const parseIndex = (node, links, _road, nodes) => {
  if (!_.size(node.links_indexes_by_list_node)) return;
  for (let it = 0; it < node.links_indexes_by_list_node.length; it++) {
    const index = node.links_indexes_by_list_node[it];
    if (!_road[`i${index.id}`]) {
      _road[`i${index.id}`] = true;
      nodes[`i${index.id}`] = {
        id: `i${index.id}`,
        label: `i${index.id} n${index.list_node_id}(${index.depth})`,
        group: index.__typename,
        color: '#a1a1a1',
        __data: index,
      };
      links[`in${index.id}`] = {
        id: `in${index.id}`,
        source: `i${index.id}`,
        target: `n${index.list_node_id}`,
        group: `${index.__typename}`,
        color: '#a1a1a1',
        __data: index,
      };
    }
  }
};

export const hashIntoResult = (
  hash = {},
  result = [],
) => {
  for (let k = 0; k < result.length; k++) {
    if (hash[result[k].id]) {
      if (!_.isEqual(result[k], hash[result[k].id])) {
        _.merge(result[k], hash[result[k].id]);
      }
      delete hash[result[k].id];
    } else {
      delete hash[result[k].id];
      result.splice(k, 1);
      k--;
    }
  }
  const nk = Object.keys(hash);
  for (let k = 0; k < nk.length; k++) {
    result.push(hash[nk[k]]);
  }
  return result;
};

export const onlyChanged = (
  results = { nodes: [], links: [] },
  hashs,
) => {
  const _nodes = hashIntoResult(hashs.nodes, results.nodes);
  results.nodes = _nodes;
  const _links = hashIntoResult(hashs.links, results.links);
  results.links = _links;
  return {
    nodes: results.nodes,
    links: results.links,
  };
};

export function parseNode(
  node,
  nodes, links, _road,
) {
  nodes[`n${node.id}`] = {
    id: `n${node.id}`,
    group: node.__typename,
    color: '#000',
    __data: node,
  };
  parseLink(node.links_by_source, links, _road, nodes);
  parseLink(node.links_by_target, links, _road, nodes);
  const keys = Object.keys(node);
  parseProp(node, 'nodes_props_passport_passwords', links, _road, nodes);
  parseProp(node, 'nodes_props_sessions', links, _road, nodes);
  parseProp(node, 'nodes_props_types', links, _road, nodes);
  parseProp(node, 'nodes_props_accesses', links, _road, nodes);
  parseIndex(node, links, _road, nodes);
};

export function useParsed(
  data,
  results = { nodes: [], links: [] },
) {
  const nodes = {};
  const _road = {};
  const links = {};

  const ns = _.get(data, 'nodes');
  if (_.size(ns)) {
    for (let n = 0; n < ns.length; n++) {
      parseNode(ns[n], nodes, links, _road);
    }
  }

  for (let l in links) {
    if (!nodes[links[l].source] || !nodes[links[l].target]) {
      delete links[l];
    }
  }

  return onlyChanged(results, { nodes, links });
};
