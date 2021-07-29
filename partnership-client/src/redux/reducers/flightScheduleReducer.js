import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function flightScheduleReducer(
  state = initialStates.flightSchedules,
  action,
) {
  switch (action.type) {
    case actionTypes.GET_FLIGHT_SCHEDULE_SUCCESSFULLY:
      return [...action.schedules];
    case actionTypes.POST_FLIGHT_SCHEDULE_SUCCESSFULLY:
      return [...state, action.schedule];
    case actionTypes.POST_FLIGHT_TICKETS_SUCCESSFULLY:
      const scheduleIndex = state.findIndex(
        (schedule) => schedule.id === action.payloads.scheduleId,
      );
      const newSchedule = {
        ...state[scheduleIndex],
        tickets: action.payloads.tickets,
      };
      const newState = [
        ...state.slice(0, scheduleIndex),
        ...state.slice(scheduleIndex + 1),
        newSchedule,
      ];
      return newState;
    case actionTypes.MANIPULATE_FLIGHT_SCHEDULE_SUCCESSFULLY:
      const manipulatedScheduleIndex = state.findIndex(
        (schedule) => schedule.id === action.schedule.id,
      );
      const manipulatedSchedule = { ...state[manipulatedScheduleIndex] };
      manipulatedSchedule.isActive = action.schedule.isActive;
      manipulatedSchedule.isCancellable = action.schedule.isCancellable;
      return [
        ...state.slice(0, manipulatedScheduleIndex),
        ...state.slice(manipulatedScheduleIndex + 1),
        { ...manipulatedSchedule },
      ];
    case actionTypes.CANCEL_FLIGHT_SCHEDULE_SUCCESSFULLY:
      const cancelledScheduleIndex = state.findIndex(
        (schedule) => schedule.id === action.schedule.id,
      );
      return [
        ...state.slice(0, cancelledScheduleIndex),
        ...state.slice(cancelledScheduleIndex + 1),
      ];
    case actionTypes.REFUND_ALL_FLIGHT_TICKETS_SUCCESSFULLY:
      const refundedScheduleIndex = state.findIndex(
        (schedule) => schedule.id === action.scheduleId,
      );
      const updatedSchedule = {
        ...state[refundedScheduleIndex],
        isCancellable: true,
        tickets: state[refundedScheduleIndex].tickets.map((ticket) => {
          if (ticket.isBooked) return { ...ticket, isBooked: false };
          return ticket;
        }),
      };
      return [
        ...state.slice(0, refundedScheduleIndex),
        ...state.slice(refundedScheduleIndex + 1),
        updatedSchedule,
      ];
    default:
      return [...state];
  }
}
