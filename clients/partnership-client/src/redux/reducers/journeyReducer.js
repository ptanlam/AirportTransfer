import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function journeyReducer(state = initialStates.journeys, action) {
  switch (action.type) {
    case actionTypes.GET_JOURNEYS_SUCCESSFULLY:
      return [...action.journeys];
    default:
      return state;
  }
}
