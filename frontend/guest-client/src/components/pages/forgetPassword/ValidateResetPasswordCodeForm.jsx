import React from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#5bbaf7',
  },
  paper: {
    position: 'relative',
    minWidth: 500,
    padding: 30,
    borderRadius: 20,
  },
  image: {
    position: 'absolute',
    top: -120,
    right: -80,
    transform: 'rotate(10deg)',
    height: 200,
  },
  btn: {
    width: '100%',
    backgroundColor: '#FF5E1F',
    color: '#fff',
    fontWeight: 'bold',
    transition: '0.3s',
    padding: '10 30',
    '&:hover': {
      backgroundColor: '#FF5E1F',
      opacity: '0.9',
    },
  },
});

export default function ValidateResetPasswordCodeForm({
  errors,
  loading,
  onSubmit,
  register,
}) {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.box}>
      <Grid container justify='center' xs={10} sm={8} lg={4}>
        <Paper className={classes.paper}>
          <Box
            component='img'
            className={classes.image}
            src='https://i.pinimg.com/originals/d5/da/ee/d5daeeaca986fb2655a4965884c0d6ea.png'
          />
          <form onSubmit={onSubmit}>
            <Grid container direction='column' spacing={3}>
              <Grid item container justify='center'>
                <Typography variant='h4' style={{ fontWeight: 'bolder' }}>
                  Traveloka
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='h6'>Nhập mã xác thực</Typography>
              </Grid>

              <Grid item container direction='column' spacing={1}>
                <Grid item>
                  <Typography variant='subtitle1'>Mã code</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    name='resetPasswordCode'
                    variant='outlined'
                    type='number'
                    inputRef={register}
                    error={errors.resetPasswordCode?.message.length > 0}
                    helperText={errors.resetPasswordCode?.message}
                    disabled={loading}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid item xs>
                <Button
                  disabled={loading}
                  type='submit'
                  className={classes.btn}
                >
                  {loading ? 'Đang kiểm tra...' : 'Xác nhận'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
}
