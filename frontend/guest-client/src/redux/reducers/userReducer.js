import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function userReducer(state = initialStates.user, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFULLY:
      return {
        ...state,
        ...action.payloads,
      };

    case actionTypes.LOGOUT_SUCCESSFULLY:
      return {
        ...state,
        ...initialStates.user,
      };
    case actionTypes.UPDATE_PROFILE_SUCCESSFULLY:
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
}
