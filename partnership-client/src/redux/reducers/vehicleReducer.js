import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function vehicleReducer(state = initialStates.vehicles, action) {
  switch (action.type) {
    case actionTypes.GET_VEHICLES_SUCCESSFULLY:
      return [...action.vehicles];
    case actionTypes.POST_VEHICLE_SUCCESSFULLY:
      return [...state, { ...action.vehicle }];
    case actionTypes.PATCH_VEHICLE_SUCCESSFULLY:
      const updateVehicleIndex = state.findIndex(
        (vehicle) => vehicle.id === action.vehicle.id,
      );
      const updatedState = [
        ...state.slice(0, updateVehicleIndex),
        ...state.slice(updateVehicleIndex + 1),
      ];
      return [...updatedState, { ...action.vehicle }];
    case actionTypes.ADD_CARS_SUCCESSFULLY:
      const updatedCarIndex = state.findIndex(
        (car) => car.id === action.payloads.carModelId,
      );
      const updatedDetails = [
        ...state[updatedCarIndex].details,
        ...action.payloads.cars,
      ];
      const newState = [
        ...state.slice(0, updatedCarIndex),
        ...state.slice(updatedCarIndex + 1),
      ];
      return [
        ...newState,
        { ...state[updatedCarIndex], details: updatedDetails },
      ];
    case actionTypes.UNREGISTER_VEHICLE_SUCCESSFULLY:
      const unregisteredVehicleIndex = state.findIndex(
        (vehicle) => vehicle.id === action.vehicleId,
      );
      return [
        ...state.slice(0, unregisteredVehicleIndex),
        ...state.slice(unregisteredVehicleIndex + 1),
      ];
    case actionTypes.REMOVE_CAR_SUCCESSFULLY:
      const removalCarModelIndex = state.findIndex(
        (carModel) => carModel.id === action.car.carModelId,
      );
      const removalCarIndex = state[removalCarModelIndex].details.findIndex(
        (car) => car.id === action.car.id,
      );
      const removalDetails = [
        ...state[removalCarModelIndex].details.slice(0, removalCarIndex),
        ...state[removalCarModelIndex].details.slice(removalCarIndex + 1),
      ];
      const afterRemoveCarState = [
        ...state.slice(0, removalCarModelIndex),
        ...state.slice(removalCarModelIndex + 1),
      ];
      return [
        ...afterRemoveCarState,
        { ...state[removalCarModelIndex], details: removalDetails },
      ];
    default:
      return state;
  }
}
