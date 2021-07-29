import axios from 'axios';
import { BASE_API_URL } from '../../constants';
import actionTypes from './actionTypes';
import { apiCallError, beginAPICall } from './apiStatusActions';

const baseUrl = `${BASE_API_URL}/partners`;

function getPartner(presenterId) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.get(`${baseUrl}?presenterId=${presenterId}`);
      dispatch(getPartnerSuccessfully(response.data.partner));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function getPartnerSuccessfully(partner) {
  return {
    type: actionTypes.GET_PARTNER_SUCCESSFULLY,
    payloads: { ...partner },
  };
}

function activatePartner() {
  return {
    type: actionTypes.ACTIVATE_PARTNER,
  };
}

function clearPartnerInfo() {
  return {
    type: actionTypes.LOGOUT_SUCCESSFULLY,
  };
}

function postPartner(data) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      await axios.post(`${BASE_API_URL}/partners`, data);
      dispatch(postPartnerSuccessfully());
    } catch (error) {
      dispatch(apiCallError());
      throw new Error(error.response.data.message);
    }
  };
}

function postPartnerSuccessfully() {
  return {
    type: actionTypes.POST_PARTNER_SUCCESSFULLY,
  };
}

function changeLogo(partnerId, data) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/partners/${partnerId}/logo`,
        data,
      );
      dispatch(changeLogoSuccessfully(response.data.changes));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function changeLogoSuccessfully(changes) {
  return {
    type: actionTypes.CHANGE_PARTNER_LOGO_SUCCESSFULLY,
    changes,
  };
}

function postClass(data) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.post(
        `${BASE_API_URL}/partners/classes`,
        data,
      );
      dispatch(postClassSuccessfully(response.data.vehicleClass));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function postClassSuccessfully(vehicleClass) {
  return {
    type: actionTypes.POST_CLASS_SUCCESSFULLY,
    vehicleClass,
  };
}

function patchClass(classId, newClassName, partnerId) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/partners/classes/${classId}`,
        {
          name: newClassName,
          partnerId,
        },
      );
      dispatch(patchClassSuccessfully(response.data.vehicleClass));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function patchClassSuccessfully(vehicleClass) {
  return {
    type: actionTypes.PATCH_CLASS_SUCCESSFULLY,
    vehicleClass,
  };
}

function deleteClass(classId) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.delete(
        `${BASE_API_URL}/partners/classes/${classId}`,
      );
      dispatch(deleteClassSuccessfully(response.data.classId));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function deleteClassSuccessfully(classId) {
  return {
    type: actionTypes.DELETE_CLASS_SUCCESSFULLY,
    classId,
  };
}

function postPolicy(policyType, policy) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.post(`${BASE_API_URL}/partners/policies`, {
        policyType,
        policy,
      });
      dispatch(postPolicySuccessfully(policyType, response.data.policy));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function postPolicySuccessfully(policyType, policy) {
  return {
    type: actionTypes.POST_POLICY_SUCCESSFULLY,
    payloads: { policyType, policy },
  };
}

function patchPolicy(policy, policyId) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.patch(
        `${BASE_API_URL}/partners/policies/${policyId}`,
        policy,
      );
      dispatch(patchPolicySuccessfully(response.data.policy));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function patchPolicySuccessfully(policy) {
  return {
    type: actionTypes.PATCH_POLICY_SUCCESSFULLY,
    policy,
  };
}

function deletePolicy(policyId) {
  return async function (dispatch) {
    dispatch(beginAPICall());
    try {
      const response = await axios.delete(
        `${BASE_API_URL}/partners/policies/${policyId}`,
      );
      dispatch(deletePolicySuccessfully(response.data.policy));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };
}

function deletePolicySuccessfully(policy) {
  return {
    type: actionTypes.DELETE_POLICY_SUCCESSFULLY,
    policy,
  };
}

const partnerActions = {
  postClass,
  getPartner,
  changeLogo,
  patchClass,
  postPolicy,
  postPartner,
  deleteClass,
  patchPolicy,
  deletePolicy,
  activatePartner,
  clearPartnerInfo,
};

export default partnerActions;
