import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function carScheduleReducer(
  state = initialStates.carSchedules,
  action,
) {
  switch (action.type) {
    case actionTypes.GET_CAR_SCHEDULES_SUCCESSFULLY:
      return [...action.schedules];
    case actionTypes.CANCEL_CAR_SCHEDULE_SUCCESSFULLY:
      const cancelledScheduleIndex = state.findIndex(
        (schedule) => schedule.id === action.scheduleId,
      );
      return [
        ...state.slice(0, cancelledScheduleIndex),
        ...state.slice(cancelledScheduleIndex + 1),
      ];
    default:
      return { ...state };
  }
}
