import axios from 'axios';
import { BASE_API_URL } from '../../constants';
import actionTypes from './actionTypes';
import { apiCallError, beginAPICall } from './apiStatusActions';

function getSchedulesByCarAndDate(carId, date) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.get(`${BASE_API_URL}/cars/schedules`, {
        params: { carId, date },
      });
      dispatch(getSchedulesByCarSuccessfully(response.data.schedules));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function getSchedulesByCarSuccessfully(schedules) {
  return {
    type: actionTypes.GET_CAR_SCHEDULES_SUCCESSFULLY,
    schedules,
  };
}

function cancelCarSchedule(scheduleId) {
  return async function (dispatch) {
    try {
      await axios.patch(
        `${BASE_API_URL}/booking/refund/partner`,
        {},
        { params: { scheduleDetailId: scheduleId } },
      );
      const response = await axios.patch(
        `${BASE_API_URL}/cars/schedules/${scheduleId}/cancel`,
      );
      dispatch(cancelCarScheduleSuccessfully(response.data.scheduleId));
    } catch (error) {
      throw error;
    }
  };
}

function cancelCarScheduleSuccessfully(scheduleId) {
  return { type: actionTypes.CANCEL_CAR_SCHEDULE_SUCCESSFULLY, scheduleId };
}

const carScheduleActions = { cancelCarSchedule, getSchedulesByCarAndDate };

export default carScheduleActions;
