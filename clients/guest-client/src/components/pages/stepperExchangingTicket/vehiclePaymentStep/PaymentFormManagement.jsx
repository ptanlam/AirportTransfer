import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import payment from '../../../../assets/images/thanh-toan.png';
import { BASE_API_URL } from '../../../../constants';
import bookingActions from '../../../../redux/actions/bookingActions';
import paymentStatusActions from '../../../../redux/actions/paymentStatusActions';
import PaymentForm from './PaymentForm';

const useStyles = makeStyles({
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

function PaymentFormManagement({
  booking,
  isAuthenticated,
  handleEndOfSession,
  handleSuccessPayment,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const vehicleType = history.location.pathname.split('/').pop();
  const {
    finalPrice,
    scheduleId,
    flightTicketIds,
    carScheduleId,
    numberOfPax,
  } = history.location.state;

  useEffect(() => {
    return () => {
      handleEndOfSession();
      history.push({
        pathname: '/',
        state: {
          scheduleId,
          numberOfPax,
          carScheduleId,
          flightTicketIds,
          vehicleType,
        },
      });
    };
  }, [
    history,
    scheduleId,
    numberOfPax,
    vehicleType,
    carScheduleId,
    flightTicketIds,
    handleEndOfSession,
  ]);

  const handlePayment = async (captureId) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_API_URL}/booking/checkouts`, {
        ...booking.createTicketDto,
        partnerId: booking.partnerId,
        captureId,
      });
      if (vehicleType === 'flights') {
        await axios.post(`${BASE_API_URL}/booking/exchange/noRefund`, {
          newTicketId: response.data.tickets[0].id,
          getPolicy: {
            ...booking.getPolicy,
          },
          oldTicketId: booking.oldTicketId,
        });
        setLoading(false);
        handleSuccessPayment();
        toast.success('Thanh toán thành công');
        history.push('/');
      } else {
        await axios.post(`${BASE_API_URL}/booking/exchange/noRefund`, {
          newTicketId: response.data.tickets[0].id,
          getPolicy: {
            ...booking.getPolicy,
          },
          oldTicketId: booking.oldTicketId,
        });
        setLoading(false);
        handleSuccessPayment();
        toast.success('Thanh toán thành công');
        history.push('/');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    }
  };

  return (
    <Container>
      <Box component='img' src={payment} width='100%' />
      {loading ? (
        <Box component='div' className={classes.loading}>
          <CircularProgress />
          <Typography>Vui lòng chờ trong giây lát...</Typography>
        </Box>
      ) : (
        <PaymentForm
          isAuthenticated={isAuthenticated}
          totalPrice={finalPrice}
          handlePayment={handlePayment}
        />
      )}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    buses: state.schedules.buses,
    booking: state.booking,
  };
}

const mapDispatchToProps = {
  fillBookingForm: bookingActions.fillBookingForm,
  handleEndOfSession: paymentStatusActions.handleEndOfSession,
  handleSuccessPayment: paymentStatusActions.handleSuccessPayment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentFormManagement);
