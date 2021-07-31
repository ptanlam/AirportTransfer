import actionTypes from './actionTypes';

function handleSuccessPayment() {
  return {
    type: actionTypes.SUCCESS_PAYMENT,
  };
}

function handleEndOfSession() {
  return {
    type: actionTypes.END_OF_SESSION,
  };
}

function resetPaymentStatus() {
  return {
    type: actionTypes.RESET_PAYMENT_STATUS,
  };
}

const paymentStatusActions = {
  handleEndOfSession,
  resetPaymentStatus,
  handleSuccessPayment,
};

export default paymentStatusActions;
