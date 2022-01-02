import axios from "axios";
import { BASE_API_URL } from "../../constants";
import actionTypes from "./actionTypes";
import { apiCallError, beginAPICall } from "./apiStatusActions";

const baseUrl = `${BASE_API_URL}/auth`;

function login(email, password) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      const profile = response.data.user;
      dispatch(loginSuccessfully({ ...profile }));
    } catch (error) {
      dispatch(apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function loginSuccessfully(profile) {
  return {
    type: actionTypes.LOGIN_SUCCESSFULLY,
    payloads: { ...profile, isAuthenticated: true },
  };
}

function authenticate() {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.get(`${baseUrl}`);
      const { user } = response.data;
      dispatch(authenticateSuccessfully(user));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
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
    dispatch(beginAPICall());
    try {
      await axios.post(`${baseUrl}/logout`);
      dispatch(logoutSuccessfully());
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function logoutSuccessfully() {
  return {
    type: actionTypes.LOGOUT_SUCCESSFULLY,
    payloads: { isAuthenticated: false },
  };
}

function updateProfile(updatedProfile, userId) {
  return async function (dispatch) {
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/auth/${userId}`,
        updatedProfile
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

const accountActions = { login, authenticate, updateProfile, logout };

export default accountActions;
