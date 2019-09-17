import React from 'react';

import { Page } from '../../imports/page';
import _ from 'lodash';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { defaultTheme } from '../../imports/themes/default';

const darkTheme = theme =>
  createMuiTheme(
    _.merge({}, theme, {
      palette: {
        primary: {
          main: '#1c2022',
        },
      },
    }),
  );

export default () => {
  return (
    <Page>
      <ThemeProvider theme={defaultTheme}>
        <Button variant="contained" color="primary">
          demo primary page
        </Button>
        <ThemeProvider theme={darkTheme}>
          <Button variant="contained" color="primary">
            demo primary page in dark theme
          </Button>
        </ThemeProvider>
      </ThemeProvider>
    </Page>
  );
};
