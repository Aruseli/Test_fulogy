import React, { useState } from 'react';

import ReactResizeDetector from 'react-resize-detector';

export const ImageResponsiveSensor = ({ children, style, ...props }) => {
  const [sizeOut, setSizeOut] = useState({ width: 0, height: 0 });
  const [sizeIn, setSizeIn] = useState({ width: 0, height: 0 });

  const onResizeOut = (width, height) => {
    setSizeOut({ width, height });
  };

  const onResizeIn = (width, height) => {
    setSizeIn({ width, height });
  };

  const w1 = (sizeIn.width * sizeOut.width) / sizeIn.width;
  const h1 = (sizeIn.height * sizeOut.height) / sizeIn.height;
  const p1 = sizeIn.width / sizeIn.height;
  const p2 = w1 / h1;
  const p = p1 > p2;
  const w2 = p ? sizeOut.height / sizeIn.height : sizeOut.width / sizeIn.width;
  const h2 = p ? sizeOut.height / sizeIn.height : sizeOut.width / sizeIn.width;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          ...style,
        }}
        {...props}
      >
        <ReactResizeDetector handleWidth handleHeight onResize={onResizeOut} />
        <div
          style={{
            position: 'absolute',
            left: -((sizeIn.width - sizeOut.width) / 2),
            top: -((sizeIn.height - sizeOut.height) / 2),
            transform: `scale(${w2}, ${h2})`,
          }}
        >
          <ReactResizeDetector handleWidth handleHeight onResize={onResizeIn} />
          {children}
        </div>
      </div>
    </>
  );
};
