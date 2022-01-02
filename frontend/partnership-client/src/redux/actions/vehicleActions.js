import axios from 'axios';
import { BASE_API_URL } from '../../constants';
import populateVehicleDataForPatch from '../../utils/populateVehicleDataForPatch';
import populateVehicleDataForPost from '../../utils/populateVehicleDataForPost';
import actionTypes from './actionTypes';
import { apiCallError, beginAPICall } from './apiStatusActions';

function getVehiclesByPartner(partnerId, vehicleType) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.get(
        `${BASE_API_URL}/${vehicleType}?partnerId=${partnerId}`,
      );
      dispatch(getVehiclesByPartnerSuccessfully(response.data[vehicleType]));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function getVehiclesByPartnerSuccessfully(vehicles) {
  return {
    type: actionTypes.GET_VEHICLES_SUCCESSFULLY,
    vehicles,
  };
}

function postVehicle(transportType, data) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.post(
        `${BASE_API_URL}/${transportType}`,
        populateVehicleDataForPost(transportType, data),
      );
      dispatch(postVehicleSuccessfully(response.data.vehicle));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function postVehicleSuccessfully(vehicle) {
  return {
    type: actionTypes.POST_VEHICLE_SUCCESSFULLY,
    vehicle,
  };
}

function patchVehicle(transportType, data) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    const { vehicleId, ...updatedInformation } = data;
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/${transportType}/${data.vehicleId}`,
        populateVehicleDataForPatch(transportType, updatedInformation),
      );
      dispatch(patchVehicleSuccessfully(response.data.vehicle));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function patchVehicleSuccessfully(vehicle) {
  return {
    type: actionTypes.PATCH_VEHICLE_SUCCESSFULLY,
    vehicle,
  };
}

function unregisterVehicle(vehicleId, transportType) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      await axios.delete(`${BASE_API_URL}/${transportType}/${vehicleId}`);
      dispatch(unregisterVehicleSuccessfully(vehicleId));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function unregisterVehicleSuccessfully(vehicleId) {
  return {
    type: actionTypes.UNREGISTER_VEHICLE_SUCCESSFULLY,
    vehicleId,
  };
}

function addCars(carModelId, cars) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.post(`${BASE_API_URL}/cars/add`, {
        carModelId,
        cars,
      });
      dispatch(addCarsSuccessfully(carModelId, response.data.cars));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function addCarsSuccessfully(carModelId, cars) {
  return {
    type: actionTypes.ADD_CARS_SUCCESSFULLY,
    payloads: { carModelId, cars },
  };
}

function removeCar(carId) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        `${BASE_API_URL}/cars/unregisterCar`,
        { params: { carId } },
      );
      dispatch(removeCarSuccessfully(response.data.car));
    } catch (error) {
      throw error;
    }
  };
}

function removeCarSuccessfully(car) {
  return {
    type: actionTypes.REMOVE_CAR_SUCCESSFULLY,
    car,
  };
}

const vehicleActions = {
  addCars,
  removeCar,
  postVehicle,
  patchVehicle,
  unregisterVehicle,
  getVehiclesByPartner,
};

export default vehicleActions;
