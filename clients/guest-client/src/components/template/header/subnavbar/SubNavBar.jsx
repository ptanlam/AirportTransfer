import React from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SubBar from './SubBar';
import { SubNavBarData } from './SubNavBarData';

const useStyles = makeStyles({
  subNavBar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 10,
  },
});

export default function SubNavBar() {
  const classes = useStyles();
  return (
    <Container>
      <Grid container className={classes.subNavBar}>
        {SubNavBarData.map((val, index) => (
          <Grid item key={index}>
            <SubBar
              id={val.iconId}
              icon={val.icon}
              text={val.iconText}
              path={val.path}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
