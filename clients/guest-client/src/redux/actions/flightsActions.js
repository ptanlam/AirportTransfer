import axios from 'axios';
import actionTypes from './actionTypes';
import apiStatusActions from './apiStatusActions';
import { BASE_API_URL } from '../../constants';

/**
 *
 * @param {String} vehicleType
 * @param {String} date
 * @param {String} depDistrict
 * @param {String} depCity
 * @param {String} depCountry
 * @param {String} desDistrict
 * @param {String} desCity
 * @param {String} desCountry
 * @returns
 */
function getFlightsByCondition(
  date,
  depCity,
  depCountry,
  desCity,
  desCountry,
  seatType,
  numberOfPax,
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
            depCity,
            depCountry,
            desCity,
            desCountry,
            seatType,
            numberOfPax,
          },
        },
      );
      dispatch(
        getFlightsByConditionSuccessfully(response.data.tickets, vehicleType),
      );
    } catch (error) {
      console.log(error);
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function getFlightsByConditionSuccessfully(tickets, vehicleType) {
  return {
    type: actionTypes.GET_SCHEDULES_SUCCESSFULLY,
    payloads: { [vehicleType]: [...tickets] },
  };
}

function getFlightsByConditionHasReturnDate(
  date,
  depCity,
  depCountry,
  desCity,
  desCountry,
  seatType,
  numberOfPax,
  vehicleType,
  isRoundTrip,
  returnDate,
) {
  return async function (dispatch) {
    dispatch(apiStatusActions.beginAPICall());
    try {
      const response = await axios.get(
        `${BASE_API_URL}/${vehicleType}/fullSearch?`,
        {
          params: {
            date,
            depCity,
            depCountry,
            desCity,
            desCountry,
            seatType,
            numberOfPax,
            isRoundTrip,
            returnDate,
          },
        },
      );
      dispatch(
        getFlightsByConditionHasReturnDateSuccessfully(
          response.data.tickets,
          vehicleType,
        ),
      );
    } catch (error) {
      console.log(error);
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function getFlightsByConditionHasReturnDateSuccessfully(tickets, vehicleType) {
  return {
    type: actionTypes.GET_SCHEDULES_SUCCESSFULLY,
    payloads: { [vehicleType]: [...tickets] },
  };
}

function getFlightsByPartnerId(
  date,
  depCity,
  depCountry,
  desCity,
  desCountry,
  seatType,
  numberOfPax,
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
            depCity,
            depCountry,
            desCity,
            desCountry,
            seatType,
            numberOfPax,
            partnerId,
          },
        },
      );
      dispatch(
        getFlightsByPartnerIdSuccessfully(response.data.flights, vehicleType),
      );
    } catch (error) {
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function getFlightsByPartnerIdSuccessfully(tickets, vehicleType) {
  return {
    type: actionTypes.GET_SCHEDULES_EXCHANGE_SUCCESSFULLY,
    payloads: { [vehicleType]: [...tickets] },
  };
}

function getFlightsByPartnerIdHasReturnDate(
  date,
  depCity,
  depCountry,
  desCity,
  desCountry,
  seatType,
  numberOfPax,
  vehicleType,
  partnerId,
  isRoundTrip,
  returnDate,
) {
  return async function (dispatch) {
    dispatch(apiStatusActions.beginAPICall());
    try {
      const response = await axios.get(
        `${BASE_API_URL}/${vehicleType}/schedules/exchange`,
        {
          params: {
            date,
            depCity,
            depCountry,
            desCity,
            desCountry,
            seatType,
            numberOfPax,
            partnerId,
            isRoundTrip,
            returnDate,
          },
        },
      );
      dispatch(
        getFlightsByPartnerIdHasReturnDateSuccessfully(
          response.data.flights,
          vehicleType,
        ),
      );
    } catch (error) {
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function getFlightsByPartnerIdHasReturnDateSuccessfully(tickets, vehicleType) {
  return {
    type: actionTypes.GET_SCHEDULES_EXCHANGE_SUCCESSFULLY,
    payloads: { [vehicleType]: [...tickets] },
  };
}

const flightsActions = {
  getFlightsByCondition,
  getFlightsByConditionSuccessfully,
  getFlightsByConditionHasReturnDate,
  getFlightsByConditionHasReturnDateSuccessfully,
  getFlightsByPartnerId,
  getFlightsByPartnerIdSuccessfully,
  getFlightsByPartnerIdHasReturnDate,
  getFlightsByPartnerIdHasReturnDateSuccessfully,
};

export default flightsActions;
