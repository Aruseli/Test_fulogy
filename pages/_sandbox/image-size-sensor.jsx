import React, { useState, useContext } from 'react';

import { useTheme, Typography } from '@material-ui/core';
import { Picture } from '../../imports/packages/picture';
import { ImageResponsiveSensor } from '../../imports/sandbox/image-responsive-sensor';
import { wrapPage } from '../../imports/wrap-page';
import _ from 'lodash';

const ri = require('../../images/sandbox.jpg?sizes[]=1800,sizes[]=1280,sizes[]=960,sizes[]=600,sizes[]=300,sizes[]=100');

export default wrapPage(() => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: '25%',
          top: '25%',
          width: '50%',
          height: '50%',
          border: '1px solid black',
        }}
      >
        <ImageResponsiveSensor>
          <Picture images={ri.images} src={ri.src} />
        </ImageResponsiveSensor>
      </div>
    </>
  );
});
