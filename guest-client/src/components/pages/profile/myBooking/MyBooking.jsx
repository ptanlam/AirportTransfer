import {
  Box,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import BookingBusTicket from '../../../vehicles/bus/bookingTicket/BookingBusTicket';
import BookingCarTicket from '../../../vehicles/car/bookingTicket/BookingCarTicket';
import BookingFlightTicket from '../../../vehicles/flight/bookingTicket/BookingFlightTicket';
import BookingTrainTicket from '../../../vehicles/train/bookingTicket/BookingTrainTicket';

const useStyles = makeStyles({
  paper: {
    height: 'auto',
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    background:
      'linear-gradient(90deg, rgba(60,110,247,1) 0%, rgba(111,159,255,1) 41%, rgba(84,166,247,1) 100%)',
    color: 'white',
  },
});

export default function MyBooking({
  tickets,
  loadingTickets,
  loadingPolicyToCancel,
  loadingPolicyToChange,
  handleGetScheduleDetailId,
  handleCheckPolicyToChangeTicket,
  handleCheckPolicyToCancelTicket,
}) {
  const classes = useStyles();

  return (
    <>
      {loadingTickets ? (
        <Box display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      ) : tickets.length === 0 ? (
        <Box p={3}>
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={3}>
              <Box
                component='img'
                src='https://ik.imagekit.io/tvlk/image/imageResource/2017/05/23/1495539753478-be3f37a9133fa6e3f40688781d07e885.png?tr=q-75'
                width='50%'
              />
            </Grid>
            <Grid item xs>
              <Typography style={{ fontWeight: 'bold' }}>
                Không tìm thấy đặt chỗ
              </Typography>
              <Typography>
                Mọi chỗ bạn đặt sẽ được hiển thị tại đây. Hiện bạn chưa có bất
                kỳ đặt chỗ nào, hãy đặt trên trang chủ ngay!
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box component='div'>
          {/* eslint-disable-next-line */}
          {tickets.map((ticket, index) => {
            const vehicleType = ticket.ticket.vehicleType;
            const canBeManipulated = ticket.ticket.canBeManipulated;
            switch (vehicleType) {
              case 'cars':
                return (
                  <Paper key={index} className={classes.paper}>
                    <BookingCarTicket
                      id={ticket.ticket.id}
                      classId={ticket.ticket.classId}
                      totalPrice={ticket.ticket.ticketPrice}
                      partnerId={ticket.ticket.partnerId}
                      guestName={ticket.ticket.fullName}
                      guestTitle={ticket.ticket.title}
                      createdAt={ticket.ticket.createdAt}
                      scheduleDetailId={ticket.ticket.scheduleDetailId}
                      isCancelled={ticket.ticket.isCancelled}
                      date={ticket.schedule.date}
                      departureAt={ticket.schedule.departureAt}
                      name={ticket.carModel?.[0]?.name}
                      guestQuantity={ticket.carModel?.[0]?.guestQuantity}
                      luggage={ticket.carModel?.[0]?.luggagePayload}
                      photoUrl={ticket.carModel?.[0]?.photoUrl}
                      stations={ticket.stations}
                      cars={ticket.cars}
                      handleGetScheduleDetailId={handleGetScheduleDetailId}
                      handleCheckPolicyToCancelTicket={
                        handleCheckPolicyToCancelTicket
                      }
                      handleCheckPolicyToChangeTicket={
                        handleCheckPolicyToChangeTicket
                      }
                      loadingPolicyToCancel={loadingPolicyToCancel}
                      loadingPolicyToChange={loadingPolicyToChange}
                      canBeManipulated={canBeManipulated}
                    />
                  </Paper>
                );
              case 'buses':
                return (
                  <Paper key={index} className={classes.paper}>
                    <BookingBusTicket
                      date={ticket.date}
                      id={ticket.ticket.id}
                      classId={ticket.ticket.classId}
                      createdAt={ticket.ticket.createdAt}
                      totalPrice={ticket.ticket.ticketPrice}
                      partnerId={ticket.ticket.partnerId}
                      guestName={ticket.ticket.fullName}
                      guestTitle={ticket.ticket.title}
                      scheduleDetailId={ticket.ticket.scheduleDetailId}
                      isCancelled={ticket.ticket.isCancelled}
                      departureAt={ticket.details?.[0]?.departureAt}
                      stations={ticket.stations}
                      name={ticket.bus.name}
                      photoUrl={ticket.bus.photoUrl}
                      handleGetScheduleDetailId={handleGetScheduleDetailId}
                      handleCheckPolicyToCancelTicket={
                        handleCheckPolicyToCancelTicket
                      }
                      handleCheckPolicyToChangeTicket={
                        handleCheckPolicyToChangeTicket
                      }
                      loadingPolicyToCancel={loadingPolicyToCancel}
                      loadingPolicyToChange={loadingPolicyToChange}
                      canBeManipulated={canBeManipulated}
                    />
                  </Paper>
                );
              case 'trains':
                return (
                  <Paper key={index} className={classes.paper}>
                    <BookingTrainTicket
                      date={ticket.date}
                      departureAt={ticket.departureAt}
                      id={ticket.ticket.id}
                      classId={ticket.ticket.classId}
                      createdAt={ticket.ticket.createdAt}
                      totalPrice={ticket.ticket.ticketPrice}
                      partnerId={ticket.ticket.partnerId}
                      guestName={ticket.ticket.fullName}
                      guestTitle={ticket.ticket.title}
                      scheduleDetailId={ticket.ticket.scheduleDetailId}
                      isCancelled={ticket.ticket.isCancelled}
                      stations={ticket.stations}
                      name={ticket.train.name}
                      photoUrl={ticket.train.photoUrl}
                      handleGetScheduleDetailId={handleGetScheduleDetailId}
                      handleCheckPolicyToCancelTicket={
                        handleCheckPolicyToCancelTicket
                      }
                      handleCheckPolicyToChangeTicket={
                        handleCheckPolicyToChangeTicket
                      }
                      loadingPolicyToCancel={loadingPolicyToCancel}
                      loadingPolicyToChange={loadingPolicyToChange}
                      canBeManipulated={canBeManipulated}
                    />
                  </Paper>
                );
              case 'flights':
                return (
                  <Paper key={index} className={classes.paper}>
                    <BookingFlightTicket
                      id={ticket.ticket.id}
                      classId={ticket.ticket.classId}
                      totalPrice={ticket.ticket.ticketPrice}
                      guestName={ticket.ticket.fullName}
                      guestTitle={ticket.ticket.title}
                      scheduleDetailId={ticket.ticket.scheduleDetailId}
                      createdAt={ticket.ticket.createdAt}
                      isCancelled={ticket.ticket.isCancelled}
                      departureAt={ticket.departureAt}
                      name={ticket.flight.name}
                      partnerId={ticket.flight.partnerId}
                      photoUrl={ticket.flight.photoUrl}
                      stations={ticket.stations}
                      seatType={ticket.details.seatType}
                      seatPosition={ticket.details.seatPosition}
                      handleGetScheduleDetailId={handleGetScheduleDetailId}
                      handleCheckPolicyToCancelTicket={
                        handleCheckPolicyToCancelTicket
                      }
                      handleCheckPolicyToChangeTicket={
                        handleCheckPolicyToChangeTicket
                      }
                      loadingPolicyToCancel={loadingPolicyToCancel}
                      loadingPolicyToChange={loadingPolicyToChange}
                      canBeManipulated={canBeManipulated}
                    />
                  </Paper>
                );
              default:
                break;
            }
          })}
          {/* // <Pagination
          //   count={totalNumberOfTickets}
          //   showFirstButton
          //   showLastButton
          //   onChange={(e, value) => handleChangePage(value)}
          // /> */}
        </Box>
      )}
    </>
  );
}
