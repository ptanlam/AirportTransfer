import axios from 'axios';
import { BASE_API_URL } from '../../constants';
import actionTypes from './actionTypes';
import { apiCallError, beginAPICall } from './apiStatusActions';

function getSchedulesByFlightAndDate(flightId, date) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.get(`${BASE_API_URL}/flights/schedules`, {
        params: { vehicleId: flightId, date },
      });
      dispatch(getFlightScheduleSuccessfully(response.data.schedules));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function getFlightScheduleSuccessfully(schedules) {
  return {
    type: actionTypes.GET_FLIGHT_SCHEDULE_SUCCESSFULLY,
    schedules,
  };
}

function postFlightSchedule(schedule) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.post(
        `${BASE_API_URL}/flights/schedules`,
        schedule,
      );
      dispatch(postFlightScheduleSuccessfully(response.data.schedule));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function postFlightScheduleSuccessfully(schedule) {
  return {
    type: actionTypes.POST_FLIGHT_SCHEDULE_SUCCESSFULLY,
    schedule,
  };
}

function postTickets(scheduleId, data, numberOfSeats) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      let formData = new FormData();
      formData.append('ticketsFile', data.ticketsFile[0]);
      const response = await axios.post(
        `${BASE_API_URL}/flights/tickets`,
        formData,
        { params: { scheduleId, numberOfSeats } },
      );
      dispatch(postTicketsSuccessfully(response.data.tickets, scheduleId));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function postTicketsSuccessfully(tickets, scheduleId) {
  return {
    type: actionTypes.POST_FLIGHT_TICKETS_SUCCESSFULLY,
    payloads: { tickets, scheduleId },
  };
}

function manipulateSchedule(scheduleId, mode) {
  return async function (dispatch) {
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/flights/schedules/${scheduleId}/manipulate`,
        {},
        { params: { mode } },
      );
      dispatch(manipulateScheduleSuccessfully(response.data.schedule));
    } catch (error) {
      throw error;
    }
  };
}

function manipulateScheduleSuccessfully(schedule) {
  return {
    type: actionTypes.MANIPULATE_FLIGHT_SCHEDULE_SUCCESSFULLY,
    schedule,
  };
}

function refundAllTicketsOfSchedule(scheduleId) {
  return async function (dispatch) {
    try {
      await axios.patch(
        `${BASE_API_URL}/booking/refund/flightPartner`,
        {},
        {
          params: { scheduleId },
        },
      );
      dispatch(refundAllTicketsOfScheduleSuccessfully(scheduleId));
    } catch (error) {
      throw error;
    }
  };
}

function refundAllTicketsOfScheduleSuccessfully(scheduleId) {
  return {
    type: actionTypes.REFUND_ALL_FLIGHT_TICKETS_SUCCESSFULLY,
    scheduleId,
  };
}

function cancelSchedule(scheduleId) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.delete(
        `${BASE_API_URL}/flights/schedules/${scheduleId}`,
      );
      dispatch(cancelScheduleSuccessfully(response.data.schedule));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function cancelScheduleSuccessfully(schedule) {
  return {
    type: actionTypes.CANCEL_FLIGHT_SCHEDULE_SUCCESSFULLY,
    schedule,
  };
}

const flightScheduleActions = {
  postTickets,
  cancelSchedule,
  manipulateSchedule,
  postFlightSchedule,
  refundAllTicketsOfSchedule,
  getSchedulesByFlightAndDate,
};

export default flightScheduleActions;
