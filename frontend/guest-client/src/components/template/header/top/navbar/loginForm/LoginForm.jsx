import React from 'react';
import { NavLink } from 'react-router-dom';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VerticalLabelInput from '../../../../../commons/VerticalLabelInput';

const useStyles = makeStyles({
  login: {
    overflow: 'hidden',
    width: 320,
    height: 'auto',
    padding: 15,
  },
  forgetPassword: {
    cursor: 'pointer',
    color: '#1ba0e2',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  btnLogin: {
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
});

export default function LoginForm({
  loading,
  register,
  onSubmit,
  errors,
  responseErrors,
  onForgetPasswordClick,
}) {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.login}>
      <Grid container justify='center' spacing={3}>
        <Grid item>
          <Typography variant='h6'>Đăng nhập tài khoản</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={onSubmit}>
            <Grid container spacing={1}>
              <Grid item container>
                <VerticalLabelInput
                  loading={loading}
                  inputName='email'
                  label='Email'
                  type='text'
                  register={register}
                  error={errors.email?.message.length > 0}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item container>
                <VerticalLabelInput
                  loading={loading}
                  inputName='password'
                  label='Mật khẩu'
                  type='password'
                  register={register}
                  error={errors.password?.message.length > 0}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item container>
                <Typography
                  variant='subtitle2'
                  className={classes.forgetPassword}
                  onClick={onForgetPasswordClick}>
                  Quên mật khẩu ?
                </Typography>
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
              <Grid item container spacing={2}>
                <Grid item xs>
                  <Button
                    disabled={loading}
                    type='submit'
                    className={classes.btnLogin}>
                    {loading ? (
                      <CircularProgress
                        size='24px'
                        style={{ color: 'white' }}
                      />
                    ) : (
                      <Typography>Đăng nhập</Typography>
                    )}
                  </Button>
                </Grid>
                <Grid item xs>
                  <Typography variant='caption'>
                    Bạn chưa có tài khoản
                  </Typography>
                  <Typography variant='body2'>
                    <NavLink to='' className={classes.forgetPassword}>
                      Đăng ký
                    </NavLink>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
