import React from 'react';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CreateIcon from '@material-ui/icons/Create';
import HorizontalLabelInput from '../../../commons/HorizontalLabelInput';

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  box: {
    width: '100%',
    padding: 10,
    border: '1px solid black',
    borderRadius: 5,
  },
  item: {
    fontSize: '30px',
    marginRight: 20,
  },
});

function PersonalInformation({ title, info }) {
  const classes = useStyles();
  return (
    <Grid item container spacing={2}>
      <Grid item xs={4} container alignItems='center'>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Box component='div' className={classes.box}>
          <Typography>{info}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default function Account({
  loading,
  account,
  register,
  onSubmit,
  errors,
  openOrderForm,
  handleOpenOrderForm,
  handleCloseOrderForm,
}) {
  return (
    <Grid container justify='center' spacing={2}>
      <Grid item container>
        <Grid item xs container justify='center'>
          <Typography variant='h6'>Thông tin tài khoản</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant='contained'
            color='primary'
            startIcon={<CreateIcon />}
            onClick={() => handleOpenOrderForm()}
          >
            Cập nhật
          </Button>
        </Grid>
      </Grid>
      <Grid item container direction='column' spacing={2}>
        <Grid item>
          <PersonalInformation title='Tên' info={account.firstName} />
        </Grid>
        <Grid item>
          <PersonalInformation title='Họ' info={account.lastName} />
        </Grid>
        <Grid item>
          <PersonalInformation
            title='Số điện thoại'
            info={account.phoneNumber}
          />
        </Grid>
        <Grid item>
          <PersonalInformation title='Email' info={account.email} />
        </Grid>
      </Grid>

      {/* Dialog */}
      <Dialog open={openOrderForm} onClose={handleCloseOrderForm} fullWidth>
        <form onSubmit={onSubmit}>
          <DialogContent>
            <Typography variant='h6'>Thay đổi thông tin tài khoản</Typography>
          </DialogContent>
          <DialogContent>
            <Grid item container direction='column' spacing={2}>
              <Grid item>
                <HorizontalLabelInput
                  label='Tên'
                  inputName='firstName'
                  type='text'
                  register={register}
                  error={errors?.firstName?.message.length > 0}
                  helperText={errors?.firstName?.message}
                  maxLength={40}
                  minLength={2}
                />
              </Grid>
              <Grid item>
                <HorizontalLabelInput
                  label='Họ'
                  inputName='lastName'
                  type='text'
                  register={register}
                  error={errors?.lastName?.message.length > 0}
                  helperText={errors?.lastName?.message}
                  maxLength={40}
                  minLength={2}
                />
              </Grid>
              <Grid item>
                <HorizontalLabelInput
                  label='Số điện thoại'
                  inputName='phoneNumber'
                  type='number'
                  register={register}
                  error={errors?.phoneNumber?.message.length > 0}
                  helperText={errors?.phoneNumber?.message}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type='submit' variant='contained' color='secondary'>
              {loading ? (
                <CircularProgress size='24px' style={{ color: 'white' }} />
              ) : (
                'Cập nhật'
              )}
            </Button>
            <Button
              variant='contained'
              disabled={loading ? true : false}
              onClick={() => handleCloseOrderForm()}
            >
              Không
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
}
