// @flow

import _ from 'lodash';

import React, { useState, useContext, useCallback, createContext } from 'react';

import { useSpring, animated as a, interpolate } from 'react-spring'
import VisibilitySensor from 'react-visibility-sensor';
import { useTheme, makeStyles } from '@material-ui/core';

import { ISpringRevealsScrollContext, SpringRevealsScrollContext, useSpringRevealsScroll } from './scroll';
import { ISpringRevealsScreenContext, SpringRevealsScreenContext, useSpringRevealsScreen } from './screen';

const useStyle = makeStyles(() => ({
  item: {
  },
}));

export const Item = ({
  scrollContext = SpringRevealsScrollContext,
  screenContext = SpringRevealsScreenContext,
  transform = (s, t, slw, slh, snw, snh, v) => `translateY(${t - (s + (slh / 2))}px)`,
  style,
  wrapperProps,
  sensorProps,
  ...props
}: {
  scrollContext?: React$Context<ISpringRevealsScrollContext>;
  screenContext?: React$Context<ISpringRevealsScreenContext>;
  transform?: (...args: any) => string;
  style?: any;
  wrapperProps?: any;
  sensorProps?: any;
}) => {
  const [{ v }, setItemSpring] = useSpring(() => ({ v: 0 }));
  const { scrollSpring: { s, slw, slh } } = useSpringRevealsScroll({ context: scrollContext });
  const { screenSpring: { t, snw, snh } } = useSpringRevealsScreen({ context: screenContext });

  const classes = useStyle();

  const transformSpring = interpolate(
    [s, t, slw, slh, snw, snh, v],
    transform,
  );

  return <VisibilitySensor
    onChange={isVisible => setItemSpring({ v: isVisible ? 1 : 0 })}
    {...sensorProps}
  >
    <div {...wrapperProps}>
      <a.div
        className={classes.item}
        {...props}
        style={{ ...style, transform: transformSpring }}
      />
    </div>
  </VisibilitySensor>;
};
