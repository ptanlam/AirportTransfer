import { makeStyles } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import cookies from 'js-cookies';
import React, { useEffect, useState } from 'react';
import scriptLoader from 'react-async-script-loader';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userActions from '../redux/actions/userActions';
import './App.css';
import AirportTransfer from './pages/airportTransfer/AirportTransfer';
import AirportTransferSearchingManagement from './pages/airportTransferSearching/AirportTransferSearchingManagement';
import Booking from './pages/booking/Booking';
import Checkout from './pages/checkout/Checkout';
import Flight from './pages/flight/Flight';
import FlightSearchingManagement from './pages/flightSearching/FlightSearchingManagement';
import ForgetPasswordManagement from './pages/forgetPassword/ForgetPasswordManagement';
import Home from './pages/home/Home';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/profile/Profile';
import Registration from './pages/registration/Registration';
import PaymentFormManagement from './pages/stepperExchangingTicket/vehiclePaymentStep/PaymentFormManagement';
import ReservationFormManagement from './pages/stepperExchangingTicket/vehicleReservationStep/ReservationFormManagement';
import PartnerVehiclesListManagement from './pages/stepperExchangingTicket/vehicleSelectionStep/PartnerVehiclesListManagement';
import FlightTableSearchManagement from './pages/stepperExchangingTicket/vehicleTableSearchStep/flight/FlightTableSearchManagement';
import VehiclesTableSearchManagement from './pages/stepperExchangingTicket/vehicleTableSearchStep/vehicles/VehiclesTableSearchManagement';
import Footer from './template/footer/Footer';
import Header from './template/header/Header';
import { useHistory } from 'react-router-dom';
import { BASE_API_URL } from '../constants';
import axios from 'axios';
import paymentStatusActions from '../redux/actions/paymentStatusActions';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App({
  userId,
  authenticate,
  paymentStatus,
  isAuthenticated,
  resetPaymentStatus,
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const token = cookies.getItem('token');
        if (token === null) return;
        await authenticate();
      } catch (error) {
        toast.warning(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [authenticate, userId]);

  useEffect(() => {
    async function revokeTickets(payloads) {
      const {
        scheduleId,
        numberOfPax,
        carScheduleId,
        flightTicketIds,
        vehicleType,
      } = payloads;
      setLoading(true);
      try {
        if (vehicleType === 'cars') {
          await axios.delete(
            `${BASE_API_URL}/${vehicleType}/schedules/${carScheduleId}/remove`,
          );
        } else if (vehicleType === 'flights') {
          await flightTicketIds.forEach(async (ticket) => {
            await axios.patch(
              `${BASE_API_URL}/${vehicleType}/tickets/${ticket}/revoke`,
            );
          });
        } else {
          await axios.patch(
            `${BASE_API_URL}/${vehicleType}/schedules/details/${scheduleId}/revoke`,
            {},
            {
              params: {
                numberOfTickets: numberOfPax,
              },
            },
          );
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra!');
      } finally {
        setLoading(false);
      }
    }

    const payloads = history?.location?.state;
    if (!payloads) return;
    const { success, endOfSession } = paymentStatus;
    if (success) {
      resetPaymentStatus();
      return;
    }
    if (!endOfSession) return;
    revokeTickets(payloads);
    resetPaymentStatus();
  }, [history?.location?.state, paymentStatus, resetPaymentStatus]);

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Header />
          {loading ? (
            <Backdrop open={true} className={classes.backdrop}>
              <CircularProgress style={{ color: 'white' }} />
            </Backdrop>
          ) : (
            <Home />
          )}
        </Route>

        <Route exact path='/forget-password'>
          <ForgetPasswordManagement />
        </Route>

        <Route exact path='/exchange-ticket'>
          <VehiclesTableSearchManagement />
        </Route>
        <Route exact path='/exchange-ticket/flights'>
          <FlightTableSearchManagement />
        </Route>
        <Route path='/exchange-ticket/fullSearch'>
          <PartnerVehiclesListManagement />
        </Route>
        <Route path='/exchange-ticket/booking'>
          <ReservationFormManagement />
        </Route>
        <Route path='/exchange-ticket/checkout'>
          <PaymentFormManagement />
        </Route>

        <>
          <Header />
          <Route exact path='/register'>
            <Registration />
          </Route>
          <Route exact path='/profile'>
            {isAuthenticated ? <Profile /> : <Redirect to='/' />}
          </Route>
          <Route exact path='/airport-transfer'>
            <AirportTransfer />
          </Route>
          <Route exact path='/airport-transfer/fullSearch'>
            <AirportTransferSearchingManagement />
          </Route>
          <Route exact path='/flight'>
            <Flight />
          </Route>
          <Route exact path='/flight/fullSearch'>
            <FlightSearchingManagement />
          </Route>
          <Route path='/booking'>
            <Booking />
          </Route>
          <Route path='/checkout'>
            <Checkout />
          </Route>
          <Footer />
        </>

        <Route path='*' exact>
          <PageNotFound />
        </Route>
      </Switch>

      <ToastContainer autoClose={2000} hideProgressBar />
    </>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    paymentStatus: state.paymentStatus,
    loading: state.apiCallsInProgress > 0,
    isAuthenticated: state.user.isAuthenticated,
  };
}

const mapDispatchToProps = {
  authenticate: userActions.authenticate,
  resetPaymentStatus: paymentStatusActions.resetPaymentStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
