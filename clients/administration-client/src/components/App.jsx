import cookies from 'js-cookies';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import userActions from '../redux/actions/userActions';
import './App.css';
import LoadingIndicator from './commons/LoadingIndicator';
import ProtectedRoute from './commons/ProtectedRoute';
import AdminHome from './pages/authenticated/home/Home';
import PageNotFound from './pages/PageNotFound';
import ReportsManagement from './pages/authenticated/reports/ReportsManagement';
import PartnersList from './pages/authenticated/partners/PartnersList';
import StatisticsOfUsersManagement from './pages/authenticated/users/StatisticsOfUsersManagement';
import AnonymousHome from './pages/unauthenticated/home/Home';
import Header from './template/Header';

function App({ isAuthenticated, authenticate }) {
  const [loading, setLoading] = useState(false);

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
  }, [authenticate]);

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Header />
          <Switch>
            <Route exact path='/'>
              {isAuthenticated ? <AdminHome /> : <AnonymousHome />}
            </Route>

            <ProtectedRoute path='/partners'>
              <PartnersList />
            </ProtectedRoute>

            <ProtectedRoute path='/reports'>
              <ReportsManagement />
            </ProtectedRoute>

            <ProtectedRoute path='/users'>
              <StatisticsOfUsersManagement />
            </ProtectedRoute>

            <Route path='*' exact>
              <PageNotFound />
            </Route>
          </Switch>
        </>
      )}
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
}

function mapStateToProps(state) {
  return { isAuthenticated: state.user.isAuthenticated };
}

const mapDispatchToProps = {
  authenticate: userActions.authenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
