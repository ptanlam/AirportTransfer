import initialStates from './initialStates';
import actionTypes from '../actions/actionTypes';

export default function accountReducer(state = initialStates.account, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFULLY:
      return {
        ...state,
        ...action.payloads,
      };
    case actionTypes.LOGOUT_SUCCESSFULLY:
      return {
        ...state,
        ...initialStates.account,
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
