import '../imports/i18n';

import React from 'react';

import { ThemeProvider } from '@material-ui/styles';

import { Body } from '../imports/components/body';
import { theme as defaultTheme } from '../imports/theme';

import {TestPage} from "../imports/components/vshsdt/test-page/test-page";


export default () => {
  
  return (
  <>
    <ThemeProvider theme={defaultTheme}>
      <Body>
        <TestPage />
      </Body>
    </ThemeProvider>
  </>
  );
};