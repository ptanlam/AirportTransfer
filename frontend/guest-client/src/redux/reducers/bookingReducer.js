import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function bookingReducer(state = initialStates.booking, action) {
  switch (action.type) {
    case actionTypes.BOOKING_SUCCESSFULLY:
      return {
        ...action.payloads,
      };
    default:
      return state;
  }
}
