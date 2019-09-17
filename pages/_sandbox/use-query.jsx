import React, { useContext } from 'react';

import { useQuery } from '../../imports/packages/use-query';
import { wrapPage } from '../../imports/wrap-page';

export default wrapPage(() => {
  const [{ x }, setValue] = useQuery('abc', { x: 1 });

  return (
    <>
      <pre>
        <code>{`const [{ x }, setValue] = useQuery('abc', { x: 1 });`}</code>
      </pre>
      <div>{JSON.stringify({ x }, null, 1)}</div>
      <button
        onClick={() => setValue({ x: x + 1 })}
      >{`setValue({ x: x + 1 })`}</button>
    </>
  );
});
