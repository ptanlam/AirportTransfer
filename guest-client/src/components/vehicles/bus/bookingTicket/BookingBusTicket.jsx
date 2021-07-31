import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import convertToCurrency from '../../../../utils/convertToCurrency';
import getPlaceFromDescription from '../../../../utils/getJourneyFromStations';

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

function BusShortDescription({ name, stations, photoUrl }) {
  return (
    <Grid container direction='column'>
      <Grid item container spacing={1}>
        <Grid item xs={3}>
          <Box component='img' src={photoUrl} width='100%' borderRadius='5px' />
        </Grid>
        <Grid item xs container direction='column' justify='center'>
          <Grid item>
            <Typography variant='h6'>{name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='caption' color='textSecondary'>
              {getPlaceFromDescription(stations)}
            </Typography>
          </Grid>
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
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function BookingBusTicket({
  id,
  classId,
  date,
  createdAt,
  departureAt,
  name,
  totalPrice,
  photoUrl,
  stations,
  partnerId,
  guestName,
  guestTitle,
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
    vehicleType: 'buses',
    partnerId: partnerId,
    oldTicketId: id,
    oldTicketPrice: totalPrice,
    purchaseDate: createdAt,
    departureAt: date + ' ' + departureAt,
    classId: classId,
    policyType: 'cancellation',
  };

  const isAvailable =
    !isCancelled && new Date(refundTicket.departureAt) > new Date();

  return (
    <Grid
      container
      spacing={2}
      className={isAvailable ? null : classes.background}>
      <Grid item container justify='center' alignItems='center'>
        <Grid item xs container direction='column'>
          <Typography style={{ fontSize: '24px' }}>Vé xe buýt</Typography>
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
                Ngày khởi hành: <span className={classes.text}>{date}</span>
              </Typography>
              <Typography>
                Giờ khởi hành:{' '}
                <span className={classes.text}>{departureAt}</span>
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
            <Grid container direction='column'>
              <Grid item>
                <BusShortDescription
                  name={name}
                  stations={stations}
                  photoUrl={photoUrl}
                />
              </Grid>
              <Grid item container justify='flex-end'>
                <Typography
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#fca000',
                  }}>
                  {convertToCurrency(totalPrice)}
                </Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}
