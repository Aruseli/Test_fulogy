import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import ReactPixel from 'react-facebook-pixel';
import ya, { YMInitializer } from 'react-yandex-metrika';
import ReactGA from 'react-ga';

var Chance = require('chance');
var chance = new Chance();

export const generateUserId = () => {
  return `${new Date().valueOf()}${chance.fbid()}`;
};

export const Context = React.createContext({});

/**
 *
 * @param {object} props
 * @param {number=} props.facebookPixel
 * @param {string=} props.googleAnalitics
 * @param {number=} props.yandexMetrika
 * @param {*=} props.children
 * @param {ReactContext=} props.context
 */
export const AnaliticsProvider = ({
  facebookPixel = null,
  googleAnalitics = null,
  yandexMetrika = null,
  context = Context,
  children,
}) => {
  const router = useRouter();
  const pathname = router ? router.pathname : null;

  const content = (
    <context.Provider
      value={{
        facebookPixel,
        googleAnalitics,
        yandexMetrika,
        trigger: (action, data) => {
          try {
            if (googleAnalitics)
              ReactGA.event({
                category: 'actions',
                action,
                value: data ? data.value : undefined,
              });
            if (yandexMetrika) ya('reachGoal', action, data);
            if (facebookPixel) ReactPixel.trackCustom(action, data);
          } catch (error) {
            console.error(error);
          }
        },
      }}
    >
      {children}
    </context.Provider>
  );

  useEffect(() => {
    if (!process.browser || !pathname) return content;

    if (!localStorage.getItem('_analiticsUserId')) {
      localStorage.setItem('_analiticsUserId', generateUserId());
    }
    if (facebookPixel) {
      const facebookPixelAdvancedMatching = {
        userId: localStorage.getItem('_analiticsUserId'),
      };
      ReactPixel.init(facebookPixel, facebookPixelAdvancedMatching, {
        autoConfig: true,
        debug: false,
      });
    }
    if (googleAnalitics) {
      ReactGA.initialize(googleAnalitics, {
        gaOptions: {
          userId: localStorage.getItem('_analiticsUserId'),
        },
      });
    }
  }, []);

  useEffect(() => {
    if (!process.browser || !pathname) return content;

    if (facebookPixel) ReactPixel.pageView();
    if (googleAnalitics) {
      ReactGA.set({ page: pathname });
      ReactGA.pageview(pathname);
    }
  }, [pathname]);

  if (!process.browser || !pathname) return content;

  return (
    <>
      {!!yandexMetrika && <YMInitializer
        accounts={[yandexMetrika]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          trackHash: true,
          userParams: {
            userId: localStorage.getItem('userId'),
          },
        }}
        version="2"
      />}
      {content}
    </>
  );
};
