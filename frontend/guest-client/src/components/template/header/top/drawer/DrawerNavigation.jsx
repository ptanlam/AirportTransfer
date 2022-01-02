import React, { useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import DrawerList from './DrawerList';

const useStyles = makeStyles((theme) => ({
  bars: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 24,
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 24,
    },
    color: '#0770cd',
    cursor: 'pointer',
  },
}));

export default function DrawerNavigation() {
  const classes = useStyles();
  const [state, setState] = useState({});

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ [anchor]: open });
  };

  const list = (anchor) => <DrawerList anchor={anchor} />;
  return (
    <Grid
      item
      xs={5}
      sm={5}
      md={9}
      container
      justify='center'
      alignItems='center'
    >
      <FontAwesomeIcon
        icon={faBars}
        className={classes.bars}
        onClick={toggleDrawer('left', true)}
      />
      <Drawer
        anchor='left'
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </Grid>
  );
}
