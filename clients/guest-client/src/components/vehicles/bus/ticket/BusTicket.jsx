import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import getPlaceFromDescription from '../../../../utils/getJourneyFromStations';
import convertToCurrency from '../../../../utils/convertToCurrency';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
  ticket: {
    background: 'white',
    borderRadius: 20,
    padding: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    margin: 10,
    padding: 10,
    color: 'white',
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
});

const BusDetails = ({ name, stations, rank }) => {
  return (
    <Box component='div' style={{ width: '100%' }}>
      <Typography variant='h5'>
        {name} - {rank}
      </Typography>
      <Typography variant='caption' color='textSecondary'>
        {getPlaceFromDescription(stations)}
      </Typography>
      <Grid container>
        <Grid item xs={5}>
          <Typography variant='subtitle2'>
            {stations[0].description.split(',')[0]}
          </Typography>
        </Grid>
        <Grid item xs={2} container justify='center' alignItems='center'>
          <ArrowRightAltIcon />
        </Grid>
        <Grid item xs={5}>
          <Typography variant='subtitle2'>
            {stations[stations.length - 1].description.split(',')[0]}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function BusTicket({
  date,
  rank,
  name,
  price,
  options,
  stations,
  photoUrl,
  totalPrice,
  partnerLogo,
  openOrderForm,
  idOfDepartureAt,
  handleOrderTicket,
  openTimeSchedules,
  numberOfPassengers,
  handleOpenOrderForm,
  handleCloseOrderForm,
  handleOpenTimeSchedules,
  handleCloseTimeSchedules,
  handleChangeIdOfDepartureAt,
}) {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.ticket}>
      <Grid container spacing={1}>
        <Grid item container spacing={4}>
          {/* Ticket Image */}
          <Grid item xs={3}>
            <Box
              component='img'
              src={photoUrl}
              alt={name}
              width='100%'
              height='100%'
              borderRadius='5px'
            />
          </Grid>
          {/* Ticket Journeys */}
          <Grid item xs={6} container>
            <BusDetails name={name} stations={stations} rank={rank} />
          </Grid>
          {/* Ticket Price */}
          <Grid item xs={3} container>
            <Grid item xs container justify='center'>
              <Typography variant='body1'>
                <span style={{ fontSize: 20, color: '#fa6d0a' }}>
                  {convertToCurrency(price)}
                </span>
                /người
              </Typography>
            </Grid>
            <Grid item xs container justify='flex-end'>
              <Grid item xs={1}>
                <Box
                  component='img'
                  src='https://d1785e74lyxkqq.cloudfront.net/next-asset/_next/static/images/ic_check_rounded-12px-1TFCk.svg'
                  alt='check icon'
                />
              </Grid>
              <Grid item xs>
                <Typography variant='caption'>
                  Bao gồm xăng, phí cầu đường, đậu xe
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ backgroundColor: '#d43d31' }}
                fullWidth
                className={classes.button}
                onClick={
                  idOfDepartureAt === ''
                    ? () => {
                        toast.warning('Hãy chọn lịch trình di chuyển');
                      }
                    : () => {
                        handleOpenOrderForm();
                      }
                }
              >
                <Typography>Chọn</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Time Schedules */}
        <Grid item container>
          <Grid item xs={3} container justify='center'>
            <Box
              component='img'
              src={partnerLogo}
              height='35px'
              borderRadius='6px'
            />
          </Grid>
          <Grid item xs={6} container>
            <Grid item xs>
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleOpenTimeSchedules}
              >
                Lịch trình di chuyển
              </Button>
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>
      </Grid>

      {/* Time Schedules Dialog */}
      <Dialog
        fullWidth
        open={openTimeSchedules}
        onClose={handleCloseTimeSchedules}
        aria-labelledby='time-schedules-dialog'
      >
        <DialogContent>
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='time-schedules'
              name='timeSchedules'
              value={idOfDepartureAt}
              onChange={handleChangeIdOfDepartureAt}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={`${option.departureAt} ➡ ${option.arrivalAt}`}
                  onClick={handleCloseTimeSchedules}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Dialog>

      {/* Order Form Dialog */}
      <Dialog open={openOrderForm} onClose={handleCloseOrderForm}>
        <DialogContent>
          <BusDetails name={name} stations={stations} rank={rank} />
        </DialogContent>
        <DialogContent style={{ background: '#e6eaed' }}>
          <Grid container spacing={1}>
            <Grid item>
              <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
                Chi tiết đón xe
              </Typography>
              <Typography>Từ {stations[0].description}</Typography>
              <Typography>
                {date}{' '}
                {
                  options?.[
                    options?.findIndex(
                      (option) => option.id === idOfDepartureAt
                    )
                  ]?.departureAt
                }
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>
                Chi tiết xuống xe
              </Typography>
              <Typography>
                Đến {stations[stations.length - 1].description}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs container>
              <Grid item container justify='flex-end'>
                <Typography variant='subtitle2'>
                  Tổng giá tiền cho {numberOfPassengers} người
                </Typography>
              </Grid>
              <Grid item xs container justify='flex-end'>
                <Typography variant='h6' style={{ color: '#fa6d0a' }}>
                  {convertToCurrency(totalPrice)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3} container justify='center' alignItems='center'>
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
    </Box>
  );
}
