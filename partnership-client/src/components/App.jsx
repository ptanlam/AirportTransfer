import axios from 'axios';
import cookies from 'js-cookies';
import React, { useEffect, useState } from 'react';
import scriptLoader from 'react-async-script-loader';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BASE_API_URL } from '../constants';
import accountActions from '../redux/actions/accountActions';
import partnerActions from '../redux/actions/partnerActions';
import vehicleActions from '../redux/actions/vehicleActions';
import LoadingIndicator from './commons/LoadingIndicator';
import ActivePartnerRoute from './commons/ActivePartnerRoute';
import ServerError from './commons/ServerError';
import Header from './layout/header/Header';
import AccountManagement from './pages/authenticated/account/AccountManagement';
import ClassesManagement from './pages/authenticated/classes/ClassesManagement';
import CompanyProfileManagement from './pages/authenticated/companyProfile/CompanyProfileManagement';
import PoliciesManagement from './pages/authenticated/policies/PoliciesManagement';
import ReportsManagement from './pages/authenticated/reports/ReportsManagement';
import BTSchedulesManagement from './pages/authenticated/schedules/busAndTrain/SchedulesManagement';
import CSSchedulesManagement from './pages/authenticated/schedules/car/SchedulesManagement';
import FSchedulesManagement from './pages/authenticated/schedules/flight/SchedulesManagement';
import VehiclesManagement from './pages/authenticated/vehicles/list/VehiclesManagement';
import VouchersManagement from './pages/authenticated/vouchers/VouchersManagement';
import NotFound from './pages/NotFound';
import AirportTransferHome from './pages/unauthenticated/airportTransfer/home/AirportTransferHome';
import FlightHome from './pages/unauthenticated/flight/home/FlightHome';
import ForgetPasswordManagement from './pages/unauthenticated/forgetPassword/ForgetPasswordManagement';
import Home from './pages/unauthenticated/home/Home';
import LoginFormManagement from './pages/unauthenticated/login/LoginFormManagement';
import RegistrationFormManagement from './pages/unauthenticated/registration/RegistrationFormManagement';
import ResendVerificationEmailManagement from './pages/unauthenticated/resendEmailVerification/ResendVerificationEmailManagement';
import io from 'socket.io-client';
import ProtectedRoute from './commons/ProtectedRoute';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';

const socket = io(process.env.REACT_APP_BASE_SOCKET_URL);

function App({
  partnerId,
  getPartner,
  presenterId,
  getVehicles,
  authenticate,
  transportType,
  activatePartner,
  isAuthenticated,
}) {
  const [notificationDialog, setNotificationDialog] = useState({
    open: false,
    content: '',
  });
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    if (!partnerId) return;
    socket.on(
      `announceToPartner#${partnerId}`,
      ({ activatedPartnerId, message }) => {
        if (activatedPartnerId !== partnerId) return;
        setNotificationDialog({ open: true, content: message });
      }
    );
  }, [partnerId]);

  useEffect(() => {
    (async function () {
      try {
        await axios.get(`${BASE_API_URL}/health`);
      } catch (error) {
        setServerError(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        setLoading((prevState) => prevState + 1);
        const token = cookies.getItem('token');
        if (token === null || isAuthenticated) return;
        await authenticate();
      } catch (error) {
        if (error?.response?.status === 401) {
          toast.warning('Please login again to continue!');
          return;
        }
        setServerError(true);
      } finally {
        setLoading((prevState) => prevState - 1);
      }
    })();
  }, [authenticate, isAuthenticated]);

  useEffect(() => {
    (async function () {
      try {
        setLoading((prevState) => prevState + 1);
        if (!isAuthenticated) return;
        await getPartner(presenterId);
      } catch (error) {
        if (error?.response?.status === 401) {
          toast.warning('Please login again to continue!');
          return;
        }
        if (error?.response?.status === 403) {
          toast.warning("You don't have permission to access this site!");
          return;
        }
      } finally {
        setLoading((prevState) => prevState - 1);
      }
    })();
  }, [getPartner, isAuthenticated, presenterId]);

  useEffect(() => {
    (async function () {
      try {
        setLoading((prevState) => prevState + 1);
        if (!isAuthenticated || partnerId === '') return;
        await getVehicles(partnerId, transportType);
      } catch (error) {
        if (error?.response?.status === 401) {
          toast.warning('Please login again to continue!');
          return;
        }
        if (error?.response?.status === 403) {
          toast.warning("You don't have permission to access this site!");
          return;
        }
      } finally {
        setLoading((prevState) => prevState - 1);
      }
    })();
  }, [getVehicles, isAuthenticated, partnerId, transportType]);

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : serverError ? (
        <ServerError />
      ) : (
        <>
          <Header />

          <Switch>
            <Route path="/login" component={LoginFormManagement} />
            <Route
              path="/forget-password"
              component={ForgetPasswordManagement}
            />
            <Route
              path="/resend-email-verification"
              component={ResendVerificationEmailManagement}
            />

            {/* Unauthenticated */}
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              path="/registration"
              component={RegistrationFormManagement}
            />
            <Route path="/airport-transfer" component={AirportTransferHome} />
            <Route path="/flights" component={FlightHome} />

            {/* Authenticated */}
            <ActivePartnerRoute path="/company">
              <CompanyProfileManagement />
            </ActivePartnerRoute>
            <ActivePartnerRoute path="/vehicles">
              <VehiclesManagement />
            </ActivePartnerRoute>
            <ActivePartnerRoute path="/schedules">
              {transportType === 'cars' ? (
                <CSSchedulesManagement />
              ) : (
                <BTSchedulesManagement />
              )}
            </ActivePartnerRoute>
            <ActivePartnerRoute path="/classes">
              <ClassesManagement />
            </ActivePartnerRoute>
            <ActivePartnerRoute path="/policies">
              <PoliciesManagement />
            </ActivePartnerRoute>
            <ActivePartnerRoute path="/vouchers">
              <VouchersManagement />
            </ActivePartnerRoute>
            <ActivePartnerRoute path="/tickets">
              <FSchedulesManagement />
            </ActivePartnerRoute>
            <ProtectedRoute path="/account">
              <AccountManagement />
            </ProtectedRoute>
            <ActivePartnerRoute path="/reports">
              <ReportsManagement />
            </ActivePartnerRoute>

            <Route path="*" exact component={NotFound} />
          </Switch>

          <Dialog open={notificationDialog.open}>
            <DialogTitle>Notification</DialogTitle>
            <DialogContent>
              <Typography>{notificationDialog.content}</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setNotificationDialog({ open: false, content: '' });
                  activatePartner();
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <ToastContainer
            hideProgressBar
            autoClose={3000}
            position="bottom-center"
          />
        </>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    partnerId: state.partner.id,
    presenterId: state.account.id,
    isAuthenticated: state.account.isAuthenticated,
    loading: state.apiCallsInProgress > 0,
    transportType: state.partner.transportType,
  };
}

const mapDispatchToProps = {
  getPartner: partnerActions.getPartner,
  authenticate: accountActions.authenticate,
  activatePartner: partnerActions.activatePartner,
  getVehicles: vehicleActions.getVehiclesByPartner,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  scriptLoader([
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
  ])(App)
);
