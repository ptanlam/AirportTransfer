import React from 'react';
import { Button, makeStyles, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import convertToCurrency from '../../../../utils/convertToCurrency';
import convertToDateTimeString from '../../../../utils/convertToDateTimeString';
import convertToDateString from '../../../../utils/convertToDateString';

const useStyles = makeStyles({
  ticket: {
    background: 'white',
    borderRadius: 20,
    boxShadow: '5px 5px 10px #ccc',
    padding: 20,
    marginBottom: 30,
  },
  button: {
    borderRadius: 5,
    margin: 10,
    padding: 10,
    color: 'white',
  },
});

function FlightDetails({
  openFlightDetails,
  handleOpenFlightDetails,
  journeys,
}) {
  return (
    <Grid item container direction='column'>
      <Grid item xs>
        <Button onClick={handleOpenFlightDetails}>Chi tiết chuyến bay</Button>
      </Grid>
      <Grid item xs>
        {openFlightDetails ? (
          <Timeline align='alternate'>
            {journeys.map((journey, index) => (
              <Box key={index}>
                {index % 2 === 0 && (
                  <Typography
                    variant='subtitle1'
                    style={{ fontWeight: 'bold' }}
                  >
                    Ngày {convertToDateString(journey.departureAt)}
                  </Typography>
                )}
                <TimelineItem>
                  <TimelineOppositeContent>
                    <Typography color='textSecondary'>
                      {index % 2 === 0
                        ? convertToDateTimeString(journey.departureAt)
                        : convertToDateTimeString(journey.arrivalAt)}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index % 2 === 0 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>{journey.description}</Typography>
                  </TimelineContent>
                </TimelineItem>
              </Box>
            ))}
          </Timeline>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default function FlightExchangeTicket({
  loadingGetFinalPrice,
  partnerPhoto,
  partnerName,
  name,
  depCity,
  desCity,
  departureAt,
  arrivalAt,
  price,
  journeys,
  openFlightDetails,
  handleOpenFlightDetails,
  handleOrderTicket,
  openOrderForm,
  handleCloseOrderForm,
  handleGetFinalPrice,
}) {
  const classes = useStyles();
  return (
    <Container maxWidth='md'>
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
                  {journeys.length > 2 ? (
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
                  onClick={() => handleGetFinalPrice(price)}
                >
                  {loadingGetFinalPrice ? (
                    <CircularProgress size='24px' style={{ color: 'white' }} />
                  ) : (
                    <Typography>Chọn</Typography>
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Flight Details */}
          <FlightDetails
            openFlightDetails={openFlightDetails}
            handleOpenFlightDetails={handleOpenFlightDetails}
            journeys={journeys}
          />

          {/* Form Dialog */}
          <Dialog open={openOrderForm} onClose={handleCloseOrderForm}>
            <DialogContent>
              <Typography variant='h6'>
                Chuyến bay {name} của hãng hàng không {partnerName}
              </Typography>
            </DialogContent>
            <DialogContent style={{ background: '#e6eaed' }}>
              <Timeline align='alternate'>
                {journeys.map((journey, index) => (
                  <Box key={index}>
                    {index % 2 === 0 && (
                      <Typography
                        variant='subtitle1'
                        style={{ fontWeight: 'bold' }}
                      >
                        Ngày {convertToDateString(journey.departureAt)}
                      </Typography>
                    )}
                    <TimelineItem>
                      <TimelineOppositeContent>
                        <Typography color='textSecondary'>
                          {index % 2 === 0
                            ? convertToDateTimeString(journey.departureAt)
                            : convertToDateTimeString(journey.arrivalAt)}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        {index % 2 === 0 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography>{journey.description}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  </Box>
                ))}
              </Timeline>
            </DialogContent>
            <DialogActions>
              <Grid container justify='flex-end' alignItems='center'>
                <Button
                  fullWidth
                  variant='contained'
                  color='secondary'
                  onClick={() => {
                    handleOrderTicket();
                  }}
                >
                  Đặt ngay
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>
        </Grid>
      </Box>
    </Container>
  );
}
