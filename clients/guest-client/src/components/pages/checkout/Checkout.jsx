import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import paymentStatusActions from '../../../redux/actions/paymentStatusActions';
import CountDownTimer from '../../commons/CountDownTimer';
import CheckoutFormManagement from './CheckoutFormManagement';

const useStyles = makeStyles((theme) => ({
  main: {
    height: '90vh',
    marginTop: 100,
    padding: 30,
    background: '#e6eaed',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Checkout({ handleEndOfSession }) {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(!loading);
  };
  const vehicleType = history.location.pathname.split('/').pop();
  const { scheduleId, numberOfPax, carScheduleId, flightTicketIds } =
    history.location.state.value;

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

  return (
    <Box component='div' className={classes.main}>
      <Container maxWidth='md'>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant='h5'>Thanh toán</Typography>
          </Grid>
          {loading ? (
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress style={{ color: 'white' }} />
            </Backdrop>
          ) : (
            <Grid>
              <Grid item>
                <CountDownTimer />
              </Grid>
              <CheckoutFormManagement
                vehicleType={vehicleType}
                handleLoading={handleLoading}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  handleEndOfSession: paymentStatusActions.handleEndOfSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
