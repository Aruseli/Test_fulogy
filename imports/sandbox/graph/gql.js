import { gql } from '../../packages/gql/use';

export const QUERY = gql`{
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

export const ADD_ROOT_NODE = gql`mutation AddRootNode($nodeId: String) {
  insert_nodes(objects: {id: $nodeId}) {
    returning {
      id
    }
  }
}`;

export const ADD_CHILD_NODE = gql`mutation AddChildNode(
  $nodeId: String,
  $sourceNodeId: String
) {
  insert_nodes(objects: {
    links_by_target: {data: {
      source_id: $sourceNodeId,
      type_id: 1
    }},
    id: $nodeId
  }) {
    returning {
      id
    }
  }
}`;

export const INSERT_LINK = gql`mutation InsertLink(
  $sourceId: String,
  $targetId: String,
) {
  insert_links(objects: {
    source_id: $sourceId,
    target_id: $targetId,
    type_id: 1
  }) {
    returning {
      id
    }
  }
}`;

export const DELETE_NODE = gql`mutation DeleteNode($id: String) {
  delete_nodes(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}`;

export const DELETE_LINK = gql`mutation DeleteNode($id: Int) {
  delete_links(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}`;