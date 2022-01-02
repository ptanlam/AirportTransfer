import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100vw',
    minHeight: '100vh',
    backgroundColor: '#5bbaf7',
  },
  paper: {
    position: 'relative',
    minWidth: 200,
    minHeight: 100,
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

export default function ForgetPasswordForm({
  errors,
  loading,
  onSubmit,
  register,
}) {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.box}>
      <Grid container justify='center' xs={10} md={6} lg={4}>
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
                <Typography variant='h6'>Bạn quên mật khẩu ?</Typography>
                <Typography variant='subtitle1'>
                  Nhập địa chỉ email đã đăng ký của bạn để nhận hướng dẫn đặt
                  lại mật khẩu.
                </Typography>
              </Grid>

              <Grid item container direction='column' spacing={1}>
                <Grid item>
                  <Typography
                    variant='subtitle2'
                    style={{ fontWeight: 'bold' }}
                  >
                    Email
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    name='email'
                    variant='outlined'
                    type='email'
                    inputRef={register}
                    error={errors.email?.message.length > 0}
                    helperText={errors.email?.message}
                    disabled={loading}
                    fullWidth
                    placeholder='Email của bạn'
                  />
                </Grid>
              </Grid>

              <Grid item xs>
                <Button
                  size='large'
                  disabled={loading}
                  type='submit'
                  className={classes.btn}
                >
                  {loading ? 'Đang gửi...' : 'Gửi'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
}
