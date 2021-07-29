import { combineReducers } from 'redux';
import account from './accountReducer';
import partner from './partnerReducer';
import vehicles from './vehicleReducer';
import schedule from './scheduleReducer';
import journeys from './journeyReducer';
import carSchedules from './carScheduleReducer';
import flightSchedules from './flightScheduleReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
  account,
  partner,
  vehicles,
  schedule,
  journeys,
  carSchedules,
  flightSchedules,
  apiCallsInProgress,
});

export default rootReducer;
