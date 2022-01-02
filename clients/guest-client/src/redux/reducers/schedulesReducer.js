import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function schedulesReducer(
  state = initialStates.schedules,
  action
) {
  switch (action.type) {
    case actionTypes.GET_SCHEDULES_SUCCESSFULLY:
      return { ...state, ...action.payloads };
    default:
      return state;
  }
}
