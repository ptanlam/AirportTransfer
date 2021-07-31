import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import convertToCurrency from '../../../../utils/convertToCurrency';
import MenuItem from '@material-ui/core/MenuItem';
import HookFormSelectInput from '../../../commons/HookFormSelectInput';
import VerticalLabelInput from '../../../commons/VerticalLabelInput';
import reserve from '../../../../assets/images/dat-cho.png';
import { connect } from 'react-redux';
import VerticalLabelInputWithDefaultValue from '../../../commons/VerticalLabelInputWithDefaultValue';

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  padding: {
    padding: 20,
  },
  marginTopBottom: {
    marginTop: 20,
    marginBottom: 20,
  },
  main: {
    height: '100%',
    marginTop: 100,
    padding: 30,
    background: '#e6eaed',
  },
  addIcon: {
    background: '#FF5E1F',
    color: 'white',
    margin: 5,
  },
  minusIcon: {
    background: '#cccccc',
    color: 'white',
    margin: 5,
  },
});

function ContactInfoForm(props) {
  const classes = useStyles();
  const { errors, control, email, contactFullName, phoneNumber, loading } =
    props;

  return (
    <Paper className={classes.padding}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='body1'>Thông tin liên hệ</Typography>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <VerticalLabelInputWithDefaultValue
            type='text'
            label='Họ tên'
            control={control}
            loading={loading}
            inputName='contactFullName'
            disabled={!!contactFullName}
            defaultValue={contactFullName}
            helperText={errors?.contactFullName?.message}
            error={errors?.contactFullName?.message.length > 0}
          />
        </Grid>
        <Grid item xs={6}>
          <VerticalLabelInputWithDefaultValue
            loading={loading}
            type='text'
            control={control}
            label='Số điện thoại'
            inputName='phoneNumber'
            disabled={!!phoneNumber}
            defaultValue={phoneNumber}
            helperText={errors?.phoneNumber?.message}
            error={errors?.phoneNumber?.message.length > 0}
          />
        </Grid>
        <Grid item xs={6}>
          <VerticalLabelInputWithDefaultValue
            type='text'
            label='Email'
            inputName='email'
            loading={loading}
            control={control}
            disabled={!!email}
            defaultValue={email}
            helperText={errors.email?.message}
            error={errors.email?.message.length > 0}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

function PassengerInfoForm(props) {
  const { register, control, errors, number, inputName, inputTitle } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6'>Khách hàng {number}</Typography>
      </Grid>
      <Grid item>
        <HookFormSelectInput
          name={inputTitle}
          label='Danh xưng'
          control={control}
          defaultValue={''}
          variant='outlined'
        >
          <MenuItem value='Ông'>Ông</MenuItem>
          <MenuItem value='Bà'>Bà</MenuItem>
          <MenuItem value='Cô'>Cô</MenuItem>
          <MenuItem value='Trẻ em'>Trẻ em</MenuItem>
          <MenuItem value='Em bé'>Em bé</MenuItem>
        </HookFormSelectInput>
      </Grid>
      <Grid item xs={12}>
        <VerticalLabelInput
          inputName={inputName}
          label='Họ tên'
          type='text'
          register={register}
          error={errors?.fullName?.message.length > 0}
          helperText={errors?.fullName?.message}
          maxLength={40}
          minLength={2}
        />
      </Grid>
    </Grid>
  );
}

function ReservationForm({
  newTicketPrice,
  refundAmount,
  finalPrice,
  loading,
  errors,
  control,
  register,
  email,
  contactFullName,
  phoneNumber,
  onSubmit,
  numberOfPassengers,
}) {
  const classes = useStyles();
  return (
    <Container>
      <Box component='img' src={reserve} width='100%' />
      <Grid container spacing={5} justify='center'>
        {/* Form */}
        <Grid item xs={10}>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                {/* Contact Information Form */}
                <Box component='div' className={classes.marginTopBottom}>
                  <Typography variant='h6'>Thông tin liên hệ</Typography>
                  <ContactInfoForm
                    email={email}
                    errors={errors}
                    control={control}
                    loading={loading}
                    phoneNumber={phoneNumber}
                    contactFullName={contactFullName}
                  />
                </Box>

                {[...Array(parseInt(numberOfPassengers))].map(
                  (value, index) => {
                    const guest = `guests[${index}]`;
                    return (
                      <Paper
                        key={index}
                        className={classes.padding}
                        style={{ marginBottom: 15, marginTop: 5 }}
                      >
                        <PassengerInfoForm
                          number={index + 1}
                          inputTitle={`${guest}.title`}
                          inputName={`${guest}.fullName`}
                          control={control}
                          register={register}
                          errors={errors}
                        />
                      </Paper>
                    );
                  }
                )}

                <Box component='div' className={classes.flexEnd}>
                  <Button
                    disabled={loading ? true : false}
                    type='submit'
                    variant='contained'
                    color='secondary'
                  >
                    {loading ? (
                      <CircularProgress
                        size='24px'
                        style={{ color: 'white' }}
                      />
                    ) : (
                      'Tiếp tục'
                    )}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs>
                {/* Total Price */}
                <Box component='div' className={classes.marginTopBottom}>
                  <Typography variant='h6'>Chi tiết giá vé</Typography>
                  <Paper className={classes.padding}>
                    <Grid container spacing={2}>
                      <Grid item container spacing={2}>
                        <Grid item xs>
                          <Typography>Giá vé mới</Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography>
                            {convertToCurrency(newTicketPrice)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item container spacing={2}>
                        <Grid item xs>
                          <Typography>Tiền hoàn trả</Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography>
                            {convertToCurrency(refundAmount)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item container spacing={2}>
                        <Grid item xs>
                          {parseFloat(finalPrice) < 0 ? (
                            <Typography
                              style={{ color: '#4cd137', fontWeight: 700 }}
                            >
                              Tiền hoàn lại cho bạn
                            </Typography>
                          ) : (
                            <Typography
                              style={{ color: '#eb2f06', fontWeight: 700 }}
                            >
                              Tiền bạn phải trả
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs container justify='flex-end'>
                          <TextField
                            name='totalPrice'
                            size='medium'
                            style={{ color: '#ec1e20' }}
                            value={convertToCurrency(
                              Math.abs(parseFloat(finalPrice))
                            )}
                            inputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  let contactFullName = '',
    phoneNumber = '',
    email = '';

  if (isAuthenticated) {
    contactFullName = `${state.user.firstName} ${state.user.lastName}`;
    phoneNumber = state.user.phoneNumber;
    email = state.user.email;
  }

  return {
    email,
    contactFullName,
    phoneNumber,
  };
}

export default connect(mapStateToProps)(ReservationForm);
