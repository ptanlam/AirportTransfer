import React from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import NoVehicle from '../../commons/NoVehicle';
import SkeletonLoading from '../../commons/SkeletonLoading';
import VehicleListManagement from '../../vehicles/VehiclesListManagement';

const useStyles = makeStyles({
  main: {
    width: '100%',
    minHeight: '100vh',
    marginTop: 100,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#e5e9ed',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30,
  },
  paper: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
    padding: 20,
  },
});

export default function FlightSearching({
  flights,
  date,
  numberOfPax,
  seatType,
  depDescription,
  desDescription,
  loading,
}) {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.main}>
      <Container maxWidth='md'>
        <Paper className={classes.paper}>
          <Typography variant='h6'>
            {depDescription} - {desDescription}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {date} | {numberOfPax} hành khách | {seatType}
          </Typography>
        </Paper>
        {/* Flights List  */}
        {loading ? (
          <SkeletonLoading />
        ) : flights.length === 0 ? (
          <NoVehicle vehicleType='flight' />
        ) : (
          <VehicleListManagement vehicleType='flights' />
        )}
      </Container>
    </Box>
  );
}
