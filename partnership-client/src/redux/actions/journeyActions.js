import axios from 'axios';
import { BASE_API_URL } from '../../constants';
import actionTypes from './actionTypes';
import { apiCallError, beginAPICall } from './apiStatusActions';

function getJourneysByVehicle(transportType, vehicleId) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.get(
        `${BASE_API_URL}/${transportType}/journeys?vehicleId=${vehicleId}`,
      );
      const { journeys } = response.data;
      dispatch(getJourneysByVehicleSuccessfully(journeys));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function getJourneysByVehicleSuccessfully(journeys) {
  return {
    type: actionTypes.GET_JOURNEYS_SUCCESSFULLY,
    journeys,
  };
}

const journeyActions = { getJourneysByVehicle };

export default journeyActions;
