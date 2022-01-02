import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import convertToCurrency from '../../../../utils/convertToCurrency';
import convertToDateTimeString from '../../../../utils/convertToDateTimeString';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    borderRadius: 5,
    margin: 10,
    padding: 10,
    color: 'white',
  },
  ticket: {
    background: 'white',
    borderRadius: 20,
    padding: 30,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default function FlightTicket({
  price,
  depCity,
  desCity,
  journeys,
  arrivalAt,
  departureAt,
  departureDate,
  partnerName,
  partnerPhoto,
  containerFlight,
  openFlightDetails,
  handleOrderTicket,
  handleOpenFlightDetails,
}) {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.ticket}>
      <Grid container direction='column'>
        <Grid item container spacing={1}>
          <Grid item xs={4} container justify='center' alignItems='center'>
            <Grid item xs>
              <Box
                component='img'
                src={partnerPhoto}
                width='100%'
                height='100%'
              />
            </Grid>
            <Grid item xs container justify='center'>
              <Typography>{partnerName}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={5} container justify='center' alignItems='center'>
            <Grid item xs container>
              <Grid item xs>
                <Typography>{departureAt}</Typography>
                <Typography>{depCity}</Typography>
              </Grid>
              <Grid item xs>
                <Typography>{arrivalAt}</Typography>
                <Typography>{desCity}</Typography>
              </Grid>
              <Grid item xs>
                {journeys.length > 1 ? (
                  <Typography>Có điểm dừng</Typography>
                ) : (
                  <Typography>Bay thẳng</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} container>
            <Grid item xs>
              <Typography variant='body1'>
                <span style={{ fontSize: 18, color: '#fa6d0a' }}>
                  {convertToCurrency(price)}
                </span>
                /khách
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ backgroundColor: '#d43d31' }}
                fullWidth
                className={classes.button}
                onClick={handleOrderTicket}
              >
                Chọn
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Flight Details */}
        <Grid item xs>
          <Button onClick={handleOpenFlightDetails}>Chi tiết chuyến bay</Button>
        </Grid>
        <Grid item xs>
          {openFlightDetails ? (
            <Portal container={containerFlight.current}>
              <Typography variant='subtitle1' style={{ fontWeight: 'bold' }}>
                Ngày {departureDate}
              </Typography>
              <Timeline align='alternate'>
                {journeys.map((journey, index) =>
                  journey.stations.map((station, stationIndex) => (
                    <TimelineItem key={stationIndex}>
                      <Typography></Typography>
                      <TimelineOppositeContent>
                        <Typography color='textSecondary'>
                          {stationIndex === 0
                            ? convertToDateTimeString(journey.departureAt)
                            : convertToDateTimeString(journey.arrivalAt)}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        {stationIndex < journeys[0].stations.length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography>{station.description}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))
                )}
              </Timeline>
            </Portal>
          ) : null}
          <div ref={containerFlight} />
        </Grid>
      </Grid>
    </Box>
  );
}
