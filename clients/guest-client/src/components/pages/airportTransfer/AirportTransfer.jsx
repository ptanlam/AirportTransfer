import React from 'react';
import Helmet from 'react-helmet';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AirportTransferContent from './airportTransferContent/AirportTransferContent';
import AirportTransferTableBookingRouteManagement from './airportTransferTableBookingRoute/AirportTransferTableBookingRouteManagement';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
  },
  background: {
    maxHeight: 320,
    background: 'linear-gradient(180deg, #1ba0e2 0%, #1ba0e2 50%, #0770cd 80%)',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  heading: {
    marginBottom: 10,
    fontWeight: 700,
    color: 'white',
  },
  color: {
    color: 'white',
  },
});

function TableHeading() {
  const classes = useStyles();
  return (
    <Grid item xs={12} container>
      <Grid item xs={6}>
        <Typography variant='h5' className={classes.heading}>
          Đến sân bay không còn mệt mỏi
        </Typography>
        <Typography variant='body1' className={classes.color}>
          Biến chuyến đi đến và từ sân bay đi trở nên tiện lợi nhất có thể! Với
          nhiều lựa chọn phương tiện phù hợp với nhu cầu của bạn, hãy đặt ngay
          xe đưa đón sân bay hôm nay để bớt đi một nỗi lo nhé.
        </Typography>
      </Grid>
      <Grid item xs={6} />
    </Grid>
  );
}

export default function AirportTransfer() {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Đặt xe đưa đón sân bay tại Traveloka!</title>
      </Helmet>
      {/* ========== Main ========== */}
      <Box component='div' className={classes.main}>
        <Container maxWidth='xl' className={classes.container}>
          <Container maxWidth='xl' className={classes.background}>
            {/* Table Heading */}
            <Container maxWidth='md'>
              <Box component='div' className={classes.flex}>
                <Grid container>
                  <TableHeading />
                </Grid>
              </Box>
            </Container>
            {/* Table Booking Route */}
            <AirportTransferTableBookingRouteManagement />
          </Container>
          {/* Content */}
          <AirportTransferContent />
        </Container>
      </Box>
    </>
  );
}
