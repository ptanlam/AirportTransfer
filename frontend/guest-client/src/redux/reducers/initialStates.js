const user = {
  isAuthenticated: false,
};

const paymentStatus = {
  success: false,
  endOfSession: false,
};

const schedules = {
  cars: [],
  buses: [],
  trains: [],
  flights: [],
};

const schedulesExchange = {
  cars: [],
  buses: [],
  trains: [],
  flights: [],
};

const booking = {};

const apiCallsInProgress = 0;

const initialStates = {
  schedulesExchange,
  user,
  apiCallsInProgress,
  schedules,
  booking,
  paymentStatus,
};

export default initialStates;
