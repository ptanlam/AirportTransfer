import axios from 'axios';
import { BASE_API_URL } from '../../constants';
import actionTypes from './actionTypes';
import { apiCallError, beginAPICall } from './apiStatusActions';

function getScheduleByJourney(transportType, journeyId, date) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.get(
        `${BASE_API_URL}/${transportType}/schedules`,
        {
          params: {
            journeyId,
            date,
          },
        },
      );
      dispatch(getScheduleByJourneySuccessfully(response.data.schedule));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function getScheduleByJourneySuccessfully(schedule) {
  return {
    type: actionTypes.GET_SCHEDULE_SUCCESSFULLY,
    schedule,
  };
}

function postSchedule(transportType, schedule) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.post(
        `${BASE_API_URL}/${transportType}/schedules`,
        schedule,
      );
      dispatch(postScheduleSuccessfully(response.data.schedule));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function postScheduleSuccessfully(schedule) {
  return {
    type: actionTypes.POST_SCHEDULE_SUCCESSFULLY,
    schedule,
  };
}

function manipulateScheduleDetail(transportType, scheduleDetailId, type) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/${transportType}/schedules/details/${scheduleDetailId}`,
        {},
        { params: { type } },
      );
      dispatch(manipulateScheduleDetailSuccessfully(response.data.detail));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function manipulateScheduleDetailSuccessfully(detail) {
  return {
    type: actionTypes.MANIPULATE_SCHEDULE_DETAILS_SUCCESSFULLY,
    detail,
  };
}

function refundAllTickets(scheduleDetailId, transportType) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/booking/refund/partner`,
        {},
        { params: { scheduleDetailId } },
      );
      dispatch(
        refundAllTicketsSuccessfully(
          scheduleDetailId,
          response.data.contacts.length,
          transportType,
        ),
      );
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function refundAllTicketsSuccessfully(
  scheduleDetailId,
  numberOfRevokedTickets,
  transportType,
) {
  return {
    type: actionTypes.REFUND_ALL_TICKETS_SUCCESSFULLY,
    payloads: { scheduleDetailId, numberOfRevokedTickets, transportType },
  };
}

function cancelScheduleDetail(transportType, scheduleDetailId) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.delete(
        `${BASE_API_URL}/${transportType}/schedules/details/${scheduleDetailId}`,
      );
      const { detail } = response.data;
      dispatch(cancelScheduleDetailSuccessfully(detail));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function cancelScheduleDetailSuccessfully(detail) {
  return {
    type: actionTypes.CANCEL_SCHEDULE_DETAIL_SUCCESSFULLY,
    detail,
  };
}

const scheduleActions = {
  postSchedule,
  refundAllTickets,
  cancelScheduleDetail,
  getScheduleByJourney,
  manipulateScheduleDetail,
};

export default scheduleActions;
