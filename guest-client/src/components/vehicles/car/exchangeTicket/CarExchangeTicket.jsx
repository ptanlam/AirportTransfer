import React from 'react';
import classnames from 'classnames';
import { Container, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import convertToCurrency from '../../../../utils/convertToCurrency';
import ToggleClick from '../../../commons/ToggleClick';

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    margin: 10,
    padding: 10,
    color: 'white',
  },
  margin: {
    marginRight: 8,
  },
  carItem: {
    width: '100%',
    height: 55,
    background: 'transparent',
    borderRadius: 5,
    border: '2px solid #ccc',
    padding: 10,
  },
  ticket: {
    background: 'white',
    borderRadius: 20,
    padding: 30,
    boxShadow: '0px 0px 5px #ccc',
    marginTop: 10,
    marginBottom: 10,
  },
});

function CarDetails({ name, partnerId, guestQuantity, luggagePayload }) {
  const classes = useStyles();
  return (
    <>
      <Typography variant='h5'>{name}</Typography>
      <Typography variant='subtitle1'>Partner id: {partnerId}</Typography>
      <Grid item container spacing={1}>
        <Grid item>
          <Typography variant='subtitle1' className={classes.flex}>
            <PersonIcon className={classes.margin} /> {guestQuantity} hành khách
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='subtitle1' className={classes.flex}>
            <WorkIcon className={classes.margin} /> {luggagePayload} hành lý
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

function CarItem({ title, content }) {
  const classes = useStyles();
  return (
    <Grid item xs container direction='column'>
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>
        <Box
          component='div'
          className={classnames(classes.carItem, classes.flex)}
        >
          <Typography>{content}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default function CarExchangeTicket({
  loadingGetFinalPrice,
  date,
  pickUpTime,
  depDescription,
  desDescription,
  name,
  guestQuantity,
  luggagePayload,
  photoUrl,
  price,
  partnerId,
  numberOfCarsAvailable,
  handleOrderTicket,
  openOrderForm,
  handleCloseOrderForm,
  numberOfCars,
  handleIncreaseNumberOfCars,
  handleDecreaseNumberOfCars,
  handleGetFinalPrice,
}) {
  const classes = useStyles();

  return (
    <Container maxWidth='md'>
      <Box component='div' className={classes.ticket}>
        <Grid container spacing={3}>
          {/* Ticket Image */}
          <Grid item xs={3}>
            <Box
              component='img'
              src={photoUrl}
              alt=''
              width='100%'
              height='100%'
            />
          </Grid>
          {/* Ticket Details */}
          <Grid item xs>
            <CarDetails
              name={name}
              partnerId={partnerId}
              guestQuantity={guestQuantity}
              luggagePayload={luggagePayload}
            />
          </Grid>
          {/* Ticket Price */}
          <Grid item xs={3} container direction='column'>
            <Grid item xs container justify='center' alignItems='center'>
              <Typography variant='body2'>
                <span style={{ fontSize: 20, color: '#fa6d0a' }}>
                  {convertToCurrency(price)}
                </span>
                /xe
              </Typography>
            </Grid>
            <Grid item xs container justify='flex-end' alignItems='center'>
              <Grid item xs>
                <Box
                  component='img'
                  src='https://d1785e74lyxkqq.cloudfront.net/next-asset/_next/static/images/ic_check_rounded-12px-1TFCk.svg'
                  alt='check icon'
                />
              </Grid>
              <Grid item xs={11}>
                <Typography variant='caption'>
                  Bao gồm xăng, phí cầu đường, đậu xe
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              <Button
                style={{ backgroundColor: '#d43d31' }}
                fullWidth
                className={classes.button}
                onClick={() => {
                  handleGetFinalPrice(price);
                }}
                disabled={loadingGetFinalPrice ? true : false}
              >
                {loadingGetFinalPrice ? (
                  <CircularProgress size='24px' style={{ color: 'white' }} />
                ) : (
                  <Typography>Chọn</Typography>
                )}
              </Button>
            </Grid>
          </Grid>

          {/* Dialog Order Form */}
          <Dialog open={openOrderForm} onClose={handleCloseOrderForm} fullWidth>
            <DialogContent>
              <CarDetails
                name={name}
                partnerId={partnerId}
                guestQuantity={guestQuantity}
                luggagePayload={luggagePayload}
              />
            </DialogContent>
            <DialogContent style={{ background: '#e6eaed', padding: 20 }}>
              <Grid container direction='column' spacing={3}>
                <Grid item>
                  <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Chi tiết đón xe
                  </Typography>
                  <Grid container spacing={2}>
                    <CarItem title='Từ' content={`${depDescription}`} />
                    <Grid item container spacing={2}>
                      <CarItem title='Ngày đón' content={`${date}`} />
                      <CarItem title='Giờ đón' content={`${pickUpTime}`} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Chi tiết xuống xe
                  </Typography>
                  <Grid container spacing={2}>
                    <CarItem title='Đến' content={`${desDescription}`} />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogContent>
              <Grid container>
                <ToggleClick
                  label='Số xe'
                  sublabel={`Số lượng xe hiện có ${numberOfCarsAvailable}`}
                  number={numberOfCars}
                  handleClickIncrease={handleIncreaseNumberOfCars}
                  handleClickDecrease={handleDecreaseNumberOfCars}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Grid container spacing={2}>
                <Grid item xs container>
                  <Grid item container justify='flex-end'>
                    <Typography variant='subtitle2'>
                      Tổng giá tiền cho {numberOfCars} xe
                    </Typography>
                  </Grid>
                  <Grid item xs container justify='flex-end'>
                    <Typography variant='h6' style={{ color: '#fa6d0a' }}>
                      {convertToCurrency(price * numberOfCars)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={4}
                  container
                  justify='center'
                  alignItems='center'
                >
                  <Button
                    fullWidth
                    variant='contained'
                    color='secondary'
                    onClick={handleOrderTicket}
                  >
                    Đặt ngay
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        </Grid>
      </Box>
    </Container>
  );
}
