import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import classnames from 'classnames';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import BookingFormManagement from './BookingFormManagement';
import { CARS, BUSES, TRAINS, FLIGHTS } from '../../../constants';
import schedulesActions from '../../../redux/actions/schedulesActions';
import carsActions from '../../../redux/actions/carsActions';
import flightsActions from '../../../redux/actions/flightsActions';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    height: '100vh',
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
  },
  main: {
    height: '100%',
    marginTop: 100,
    padding: 30,
    background: '#e6eaed',
  },
});

function Booking({ loading, getSchedules, getCars, getFlights }) {
  const classes = useStyles();
  const history = useHistory();

  const {
    date,
    pickUpTime,
    depDistrict,
    depCity,
    depCountry,
    desDistrict,
    desCity,
    desCountry,
    numberOfPax,
    seatType,
  } = queryString.parse(history.location.search);

  const vehicleType = history.location.pathname.split('/').pop();

  useEffect(() => {
    (async function (vehicleType) {
      switch (vehicleType) {
        case 'car':
          return await getCars(date, pickUpTime, depCity, depCountry, CARS);
        case 'bus':
          return await getSchedules(
            date,
            pickUpTime,
            numberOfPax,
            depDistrict,
            depCity,
            depCountry,
            desDistrict,
            desCity,
            desCountry,
            BUSES
          );
        case 'train':
          return await getSchedules(
            date,
            pickUpTime,
            numberOfPax,
            depDistrict,
            depCity,
            depCountry,
            desDistrict,
            desCity,
            desCountry,
            TRAINS
          );
        case 'flight':
          return await getFlights(
            date,
            depCity,
            depCountry,
            desCity,
            desCountry,
            seatType,
            numberOfPax,
            FLIGHTS
          );
        default:
          break;
      }
    })();
  }, [
    getCars,
    getSchedules,
    getFlights,
    date,
    pickUpTime,
    depDistrict,
    depCity,
    depCountry,
    desDistrict,
    desCity,
    desCountry,
    numberOfPax,
    seatType,
    vehicleType,
  ]);

  return (
    <>
      {loading ? (
        <Box component='div' className={classes.box}>
          <CircularProgress color='primary' />
          <Typography color='primary' variant='h6'>
            Đang tải dữ liệu...
          </Typography>
        </Box>
      ) : (
        <Box component='div' className={classnames(classes.main, classes.flex)}>
          <Container maxWidth='md'>
            <Typography variant='h4'>
              Đặt chỗ
              <Typography color='textSecondary'>
                Điền thông tin và số lượng hành khách
              </Typography>
            </Typography>

            {/* BookingFormManagement */}
            <BookingFormManagement />
          </Container>
        </Box>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  getSchedules: schedulesActions.getSchedules,
  getCars: carsActions.getCars,
  getFlights: flightsActions.getFlightsByCondition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
