import '../imports/i18n';

import React from 'react';

import { ThemeProvider } from '@material-ui/styles';

import { defaultTheme } from '../imports/themes/default';

import {TestPage} from "../imports/test-page/test-page";


export default () => {
  
  return (
  <>
    <ThemeProvider theme={defaultTheme}>
        <TestPage />
    </ThemeProvider>
  </>
  );
};