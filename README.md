# sandbox

## proxy

Edit `pages/api`.

## use-query

Using url query as state storage.

For example:

```jsx
const [{ x }, setValue] = useQuery("abc", { x: 1 });
```

It store `{ x: 1 }` object in query `?abc={x:1}`.

## picture

Tag `<picture/>` with `responsive-loader` demo page

Prepare image require outer any react render function.

```jsx
const ri = require("../images/sandbox.jpg?sizes[]=1800,sizes[]=1280,sizes[]=960,sizes[]=600,sizes[]=300,sizes[]=100");
```

Insert into your render `<Picture/>` component. They create picture with sources for each image size. For example for size 1280, will be `@media (min-width: 1280px)`.

```jsx
<Picture images={ri.images} src={ri.src} />
```

You can send any `<img/>` props into `<Picture/>`.

```jsx
<Picture images={ri.images} src={ri.src} style={{ width: "100%" }} />
```
