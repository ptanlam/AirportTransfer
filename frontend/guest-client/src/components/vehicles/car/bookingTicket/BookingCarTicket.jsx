import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import convertToCurrency from '../../../../utils/convertToCurrency';

const useStyles = makeStyles({
  accordion: {
    width: '100%',
  },
  margin: {
    marginRight: 8,
    marginLeft: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  background: {
    opacity: 0.5,
  },
});

function CarShortDescription({
  name,
  guestQuantity,
  photoUrl,
  luggage,
  stations,
  cars,
}) {
  const classes = useStyles();
  return (
    <Grid item container spacing={2}>
      <Grid item container spacing={3}>
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
        <Grid item xs container direction='column' justify='center'>
          <Typography className={classes.text}>{name}</Typography>
          <Grid item container>
            <PersonIcon />
            <Typography variant='subtitle1' className={classes.margin}>
              {guestQuantity} hành khách
            </Typography>
            <WorkIcon />
            <Typography variant='subtitle1' className={classes.margin}>
              {luggage} hành lý
            </Typography>
          </Grid>
          <Grid item container>
            <Grid item xs>
              <Typography variant='subtitle2'>
                {stations[0].district}, {stations[0].city},{' '}
                {stations[0].country}
              </Typography>
            </Grid>
            <Grid item xs={1} container justify='center' alignItems='center'>
              <ArrowRightAltIcon />
            </Grid>
            <Grid item xs>
              <Typography variant='subtitle2'>
                {stations[stations.length - 1].district},
                {stations[stations.length - 1].city},
                {stations[stations.length - 1].country},
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} container justify='flex-end'>
        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 'bold', color: '#363a45' }}>
              Chi tiết xe đã đặt
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction='column' spacing={2}>
              {cars.map((car, index) => (
                <Grid item container key={index}>
                  <Grid item xs>
                    <Typography>
                      Biển số xe:{' '}
                      <span className={classes.text}>{car.licencePlate}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs container spacing={1}>
                    <Grid item>
                      <Typography>Màu xe:</Typography>
                    </Grid>
                    <Grid item xs>
                      <Box
                        width='100%'
                        height='100%'
                        style={{
                          backgroundColor: `${car.color}`,
                          boxShadow: '2px 2px 10px #ccc',
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

export default function BookingCarTicket({
  id,
  classId,
  date,
  createdAt,
  departureAt,
  name,
  totalPrice,
  guestQuantity,
  luggage,
  photoUrl,
  partnerId,
  scheduleDetailId,
  guestName,
  guestTitle,
  stations,
  cars,
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
    vehicleType: 'cars',
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
          <Typography style={{ fontSize: '24px' }}>Vé xe hơi</Typography>
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
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 'bold', color: '#fa6d0a' }}>
              Chi tiết vé
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction='column' spacing={3}>
              <Grid item container>
                <CarShortDescription
                  name={name}
                  guestQuantity={guestQuantity}
                  luggage={luggage}
                  photoUrl={photoUrl}
                  stations={stations}
                  cars={cars}
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
