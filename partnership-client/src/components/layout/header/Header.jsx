import {
  Box,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  anonymousDrawerItems,
  authenticatedAirlineDrawerItems,
  authenticatedAirportTransferDrawerItems,
} from '../../../constants';
import Navigation from './Navigation';
import UserActions from './UserActions';

const useStyles = makeStyles({
  largeNav: {
    minWidth: 110,
    padding: '10 50',
  },
  logo: {
    width: '180px',
  },
  navItem: {
    cursor: 'pointer',
    padding: 15,
    '&:hover': {
      borderBottom: '1px solid #0194f3',
    },
  },
  navItemText: {
    fontWeight: 'bold',
    color: 'black',
  },
  navItemLink: {
    textDecoration: 'none',
  },
});

function Header({ isAuthenticated, transportType, loading }) {
  const classes = useStyles();
  const [state, setState] = useState({});

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ [anchor]: open });
  };

  const navItems = () => {
    if (!isAuthenticated) return anonymousDrawerItems;
    return transportType === 'flights'
      ? authenticatedAirlineDrawerItems
      : authenticatedAirportTransferDrawerItems;
  };

  const list = (anchor) => (
    <div
      style={{ width: 300 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <ListItem button>
          <NavLink to='/'>
            <img
              className={classes.logo}
              src='https://ik.imagekit.io/tvlk/blog/2020/01/Traveloka_Primary_Logo.png?tr=dpr-1,w-675'
              alt=''
            />
          </NavLink>
        </ListItem>
        {navItems().map((item, index) => (
          <Fragment key={index}>
            <NavLink
              className={classes.navItemLink}
              onClick={(e) => {
                if (loading) {
                  toast.warning('Please wait until progress is complete!');
                  e.preventDefault();
                }
              }}
              to={`/${item.link}`}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      className={classes.navItemText}
                      variant='subtitle2'>
                      {item.name}
                    </Typography>
                  }
                />
              </ListItem>
            </NavLink>
          </Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <Box position='relative' width='100%' zIndex={99}>
      <Box className={classes.largeNav}>
        <Drawer
          anchor='left'
          open={state['left']}
          onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>

        <Grid container justify='space-between' alignItems='center' spacing={2}>
          <Hidden mdDown>
            <Grid container item xs={2}>
              <NavLink to='/'>
                <img
                  className={classes.logo}
                  src='https://ik.imagekit.io/tvlk/image/imageResource/2019/08/15/1565841403670-660e7e9831f3423910aba992bd3ddab0.svg'
                  alt=''
                />
              </NavLink>
            </Grid>
          </Hidden>

          <Hidden lgUp>
            <Grid container direction='column'>
              <Grid container item alignItems='center'>
                <Grid item xs={2}>
                  <IconButton onClick={toggleDrawer('left', true)}>
                    <MenuIcon style={{ color: 'white' }} />
                  </IconButton>
                </Grid>

                <Grid container item xs={10} justify='flex-end'>
                  <UserActions />
                </Grid>
              </Grid>
            </Grid>
          </Hidden>

          <Hidden mdDown>
            <Grid container item xs={8} justify='center'>
              <Navigation />
            </Grid>
          </Hidden>

          <Hidden mdDown>
            <Grid container item xs={2} justify='flex-end'>
              <UserActions />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.account.isAuthenticated,
    transportType: state.partner.transportType,
    loading: state.apiCallsInProgress > 0,
  };
}

export default connect(mapStateToProps)(Header);
