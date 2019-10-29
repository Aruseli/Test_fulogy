// @flow

// @flow

import React, { useState, useContext } from 'react';

import { useTheme, Typography, makeStyles } from '@material-ui/core';
import { Picture } from '../imports/packages/picture';
import { ChildrenResponsive } from '../imports/packages/children-responsive';
import { wrapPage } from '../imports/wrap-page';
import _ from 'lodash';


import { SpringRevealsScrollProvider as Scroll } from '../imports/packages/spring-reveals/scroll';
import { SpringRevealsScreenProvider as Screen } from '../imports/packages/spring-reveals/screen';
import { Item } from '../imports/packages/spring-reveals/item';

// $flowignore
const img1 = require('../images/photo_2019-10-12_14-48-02.jpg?sizes[]=1800,sizes[]=1280,sizes[]=960,sizes[]=600,sizes[]=300,sizes[]=100');
const img2 = require('../images/photo_2019-10-26_19-29-46.jpg?sizes[]=1800,sizes[]=1280,sizes[]=960,sizes[]=600,sizes[]=300,sizes[]=100');
const img3 = require('../images/photo_2019-10-12_00-32-37.jpg?sizes[]=1800,sizes[]=1280,sizes[]=960,sizes[]=600,sizes[]=300,sizes[]=100');
const img4 = require('../images/photo_2019-09-30_12-29-10.jpg?sizes[]=1800,sizes[]=1280,sizes[]=960,sizes[]=600,sizes[]=300,sizes[]=100');

const useStyle = makeStyles(() => ({
  screen: {
    position: 'relative',
    left: 0, top: 0,
    width: '100%', height: '100vh',
  },
}));

const FullScreen = ({ img, children }) => {
  const classes = useStyle();

  return <Screen className={classes.screen}>
    <Item
      transform={({ sl, t, slw, slh, snw, snh, v, xy }) => (`
        translateY(${(t-(sl+((slh/2)-(snh/2))))*0.2}px)
        scale(1.4)
      `)}
      wrapperProps={{
        style: {
          overflow: 'hidden',
          height: '100%',
        },
      }}
      style={{
        transformOrigin: 'center',
        height: '100%',
      }}
    >
      <ChildrenResponsive>
        <Picture images={img.images} src={img.src}/>
      </ChildrenResponsive>
    </Item>
  </Screen>;
};

export default wrapPage(() => {
  const classes = useStyle();

  return (
    <Scroll style={{ background: '#000' }}>
      <FullScreen img={img1}/>
      <FullScreen img={img2}/>
      <FullScreen img={img3}/>
      <FullScreen img={img4}/>
    </Scroll>
  );
});
