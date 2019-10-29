// @flow

import React, { useState, useEffect } from 'react';

import { makeStyles, Grid, TextField, LinearProgress, List, ListItem, ListItemText } from '@material-ui/core';
import { gql, useGql, useQuery } from '../packages/gql/use';

const QUERY = gql`
  query QUERY($value: String) {
    symptoms(where: {value: {_like: $value}}) {
      id
      value
      solutions {
        id
        value
      }
    }
  }

`;

export const Solutions = ({ symptom }: { symptom: string }) => {
  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: { value: `%${symptom.trim()}%` },
  });
  const [time, setTime] = useState(null);

  useEffect(() => {
    clearTimeout(time);
    setTime(setTimeout(() => {
      setTime(null);
      refetch({ value: `%${symptom.trim()}%` });
    }, 1000));
  }, [symptom]);

  console.log(data.symptoms);

  return <>
    {time && loading ? <LinearProgress /> : <LinearProgress variant="determinate" value={0}/>}
    {!!error && <pre>{error}</pre>}
    {!!symptom.trim() && <>
      <List>
        {!!data && <>
          {data.symptoms.map(symptom => (<React.Fragment key={symptom.id}>
            <ListItem key={symptom.id} disabled>
              <ListItemText>{symptom.value}</ListItemText>
            </ListItem>
            {data.symptoms.length === 1 && symptom.solutions.map(solution => (
              <ListItem key={solution.id}>
                <ListItemText>{solution.value}</ListItemText>
              </ListItem>
            ))}
          </React.Fragment>))}
        </>}
      </List>
    </>}
  </>;
};
