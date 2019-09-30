export const gqlWrap = (gql) => `query ${gql}`;
export const gqlUnwrap = (gql) => {
  let query = gql;
  for (let i = 0; i < gql.length; i ++) {
    if (gql[i] === '{') {
      query = gql.slice(i);
      break;
    }
  }
  return query;
}
