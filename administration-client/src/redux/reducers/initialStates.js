const user = {
  isAuthenticated: false,
};

const vehicles = {
  cars: [],
  buses: [],
  trains: [],
};

const flights = [];

const apiCallsInProgress = 0;

const initialStates = { user, apiCallsInProgress, vehicles, flights };

export default initialStates;
