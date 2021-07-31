import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VerticalLabelInput from '../../commons/VerticalLabelInput';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    width: 320,
    height: 'auto',
    padding: 15,
  },
  forgetPassword: {
    color: '#1ba0e2',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  btnLogin: {
    fontWeight: 'bold',
    width: '100%',
    background: '#f96d01',
    border: 'none',
    borderRadius: 5,
    textAlign: 'center',
    padding: 10,
    color: '#fff',
    transition: 'all 0.1s linear',
    '&:hover': {
      transform: 'scale(0.98)',
      background: '#f96a01',
    },
  },
  buttonGoogleLogin: {
    width: '100%',
  },
});

export default function LoginForm({
  errors,
  loading,
  register,
  onSubmit,
  responseErrors,
}) {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.root}>
      <Grid container justify='center' spacing={2}>
        <Grid item>
          <Typography variant='h6'>Enjoy with us</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item container direction='column'>
                <VerticalLabelInput
                  inputName='email'
                  label='Email address'
                  register={register}
                  error={errors.email?.message.length > 0}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item container direction='column'>
                <VerticalLabelInput
                  inputName='password'
                  label='Password'
                  type='password'
                  register={register}
                  error={errors.password?.message.length > 0}
                  helperText={errors.password?.message}
                />
              </Grid>
              {Object.keys(responseErrors).length > 0 && (
                <Grid item container>
                  <Alert
                    variant='filled'
                    severity='error'
                    style={{ width: '100%' }}>
                    <strong>{responseErrors.message}</strong>
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  disabled={loading}
                  type='submit'
                  fullWidth
                  className={classes.btnLogin}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
