import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function scheduleReducer(
  state = initialStates.schedule,
  action,
) {
  switch (action.type) {
    case actionTypes.GET_SCHEDULE_SUCCESSFULLY:
      return { ...action.schedule };
    case actionTypes.POST_SCHEDULE_SUCCESSFULLY:
      return { ...action.schedule };
    case actionTypes.MANIPULATE_SCHEDULE_DETAILS_SUCCESSFULLY:
      const updatedScheduleDetails = state.details.findIndex(
        (detail) => detail.id === action.detail.id,
      );
      return {
        ...state,
        details: [
          ...state.details.slice(0, updatedScheduleDetails),
          ...state.details.slice(updatedScheduleDetails + 1),
          action.detail,
        ].sort((a, b) =>
          a.departureAt > b.departureAt
            ? 1
            : a.departureAt < b.departureAt
            ? -1
            : 0,
        ),
      };
    case actionTypes.REFUND_ALL_TICKETS_SUCCESSFULLY:
      const refundedScheduleDetailIndex = state.details.findIndex(
        (detail) => detail.id === action.payloads.scheduleDetailId,
      );
      const remainingTickets =
        action.payloads.transportType === 'buses'
          ? state.details[refundedScheduleDetailIndex].remainingTickets +
            action.payloads.numberOfRevokedTickets
          : state.details[refundedScheduleDetailIndex].remainingTickets -
            action.payloads.numberOfRevokedTickets;
      const refundedScheduleDetail = {
        ...state.details[refundedScheduleDetailIndex],
        isCancellable: true,
        remainingTickets,
      };
      return {
        ...state,
        details: [
          ...state.details.slice(0, refundedScheduleDetailIndex),
          ...state.details.slice(refundedScheduleDetailIndex + 1),
          refundedScheduleDetail,
        ].sort((a, b) =>
          a.departureAt > b.departureAt
            ? 1
            : a.departureAt < b.departureAt
            ? -1
            : 0,
        ),
      };
    case actionTypes.CANCEL_SCHEDULE_DETAIL_SUCCESSFULLY:
      const cancelledScheduleDetailIndex = state.details.findIndex(
        (detail) => detail.id === action.detail.id,
      );
      return {
        ...state,
        details: [
          ...state.details.slice(0, cancelledScheduleDetailIndex),
          ...state.details.slice(cancelledScheduleDetailIndex + 1),
        ],
      };
    default:
      return state;
  }
}
