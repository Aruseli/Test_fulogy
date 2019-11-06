import React, { useState } from 'react';

import {
  Grid,
  IconButton,
  Paper,
  Badge,
  makeStyles,
} from '@material-ui/core';

import { ShoppingCartOutlined } from '@material-ui/icons';

import {MenuBlock} from './menu';

const useStyles = makeStyles(theme => ({
  backgroundHead: {
    backgroundColor: '#000',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#fff',
  },
}));

const Logo = require('../../images/lg.svg');

export const Header = () => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);

  const onClick = () => {
  setToggle(!toggle);
  };

  return (
  <>
    <Paper square className={classes.backgroundHead}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={10}>
          <img src={Logo} style={{
            width: 95,
            paddingLeft: 40}} />
        </Grid>
        <Grid item>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="buket">
            <Badge
            className={classes.margin}
            badgeContent={4}
            color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
          <MenuBlock />
        </Grid>
      </Grid>
    </Paper>
  </>
  );
};
