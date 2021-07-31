import axios from 'axios';
import actionTypes from './actionTypes';
import apiStatusActions from './apiStatusActions';
import { BASE_API_URL } from '../../constants';

function getSchedules(
  date,
  pickUpTime,
  numberOfPax,
  depDistrict,
  depCity,
  depCountry,
  desDistrict,
  desCity,
  desCountry,
  vehicleType,
) {
  return async function (dispatch) {
    dispatch(apiStatusActions.beginAPICall());
    try {
      const response = await axios.get(
        `${BASE_API_URL}/${vehicleType}/fullSearch?`,
        {
          params: {
            date,
            pickUpTime,
            numberOfPax,
            depDistrict,
            depCity,
            depCountry,
            desDistrict,
            desCity,
            desCountry,
          },
        },
      );
      dispatch(getSchedulesSuccessfully(response.data.schedules, vehicleType));
    } catch (error) {
      console.log(error);
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function getSchedulesSuccessfully(schedules, vehicleType) {
  return {
    type: actionTypes.GET_SCHEDULES_SUCCESSFULLY,
    payloads: { [vehicleType]: [...schedules] },
  };
}

function getSchedulesByPartnerId(
  date,
  pickUpTime,
  depDistrict,
  depCity,
  depCountry,
  desDistrict,
  desCity,
  desCountry,
  vehicleType,
  partnerId,
) {
  return async function (dispatch) {
    dispatch(apiStatusActions.beginAPICall());
    try {
      const response = await axios.get(
        `${BASE_API_URL}/${vehicleType}/schedules/exchange`,
        {
          params: {
            date,
            pickUpTime,
            depDistrict,
            depCity,
            depCountry,
            desDistrict,
            desCity,
            desCountry,
            partnerId,
          },
        },
      );
      dispatch(
        getSchedulesByPartnerIdSuccessfully(response.data.tickets, vehicleType),
      );
    } catch (error) {
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function getSchedulesByPartnerIdSuccessfully(schedules, vehicleType) {
  return {
    type: actionTypes.GET_SCHEDULES_EXCHANGE_SUCCESSFULLY,
    payloads: { [vehicleType]: [...schedules] },
  };
}

const schedulesActions = { getSchedules, getSchedulesByPartnerId };

export default schedulesActions;
