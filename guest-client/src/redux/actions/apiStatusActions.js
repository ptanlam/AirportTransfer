import actionTypes from './actionTypes';

function beginAPICall() {
  return { type: actionTypes.BEGIN_API_CALL };
}

function apiCallError() {
  return { type: actionTypes.API_CALL_ERROR };
}

const apiStatusActions = { beginAPICall, apiCallError };

export default apiStatusActions;
