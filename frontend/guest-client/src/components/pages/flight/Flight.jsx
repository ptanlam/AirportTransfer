import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FlightContent from './flightContent/FlightContent';
import FlightTableBookingTicketOneWayRoundTripManagement from './flightTableBookingTicket/FlightTableBookingTicketOneWayRoundTripManagement';

const useStyles = makeStyles({
  marginTop: {
    marginTop: 120,
  },
});

export default function Flight() {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          Vé Máy Bay Giá Rẻ Nhất, Nhiều Khuyến Mãi Hấp Dẫn 2021 | Traveloka
        </title>
      </Helmet>

      <Box component='div' className={classes.marginTop}>
        <Container maxWidth='xl' style={{ backgroundColor: '#2d88ff' }}>
          <Container>
            <Grid container spacing={2}>
              <FlightTableBookingTicketOneWayRoundTripManagement />
            </Grid>
          </Container>
        </Container>
        <Container maxWidth='md' style={{ marginTop: 20 }}>
          <FlightContent />
        </Container>
      </Box>
    </>
  );
}
