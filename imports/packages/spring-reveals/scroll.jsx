// @flow

import React, { useState, useRef, useContext, useCallback, createContext } from 'react';

import { useSpring, animated as a, interpolate } from 'react-spring'
import { useTheme, makeStyles } from '@material-ui/core';

export interface ISpringRevealsScrollContext {
  scrollSpring: { s: any; slh: any; slw: any; };
  setScrollSpring?: any;
};

export const SpringRevealsScrollContext = createContext<ISpringRevealsScrollContext>({
  scrollSpring: { s: null, slh: null, slw: null, },
});

export function useSpringRevealsScroll({
  context = SpringRevealsScrollContext,
}: {
  context?: React$Context<ISpringRevealsScrollContext>;
} = {}) {
  return useContext(context);
};

const useStyle = makeStyles(() => ({
  scroll: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
}));

export const SpringRevealsScrollProvider = ({
  context = SpringRevealsScrollContext,
  children,
  ...props
}: {
  context?: React$Context<ISpringRevealsScrollContext>;
  children: any;
  [string]: any;
}) => {
  const [scrollSpring, setScrollSpring] = useSpring(() => ({
    s: 0,
    slh: 0,
    slw: 0,
  }));
  const onScroll = useCallback(e => {
    setScrollSpring({
      s: e.target.scrollTop,
      slh: scrollRef.current.clientHeight,
      slw: scrollRef.current.clientWidth,
    });
  }, []);
  const classes = useStyle();
  const scrollRef: any = useRef();

  return <div ref={scrollRef} onScroll={onScroll} className={classes.scroll} {...props}>
    <context.Provider value={{
      scrollSpring,
      setScrollSpring,
    }}>
      {children}
    </context.Provider>
  </div>;
};
