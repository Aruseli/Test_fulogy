# sandbox

## how

```sh
git clone url sandbox
cd sandbox
npm i
npm run dev
```

## env

> If you need to use sandbox not only for hasura gql, pls make PR.

In process environment must be defined:

```sh
GQL_SECRET='<x-hasura-admin-secret>'
GQL_PATH='<gqlurl>'
FB_TOKEN=0
GA_TOKEN=''
YM_TOKEN=0
```

## proxy

Edit `pages/api`.

## analitics

Simple googleAnalitics, yandexMetrika, facebookPixel integration with triggers support.

```js
import React, { useContext } = 'react';
import { AnaliticsProvider, Context } from "./packages/analitics";

const props = {
  facebookPixel: 556647711153866,
  googleAnalitics: "UA-64254068-3",
  yandexMetrika: 53888251
};

const Page = () => {
  const { trigger } = useContext(Context);
  return <div
    onClick={() => {
      trigger('click', { value: 7 });
    }}
  >
    page
  </div>;
};

export default () => {
  return <AnaliticsProvider {...props}>
    <Page/>
  </AnaliticsProvider>;
};
```

## use-url-state

Using url query as state storage.

For example:

```jsx
const [{ x }, setValue] = useQuery('abc', { x: 1 });
```

It store `{ x: 1 }` object in query `?abc={x:1}`.

## picture

Tag `<picture/>` with `responsive-loader` demo page

Prepare image require outer any react render function.

```jsx
const ri = require('../images/sandbox.jpg?sizes[]=1800,sizes[]=1280,sizes[]=960,sizes[]=600,sizes[]=300,sizes[]=100');
```

Insert into your render `<Picture/>` component. They create picture with sources for each image size. For example for size 1280, will be `@media (min-width: 1280px)`.

```jsx
<Picture images={ri.images} src={ri.src} />
```

You can send any `<img/>` props into `<Picture/>`.

```jsx
<Picture images={ri.images} src={ri.src} style={{ width: '100%' }} />
```

## ssr gql

Simple way to use ssr gql.

```jsx
import React from 'react';

import gql from 'graphql-tag';
import { useGql, useMutation } from '../../imports/packages/gql/use';

// Includes ../../imports/packages/gql/ssr ssrWrap
import { wrapPage } from '../../imports/wrap-page';

const query = gql`
  query {
    items {
      id
    }
  }
`;

export default wrapPage(() => {
  const result = useGql(query);
  // query and cache on server
  // query from cache on client
  // subscribe
  return <div>{JSON.stringify(result.data, null, 1)}</div>;
});
```

## graphiql with explorer

Example on `/_sandbox/graphiql`.