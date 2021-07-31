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
        ...action.payloads,
      };

    case actionTypes.REGISTER_SUCCESSFULLY:
      return {
        ...state,
        ...action.payloads,
      };
    case actionTypes.UPDATE_ACTIVE_PARTNER_SUCCESSFULLY:
      return {
        ...state,
        ...action.payloads,
      };
    default:
      return state;
  }
}
