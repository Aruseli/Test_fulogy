// @flow

import React, { useContext, useCallback } from 'react';

import { useTheme, Typography, Grid } from '@material-ui/core';
import _ from 'lodash';

import { SpringRevealsScrollProvider as Scroll } from '../../imports/packages/spring-reveals/scroll';
import { SpringRevealsScreenProvider as Screen } from '../../imports/packages/spring-reveals/screen';
import { Item } from '../../imports/packages/spring-reveals/item';

import { wrapPage } from '../../imports/wrap-page';

// percent on screen (t-s)/(slh/100)
// percent on screen invert (100-(t-s)/(slh/100))
// y to x (sw/100)*(100-((t-s)/(slh/100)))

export default () => {
  return <Scroll>
    <div style={{ height: 1000 }}/>
    <Screen style={{
      background: 'blue',
      height: 300
    }}>
      screen
      <Item
        sensorProps={{
          offset: { top: 100, bottom: 100 },
        }}
        transform={(s, t, slw, slh, snw, snh, v) => (`
          translateY(${(t-(s+((slh/2)-(snh/2))))*0.2}px)
          scaleX(${v})
        `)}
        wrapperProps={{
          style: {
            position: 'absolute',
            width: '50%', height: '50%',
            top: '25%', left: '25%',
          },
        }}
        style={{
          transformOrigin: 'left center',
          background: 'red',
          width: '100%', height: '100%',
        }}
      >
        123
      </Item>
    </Screen>
    <div style={{ height: 1000 }}/>
  </Scroll>;
};
