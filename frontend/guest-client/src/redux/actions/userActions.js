import axios from "axios";
import { BASE_API_URL } from "../../constants";
import actionTypes from "./actionTypes";
import apiStatusActions from "./apiStatusActions";

const baseUrl = `${BASE_API_URL}/auth`;

function login(email, password) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      const user = response.data.user;
      dispatch(loginSuccessfully({ ...user }));
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
}

function loginSuccessfully(user) {
  return {
    type: actionTypes.LOGIN_SUCCESSFULLY,
    payloads: { ...user, isAuthenticated: true },
  };
}

function authenticate() {
  return async function (dispatch) {
    dispatch(apiStatusActions.beginAPICall());
    try {
      const response = await axios.get(`${baseUrl}`);
      const { user } = response.data;
      dispatch(authenticateSuccessfully(user));
    } catch (error) {
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function authenticateSuccessfully(user) {
  return {
    type: actionTypes.LOGIN_SUCCESSFULLY,
    payloads: { ...user, isAuthenticated: true },
  };
}

function logout() {
  return async function (dispatch) {
    try {
      await axios.post(`${baseUrl}/logout`);
      dispatch(logoutSuccessfully());
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
}

function logoutSuccessfully() {
  return {
    type: actionTypes.LOGOUT_SUCCESSFULLY,
  };
}

function updateProfile(updateProfile, userId) {
  return async function (dispatch) {
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/auth/${userId}`,
        updateProfile
      );
      dispatch(updateProfileSuccessfully(response.data.user));
    } catch (error) {
      throw error;
    }
  };
}

function updateProfileSuccessfully(user) {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESSFULLY,
    user,
  };
}

const userActions = {
  login,
  authenticate,
  logout,
  loginSuccessfully,
  authenticateSuccessfully,
  logoutSuccessfully,
  updateProfile,
  updateProfileSuccessfully,
};

export default userActions;
