import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { NavLink } from 'react-router-dom';
import VerticalLabelInput from '../../../commons/VerticalLabelInput';

const useStyles = makeStyles({
  loginBtn: {
    backgroundColor: '#FF5E1F',
    color: '#fff',
    fontWeight: 'bold',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#FF5E1F',
      opacity: '0.9',
    },
  },
  paper: {
    padding: '15 40',
  },
  loginLink: {
    textDecoration: 'none',
    display: 'inline',
    color: '#0194f3',
    cursor: 'pointer',
    paddingBottom: '2',
    // '&:hover': {
    //   borderBottom: '1px solid #0194f3',
    // },
  },
});

export default function LoginForm({
  errors,
  loading,
  register,
  onSubmit,
  responseErrors,
  onForgetPasswordClick,
  onResendEmailVerification,
}) {
  const classes = useStyles();

  return (
    <Box
      bgcolor='#235d9f'
      display='flex'
      minHeight='100vh'
      width='100%'
      position='absolute'
      top={0}
      zIndex={999}
      justifyContent='center'
      alignItems='center'>
      <Grid container justify='center'>
        <Grid item xs={11} sm={8} lg={4}>
          <Paper className={classes.paper}>
            <form onSubmit={onSubmit}>
              <Grid container direction='column' spacing={2}>
                <Grid container item justify='center'>
                  <Box
                    component='img'
                    height={20}
                    marginY={5}
                    src='https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410755346-43c24e976f9e194b2c7023e1592c2522.png?tr=q-75'></Box>
                </Grid>
                <Grid item>
                  <Typography variant='caption' color='textSecondary'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, harum? Maiores quae quia sit alias doloribus nostrum
                    qui? Ullam officia, ut nobis dolores veniam laboriosam
                    impedit modi perferendis beatae nihil?
                  </Typography>
                </Grid>
                {Object.keys(responseErrors).length > 0 && (
                  <Grid item>
                    <Alert variant='filled' severity='error'>
                      <AlertTitle>Error</AlertTitle>
                      <strong>{responseErrors.message}</strong>
                    </Alert>
                  </Grid>
                )}
                <Grid item>
                  <VerticalLabelInput
                    inputName='email'
                    label='Email address'
                    register={register}
                    error={errors.email?.message.length > 0}
                    helperText={errors.email?.message}
                    loading={loading}
                  />
                </Grid>
                <Grid item>
                  <VerticalLabelInput
                    inputName='password'
                    label='Password'
                    type='password'
                    register={register}
                    error={errors.password?.message.length > 0}
                    helperText={errors.password?.message}
                    loading={loading}
                  />
                </Grid>
                <Grid container item justify='space-between'>
                  <Typography
                    variant='subtitle2'
                    className={classes.loginLink}
                    onClick={onForgetPasswordClick}>
                    Forget your password?
                  </Typography>
                  <Typography
                    variant='subtitle2'
                    className={classes.loginLink}
                    onClick={onResendEmailVerification}>
                    Resend email verification
                  </Typography>
                </Grid>
                <Grid container item justify='center'>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      className={classes.loginBtn}
                      type='submit'
                      fullWidth>
                      Login
                    </Button>
                  )}
                </Grid>
                <Divider />
                <Grid item>
                  <Typography variant='subtitle2'>
                    Not yet a partner?{' '}
                    <NavLink to='/registration' className={classes.loginLink}>
                      Register here
                    </NavLink>
                  </Typography>
                </Grid>
                <Divider />
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
