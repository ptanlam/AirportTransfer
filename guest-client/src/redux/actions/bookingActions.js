import actionTypes from './actionTypes';

function fillBookingForm(information) {
  return {
    type: actionTypes.BOOKING_SUCCESSFULLY,
    payloads: { ...information },
  };
}

const bookingActions = { fillBookingForm };

export default bookingActions;
