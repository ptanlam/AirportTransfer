import axios from 'axios';
import actionTypes from './actionTypes';
import { beginAPICall, apiCallError } from './apiStatusActions';
import { BASE_API_URL } from '../../constants';
import jsCookies from 'js-cookies';

function login(email, password) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.post(`${BASE_API_URL}/auth/login`, {
        email,
        password,
      });
      const user = response.data.user;
      if (user.role !== 'admin') {
        jsCookies.removeItem('token');
        throw new Error('You are not authorized to access this website!');
      }
      dispatch(loginSuccessfully(user));
    } catch (error) {
      dispatch(apiCallError());
      throw new Error(error?.response?.data?.message || error.message);
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
    dispatch(beginAPICall());
    try {
      const response = await axios.get(`${BASE_API_URL}/auth`);
      const { user } = response.data;
      dispatch(authenticateSuccessfully(user));
    } catch (error) {
      dispatch(apiCallError());
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
    dispatch(beginAPICall());
    try {
      await axios.post(`${BASE_API_URL}/auth/logout`);
      dispatch(logoutSuccessfully());
    } catch (error) {
      dispatch(apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function logoutSuccessfully() {
  return {
    type: actionTypes.LOGOUT_SUCCESSFULLY,
    payloads: { isAuthenticated: false },
  };
}

function updateActivePartner(partnerId) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.patch(`${BASE_API_URL}/partners/${partnerId}/activate`, {
        params: {
          partnerId: partnerId,
          isActive: true,
        },
      });
      console.log(response);
      dispatch(updateActivePartnerSuccessfully(response.data.partner));
    } catch (error) {
      dispatch(apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function updateActivePartnerSuccessfully(partner) {
  return {
    type: actionTypes.UPDATE_ACTIVE_PARTNER_SUCCESSFULLY,
    payloads: { ...partner },
  };
}

const userActions = {
  login,
  authenticate,
  logout,
  loginSuccessfully,
  authenticateSuccessfully,
  logoutSuccessfully,
  updateActivePartner,
};

export default userActions;
