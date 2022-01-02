import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';

const useStyles = makeStyles({
  paper: {
    padding: 20,
  },
  font: {
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#FF5E1F',
    color: '#fff',
    fontWeight: 'bold',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#FF5E1F',
      opacity: '0.9',
    },
  },
});

const accountFields = [
  {
    label: 'Id',
    inputName: 'id',
  },
  {
    label: 'First name',
    inputName: 'firstName',
  },
  {
    label: 'Last name',
    inputName: 'lastName',
  },
  {
    label: 'Email',
    inputName: 'email',
  },
  {
    label: 'Phone number',
    inputName: 'phoneNumber',
  },
];

export default function Account({ account, openEditDialog }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container direction='column' style={{ gap: 10 }}>
        <Grid container item spacing={1}>
          {accountFields.map((field) => (
            <Fragment key={field.inputName}>
              <Grid item xs={3}>
                <Typography variant='subtitle2' className={classes.font}>
                  {field.label}:
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='subtitle2' className={classes.font}>
                  {account[field.inputName]}
                </Typography>
              </Grid>
            </Fragment>
          ))}
          <Grid container item justify='flex-end'>
            <Button
              onClick={openEditDialog}
              color='primary'
              size='small'
              variant='contained'>
              Update profile
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
