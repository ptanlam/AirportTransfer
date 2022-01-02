import { combineReducers } from 'redux';
import user from './userReducer';
import schedules from './schedulesReducer';
import schedulesExchange from './schedulesExchangeReducer';
import booking from './bookingReducer';
import apiCallsInProgress from './apiStatusReducer';
import paymentStatus from './paymentStatusReducer';

const rootReducer = combineReducers({
  user,
  booking,
  schedules,
  paymentStatus,
  schedulesExchange,
  apiCallsInProgress,
});

export default rootReducer;
