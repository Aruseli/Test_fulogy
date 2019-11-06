import React, { useState, useRef } from 'react';
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  ListItem,
  ListItemText,
  MenuList,
  Popper,
  Divider,
} from '@material-ui/core';

import { Close, Menu } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#fff',
  },
  listMenu: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#000',
    color: '#fff',
  },
  listItemStyle: {
    textAlign: 'center',
  },
  dividerColor: {
    backgroundColor: '#8e8b8b8c',
  },
  selected: {
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#fff',
    }
  }
}));

export const MenuBlock = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
  setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
  }
  setOpen(false);
  };

  function handleListKeyDown(event) {
  if (event.key === 'Tab') {
    event.preventDefault();
    setOpen(false);
  }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  React.useEffect(() => {
  if (prevOpen.current === true && open === false) {
    anchorRef.current.focus();
  }

  prevOpen.current = open;
  }, [open]);

  return (
  <>
    <Button
      ref={anchorRef}
      aria-controls={open ? 'menu-list-grow' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
      className={classes.menuButton}>
      {open ? <Close /> : <Menu />}
    </Button>
    <Popper open={open} anchorEl={anchorRef.current} transition disablePortal  
      style={{
        zIndex: 11111,
        width: '100%',
        maxWidth: 360  
      }}>
    {({ TransitionProps }) => (
      <Grow
        {...TransitionProps}
        style={{
          transformOrigin: 'right top',
        }}>
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              className={classes.listMenu}
              autoFocusItem={open}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
              children={
              <>
                <ListItem selected onClick={handleClose} className={classes.listItemStyle} classes={{root: classes.selected}}>
                  <ListItemText primary={<p>Обучающее видео</p>} />
                </ListItem>
                <Divider className={classes.dividerColor} />
                <ListItem onClick={handleClose} className={classes.listItemStyle}>
                  <ListItemText primary={<p>Оформление заказа</p>} />
                </ListItem>
                <Divider className={classes.dividerColor} />
                <ListItem onClick={handleClose} className={classes.listItemStyle}>
                  <ListItemText primary={<p>Оплата</p>} />
                </ListItem>
                <Divider className={classes.dividerColor} />
                <ListItem onClick={handleClose} className={classes.listItemStyle}>
                  <ListItemText primary={<p>Доставка</p>} />
                </ListItem>
                <Divider className={classes.dividerColor} />
                <ListItem onClick={handleClose} className={classes.listItemStyle}>
                  <ListItemText primary={<p>Гарантия</p>} />
                </ListItem>
                <Divider className={classes.dividerColor} />
                <ListItem onClick={handleClose} className={classes.listItemStyle}>
                  <ListItemText primary={<p>Возврат</p>} />
                </ListItem>
                <Divider className={classes.dividerColor} />
                <ListItem onClick={handleClose} className={classes.listItemStyle}>
                  <ListItemText primary={<p>Контакты</p>} />
                </ListItem>
                <Divider className={classes.dividerColor} />
                <ListItem onClick={handleClose} className={classes.listItemStyle}>
                  <ListItemText primary={<p>Партнерам</p>} />
                </ListItem>
              </>
              }>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
      )}
    </Popper>
  </>
  );
};
