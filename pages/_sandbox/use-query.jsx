import React, { useContext } from "react";

import { useQuery } from "../../imports/packages/use-query";
import { Page } from "../../imports/page";

export default () => {
  const [{ x }, setValue] = useQuery("abc", { x: 1 });

  return (
    <Page>
      <pre>
        <code>{`const [{ x }, setValue] = useQuery('abc', { x: 1 });`}</code>
      </pre>
      <div>{JSON.stringify({ x }, null, 1)}</div>
      <button
        onClick={() => setValue({ x: x + 1 })}
      >{`setValue({ x: x + 1 })`}</button>
    </Page>
  );
};
