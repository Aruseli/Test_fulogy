import React from 'react';

import { Header } from './header';
import { MainBlocks } from './main';
import {TabsNav} from './tabs';
import {MenuBlock} from './menu';


export const TestPage = () => {

  return (
  <>
    <Header/>
    <MainBlocks/>
    {/* <MenuBlock /> */}
    <TabsNav />
  </>
  );
};
