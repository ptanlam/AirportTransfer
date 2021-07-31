import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  text: {
    fontSize: '18px',
    fontWeight: 400,
    textShadow: '0px 1px 5px #ccc',
  },
});

const authenticatedNavItems = [
  {
    title: 'Users',
    link: '/users',
  },
  {
    title: 'Partners',
    link: '/partners',
  },
  {
    title: 'Reports',
    link: '/reports',
  },
];

export default function Navigation() {
  const classes = useStyles();
  return (
    <Grid item container spacing={3}>
      {authenticatedNavItems.map((value) => {
        return (
          <Grid item key={value.link}>
            <NavLink to={value.link}>
              <Typography className={classes.text}>{value.title}</Typography>
            </NavLink>
          </Grid>
        );
      })}
    </Grid>
  );
}
