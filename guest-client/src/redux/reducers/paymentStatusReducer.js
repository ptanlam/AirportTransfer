import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function paymentStatusReducer(
  state = initialStates.paymentStatus,
  action,
) {
  switch (action.type) {
    case actionTypes.SUCCESS_PAYMENT:
      return { ...state, success: true, endOfSession: true };

    case actionTypes.END_OF_SESSION:
      return { ...state, endOfSession: true };

    case actionTypes.RESET_PAYMENT_STATUS:
      return { ...state, success: false, endOfSession: false };

    default:
      return state;
  }
}
