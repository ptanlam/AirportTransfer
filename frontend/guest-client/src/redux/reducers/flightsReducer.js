import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function flightsReducer(
  state = initialStates.schedules,
  action,
) {
  switch (action.type) {
    case actionTypes.GET_SCHEDULES_SUCCESSFULLY:
      console.log(action.payloads);
      return {
        ...state,
        ...action.payloads,
      };
    default:
      return state;
  }
}
