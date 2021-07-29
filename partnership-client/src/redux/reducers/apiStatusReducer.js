import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 13) === '_SUCCESSFULLY';
}

export default function apiCallStatusReducer(
  state = initialStates.apiCallsInProgress,
  action,
) {
  if (action.type === actionTypes.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === actionTypes.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }
  return state;
}
