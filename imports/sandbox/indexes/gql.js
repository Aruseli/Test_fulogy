// @flow

import { gql } from '../../packages/gql/use';

export const QUERY_NODES = gql`
query {
  nodes {
    id
    links_by_node {
      id
      node_id
      type_id
      source_id
      target_id
      links_indexes_by_index_link {
        depth
        id
        index_link_id
        index_node_id
        list_id
        list_node_id
      }
    }
    links_by_source {
      id
      node_id
      source_id
      type_id
      target_id
      links_indexes_by_index_link {
        depth
        id
        index_link_id
        index_node_id
        list_id
        list_node_id
      }
    }
    links_by_target {
      id
      node_id
      source_id
      type_id
      target_id
      links_indexes_by_index_link {
        depth
        id
        index_link_id
        index_node_id
        list_id
        list_node_id
      }
    }
    links_indexes_by_index_node {
      id
      depth
      index_link_id
      index_node_id
      list_id
      list_node_id
    }
    links_indexes_by_list_node {
      depth
      id
      index_link_id
      index_node_id
      list_id
      list_node_id
    }
  }
}
`;

export const QUERY_LINKS = gql`
query {
  links {
    id
    node_id
    source_id
    target_id
    type_id
    node {
      id
      links_indexes_by_index_node {
        id
        depth
        index_link_id
        index_node_id
        list_id
        list_node_id
      }
      links_indexes_by_list_node {
        depth
        id
        index_link_id
        index_node_id
        list_id
        list_node_id
      }
    }
    target {
      id
      links_indexes_by_index_node {
        id
        depth
        index_link_id
        index_node_id
        list_id
        list_node_id
      }
      links_indexes_by_list_node {
        depth
        id
        index_link_id
        index_node_id
        list_id
        list_node_id
      }
    }
    links_indexes_by_index_link {
      id
      depth
      index_link_id
      index_node_id
      list_id
      list_node_id
    }
    source {
      id
      links_indexes_by_index_node {
        id
        depth
        index_link_id
        index_node_id
        list_id
        list_node_id
      }
      links_indexes_by_list_node {
        depth
        id
        index_link_id
        index_node_id
        list_id
        list_node_id
      }
    }
  }
}
`;

export const QUERY_LINKS_INDEXES = gql`
query {
  links_indexes {
    depth
    id
    index_link_id
    index_node_id
    list_id
    list_node_id
    index_link {
      id
      node_id
      source_id
      type_id
      target_id
    }
    index_node {
      id
    }
    list_node {
      id
    }
  }
}
`;

export const INSERT_LINK = gql`
  mutation InsertLink(
    $sourceId: String,
    $targetId: String,
    $typeId: Int,
  ) {
    insert_links(objects: {
      source_id: $sourceId,
      target_id: $targetId,
      type_id: $typeId
    }) {
      returning {
        id
      }
    }
  }
`;

export const DELETE_LINK = gql`
  mutation DELETE_LINK($linkId: Int) {
    delete_links(where: {id: {_eq: $linkId}}) {
      returning {
        id
      }
    }
  }
`;

export const INSERT_NODE = gql`
  mutation INSERT_NODE($objects: [nodes_insert_input!]!) {
    node: insert_nodes(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const DELETE_NODE = gql`
  mutation DELETE_NODE($nodeId: Int) {
    delete_nodes(where: {id: {_eq: $nodeId}}) {
      returning {
        id
      }
    }
  }
`;
