import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import convertToCurrency from '../../../../utils/convertToCurrency';
import getPlaceFromDescription from '../../../../utils/getJourneyFromStations';
import convertToDateTimeString from '../../../../utils/convertToDateTimeString';
import convertToDateString from '../../../../utils/convertToDateString';

const useStyles = makeStyles({
  accordion: {
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  background: {
    opacity: 0.5,
  },
});

function FlightShortDescription({
  photoUrl,
  name,
  stations,
  seatType,
  seatPosition,
}) {
  const classes = useStyles();
  return (
    <Grid item container justify='center' alignItems='center' spacing={3}>
      <Grid item xs>
        <Box component='img' src={photoUrl} width='100%' borderRadius='5px' />
      </Grid>
      <Grid item xs={8} container>
        <Grid item>
          <Typography className={classes.text}>{name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant='caption' color='textSecondary'>
            {getPlaceFromDescription(stations)}
          </Typography>
        </Grid>
        <Grid item container>
          <Typography variant='subtitle1'>Hạng ghế: {seatType}</Typography>
        </Grid>
        <Grid item container>
          <Typography variant='subtitle1'>Chỗ ngồi: {seatPosition}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function BookingFlightTicket({
  id,
  departureAt,
  createdAt,
  guestName,
  guestTitle,
  name,
  partnerId,
  photoUrl,
  stations,
  classId,
  totalPrice,
  seatType,
  seatPosition,
  scheduleDetailId,
  handleGetScheduleDetailId,
  handleCheckPolicyToCancelTicket,
  handleCheckPolicyToChangeTicket,
  loadingPolicyToCancel,
  loadingPolicyToChange,
  canBeManipulated,
  isCancelled,
}) {
  const classes = useStyles();
  const refundTicket = {
    vehicleType: 'flights',
    partnerId,
    oldTicketId: id,
    oldTicketPrice: totalPrice,
    purchaseDate: createdAt,
    departureAt,
    classId,
    policyType: 'cancellation',
  };

  const isAvailable = !isCancelled && new Date(departureAt) > new Date();

  return (
    <Grid
      container
      spacing={2}
      className={isAvailable ? null : classes.background}>
      <Grid item container justify='center' alignItems='center'>
        <Grid item xs container direction='column'>
          <Typography style={{ fontSize: '24px' }}>Vé máy bay</Typography>
          <Grid container>
            <Grid item xs>
              <Typography>
                Họ tên: <span className={classes.text}>{guestName}</span>
              </Typography>
              <Typography>
                Danh xưng: <span className={classes.text}>{guestTitle}</span>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>
                Ngày khởi hành:{' '}
                <span className={classes.text}>
                  {convertToDateString(departureAt)}
                </span>
              </Typography>
              <Typography>
                Giờ khởi hành:{' '}
                <span className={classes.text}>
                  {convertToDateTimeString(departureAt)}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} container justify='flex-end' spacing={1}>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                refundTicket.policyType = 'exchange';
                handleCheckPolicyToChangeTicket(refundTicket);
              }}
              disabled={
                loadingPolicyToChange
                  ? true
                  : false || !canBeManipulated || !isAvailable
              }>
              {loadingPolicyToChange ? 'Kiểm tra...' : 'Đổi vé'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => {
                handleCheckPolicyToCancelTicket(refundTicket);
                handleGetScheduleDetailId(scheduleDetailId);
              }}
              disabled={
                loadingPolicyToCancel
                  ? true
                  : false || !canBeManipulated || !isAvailable
              }>
              {loadingPolicyToCancel ? 'Kiểm tra...' : 'Hủy vé'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography style={{ fontWeight: 'bold', color: '#fa6d0a' }}>
              Chi tiết vé
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction='column' spacing={2}>
              <FlightShortDescription
                name={name}
                photoUrl={photoUrl}
                stations={stations}
                seatType={seatType}
                seatPosition={seatPosition}
              />

              <Grid item container justify='flex-end'>
                <Typography
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#fca000',
                  }}>
                  {convertToCurrency(parseFloat(totalPrice))}
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}
