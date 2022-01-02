import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function schedulesExchangeReducer(
  state = initialStates.schedulesExchange,
  action
) {
  switch (action.type) {
    case actionTypes.GET_SCHEDULES_EXCHANGE_SUCCESSFULLY:
      return { ...state, ...action.payloads };
    default:
      return state;
  }
}
