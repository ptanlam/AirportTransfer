const account = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  isActive: false,
  isAuthenticated: false,
  createdAt: '',
  updatedAt: '',
  role: '',
  profileId: '',
};

const partner = {
  createdAt: '',
  email: '',
  hotline: '',
  id: '',
  isActive: false,
  isRegistered: false,
  logoUrl: '',
  name: '',
  presenterId: '',
  transportType: '',
  updatedAt: '',
  classes: [],
  exchangePolicies: [],
  cancellationPolicies: [],
};

const vehicles = [];

const schedule = {
  date: '',
  details: [],
  endTime: '',
  gap: '',
  id: '',
  journeyId: '',
  numberOfVehicles: 0,
  startTime: '',
  travelTime: '',
};

const carSchedules = [];

const flightSchedules = [];

const apiCallsInProgress = 0;

const journeys = [];

const initialStates = {
  account,
  partner,
  vehicles,
  journeys,
  schedule,
  carSchedules,
  flightSchedules,
  apiCallsInProgress,
};

export default initialStates;
