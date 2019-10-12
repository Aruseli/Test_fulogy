import React, { useState } from 'react';
import { render } from 'react-dom';

import { wrapPage } from '../../imports/wrap-page';

import { SpringSensorTrail } from '../../imports/sandbox/react-spring-sensor-trail.jsx';

export default wrapPage(() => {
  return (
    <>
      <div
        style={{
          height: 800,
        }}
      />
      <SpringSensorTrail />
      <div
        style={{
          height: 800,
        }}
      />
    </>
  );
});
