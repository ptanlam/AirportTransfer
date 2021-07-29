import { Grid, makeStyles, Typography } from '@material-ui/core';

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  anonymousNavItems,
  authenticatedAirlineNavItems,
  authenticatedAirportTransferNavItems,
} from '../../../constants';

const useStyles = makeStyles({
  navItem: {
    cursor: 'pointer',
  },
  navItemText: {
    fontWeight: 'bold',
    color: 'white',
    transition: '.3s',
    '&:hover': {
      borderBottom: '2px solid',
    },
  },
  navItemLink: {
    textDecoration: 'none',
  },
});

function Navigation({ isAuthenticated, transportType, loading }) {
  const classes = useStyles();

  const navItems = () => {
    if (!isAuthenticated) return anonymousNavItems;
    return transportType === 'flights'
      ? authenticatedAirlineNavItems
      : authenticatedAirportTransferNavItems;
  };

  return (
    <Grid container justify='center' alignItems='center' spacing={2}>
      {navItems().map((item, index) => (
        <Grid item key={index}>
          <NavLink
            className={classes.navItemLink}
            onClick={(e) => {
              if (loading) {
                toast.warning('Please wait until progress is complete!');
                e.preventDefault();
              }
            }}
            to={`/${item.link}`}>
            <Grid
              container
              className={classes.navItem}
              alignItems='center'
              spacing={1}>
              <Grid item>{item.icon}</Grid>
              <Grid item>
                <Typography className={classes.navItemText} variant='subtitle2'>
                  {item.name}
                </Typography>
              </Grid>
            </Grid>
          </NavLink>
        </Grid>
      ))}
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    transportType: state.partner.transportType,
    isAuthenticated: state.account.isAuthenticated,
    loading: state.apiCallsInProgress > 0,
  };
}

export default connect(mapStateToProps)(Navigation);
