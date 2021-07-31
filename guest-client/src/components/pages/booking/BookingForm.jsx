import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import VerticalLabelInput from '../../commons/VerticalLabelInput';
import VerticalLabelInputWithDefaultValue from '../../commons/VerticalLabelInputWithDefaultValue';
import convertToCurrency from '../../../utils/convertToCurrency';
import MenuItem from '@material-ui/core/MenuItem';
import HookFormSelectInput from '../../commons/HookFormSelectInput';
import { connect } from 'react-redux';
import { Autocomplete } from '@material-ui/lab';
import { VOUCHER_API_URL } from '../../../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  const { errors, control, loading, contactFullName, phoneNumber, email } =
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
  const { register, control, errors, number, inputName, inputTitle, loading } =
    props;
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
          variant='outlined'>
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
          loading={loading}
        />
      </Grid>
    </Grid>
  );
}

function BookingForm({
  date,
  email,
  option,
  errors,
  loading,
  control,
  register,
  onSubmit,
  totalPrice,
  pickUpTime,
  lastStation,
  phoneNumber,
  vehicleType,
  firstStation,
  contactFullName,
  isAuthenticated,
  numberOfPassengers,
}) {
  const classes = useStyles();
  const [fetchingVouchersOpen, setFetchingVouchersOpen] = React.useState(false);
  const [vouchers, setVouchers] = React.useState([]);
  const [fetchingVouchers, setFetchingVouchers] = React.useState(false);

  useEffect(() => {
    let active = true;

    if (!fetchingVouchersOpen) {
      return undefined;
    }

    (async function fetchVouchers() {
      try {
        setFetchingVouchers(true);
        const response = await axios.get(
          `${VOUCHER_API_URL}/GetVouchersByTaiKhoan`,
          { params: { TaiKhoan: email }, withCredentials: false },
        );
        if (active) {
          setVouchers([
            ...response.data.recordset.filter((voucher) => voucher.Status),
          ]);
        }
      } catch (error) {
        toast.error('Đã xảy ra lỗi, vui lòng thủ lại sau!');
      } finally {
        if (active) {
          setFetchingVouchers(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [email, fetchingVouchersOpen]);

  return (
    <Grid container spacing={5}>
      {/* Form */}
      <Grid item xs={7}>
        <form onSubmit={onSubmit}>
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

          {vehicleType === 'cars'
            ? [...Array(parseInt(1))].map((value, index) => {
                const guest = `guests[${index}]`;
                return (
                  <Paper
                    key={index}
                    className={classes.padding}
                    style={{ marginBottom: 15, marginTop: 5 }}>
                    <PassengerInfoForm
                      number={index + 1}
                      inputTitle={`${guest}.title`}
                      inputName={`${guest}.fullName`}
                      control={control}
                      register={register}
                      errors={errors}
                      loading={loading}
                    />
                  </Paper>
                );
              })
            : [...Array(parseInt(numberOfPassengers))].map((value, index) => {
                const guest = `guests[${index}]`;
                return (
                  <Paper
                    key={index}
                    className={classes.padding}
                    style={{ marginBottom: 15, marginTop: 5 }}>
                    <PassengerInfoForm
                      number={index + 1}
                      inputTitle={`${guest}.title`}
                      inputName={`${guest}.fullName`}
                      control={control}
                      register={register}
                      errors={errors}
                      loading={loading}
                    />
                  </Paper>
                );
              })}

          {/* Total Price */}
          <Box component='div' className={classes.marginTopBottom}>
            <Typography variant='h6'>Chi tiết giá vé</Typography>
            <Paper className={classes.padding}>
              <Grid container direction='column' style={{ gap: 10 }}>
                {isAuthenticated && (
                  <Grid container item>
                    <Grid item xs={6}>
                      <Typography variant='h6'>Mã voucher (nếu có)</Typography>
                    </Grid>
                    <Grid item container justify='flex-end' xs={6}>
                      <Autocomplete
                        id='asynchronous-demo'
                        style={{ width: 300 }}
                        open={fetchingVouchersOpen}
                        onOpen={() => {
                          setFetchingVouchersOpen(true);
                        }}
                        onClose={() => {
                          setFetchingVouchersOpen(false);
                        }}
                        getOptionSelected={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => option.Code}
                        options={vouchers}
                        loading={fetchingVouchers}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            size='small'
                            name='voucherCode'
                            inputRef={register}
                            variant='outlined'
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {fetchingVouchers ? (
                                    <CircularProgress
                                      color='inherit'
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}
                <Grid container item>
                  <Grid item xs={6}>
                    <Typography variant='h6'>Giá bạn trả</Typography>
                  </Grid>
                  <Grid item container justify='flex-end' xs={6}>
                    <TextField
                      name='totalPrice'
                      size='medium'
                      style={{ color: '#fa6d0a' }}
                      value={convertToCurrency(parseInt(totalPrice))}
                      inputProps={{
                        readOnly: true,
                        disabled: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Box component='div' className={classes.flexEnd}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading ? true : false}>
              {loading ? (
                <CircularProgress size='24px' style={{ color: 'white' }} />
              ) : (
                'Tiếp tục'
              )}
            </Button>
          </Box>
        </form>
      </Grid>

      {/* Schedule Short Details */}
      <Grid item xs={5}>
        {vehicleType === 'cars' || vehicleType === 'flights' ? null : (
          <Paper style={{ padding: 10, marginTop: 50 }}>
            <Grid container alignItems='center' spacing={2}>
              <Grid item container>
                <Grid item xs container justify='center' alignItems='center'>
                  <EmojiTransportationIcon />
                </Grid>
                <Grid item xs={9}>
                  <Typography>Từ {firstStation}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography>
                  {date} | {pickUpTime}
                </Typography>
              </Grid>
              <Grid item container>
                <Grid item container justify='flex-start'>
                  <Timeline align='alternate'>
                    <TimelineItem>
                      {!!option?.departureAt && (
                        <TimelineOppositeContent>
                          <Typography color='textSecondary'>
                            {option.departureAt}
                          </Typography>
                        </TimelineOppositeContent>
                      )}
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography>{firstStation}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      {!!option?.arrivalAt && (
                        <TimelineOppositeContent>
                          <Typography color='textSecondary'>
                            {option?.arrivalAt}
                          </Typography>
                        </TimelineOppositeContent>
                      )}
                      <TimelineSeparator>
                        <TimelineDot />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography>{lastStation}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Grid>
    </Grid>
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
    isAuthenticated: state.user.isAuthenticated,
  };
}

export default connect(mapStateToProps)(BookingForm);
