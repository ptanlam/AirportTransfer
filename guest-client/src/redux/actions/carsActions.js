import axios from 'axios';
import actionTypes from './actionTypes';
import apiStatusActions from './apiStatusActions';
import { BASE_API_URL } from '../../constants';

/**
 *
 * @param {String} vehicleType
 * @param {String} date
 * @param {String} pickUpTime
 * @param {String} depDistrict
 * @param {String} depCity
 * @param {String} depCountry
 * @param {String} desDistrict
 * @param {String} desCity
 * @param {String} desCountry
 * @returns
 */

function getCars(date, pickUpTime, depCity, depCountry, travel, vehicleType) {
  return async function (dispatch) {
    dispatch(apiStatusActions.beginAPICall());
    try {
      const response = await axios.get(
        `${BASE_API_URL}/${vehicleType}/fullSearch?`,
        {
          params: {
            date,
            pickUpTime,
            depCity,
            depCountry,
            travel,
          },
        }
      );
      dispatch(getCarsSuccessfully(response.data.vehicles, vehicleType));
    } catch (error) {
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function getCarsSuccessfully(cars, vehicleType) {
  return {
    type: actionTypes.GET_SCHEDULES_SUCCESSFULLY,
    payloads: { [vehicleType]: [...cars] },
  };
}

function getCarsByPartnerId(
  date,
  pickUpTime,
  depCity,
  depCountry,
  travel,
  vehicleType,
  partnerId
) {
  return async function (dispatch) {
    dispatch(apiStatusActions.beginAPICall());
    try {
      const response = await axios.get(
        `${BASE_API_URL}/${vehicleType}/fullSearch/exchange`,
        {
          params: {
            date,
            pickUpTime,
            depCity,
            depCountry,
            travel,
            partnerId,
          },
        }
      );
      dispatch(
        getCarsByPartnerIdSuccessfully(response.data.vehicles, vehicleType)
      );
    } catch (error) {
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function getCarsByPartnerIdSuccessfully(cars, vehicleType) {
  return {
    type: actionTypes.GET_SCHEDULES_EXCHANGE_SUCCESSFULLY,
    payloads: { [vehicleType]: [...cars] },
  };
}

const carsActions = {
  getCars,
  getCarsSuccessfully,
  getCarsByPartnerId,
  getCarsByPartnerIdSuccessfully,
};

export default carsActions;
