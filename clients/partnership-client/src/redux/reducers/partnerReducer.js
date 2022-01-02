import actionTypes from '../actions/actionTypes';
import initialStates from './initialStates';

export default function partnerReducer(state = initialStates.partner, action) {
  switch (action.type) {
    case actionTypes.GET_PARTNER_SUCCESSFULLY:
      return { ...state, ...action.payloads };

    case actionTypes.POST_PARTNER_SUCCESSFULLY:
      return state;

    case actionTypes.ACTIVATE_PARTNER:
      return { ...state, isActive: true };

    case actionTypes.LOGOUT_SUCCESSFULLY:
      return { ...state, ...initialStates.partner };

    case actionTypes.CHANGE_PARTNER_LOGO_SUCCESSFULLY:
      return { ...state, ...action.changes };

    case actionTypes.POST_CLASS_SUCCESSFULLY:
      return {
        ...state,
        classes: [...state.classes, { ...action.vehicleClass }],
      };

    case actionTypes.POST_POLICY_SUCCESSFULLY:
      const policyType = `${action.payloads.policyType}Policies`;
      return {
        ...state,
        [policyType]: [...state[policyType], { ...action.payloads.policy }],
      };

    case actionTypes.PATCH_CLASS_SUCCESSFULLY:
      const editClassIndex = state.classes.findIndex(
        (eachClass) => eachClass.id === action.vehicleClass.id,
      );
      return {
        ...state,
        classes: [
          ...state.classes.slice(0, editClassIndex),
          ...state.classes.slice(editClassIndex + 1),
          { ...action.vehicleClass },
        ],
      };

    case actionTypes.PATCH_POLICY_SUCCESSFULLY:
      const editPolicies = `${action.policy.type}Policies`;
      const editPolicyIndex = state[editPolicies].findIndex(
        (policy) => policy.id === action.policy.id,
      );
      return {
        ...state,
        [editPolicies]: [
          ...state[editPolicies].slice(0, editPolicyIndex),
          ...state[editPolicies].slice(editPolicyIndex + 1),
          { ...action.policy },
        ],
      };

    case actionTypes.DELETE_CLASS_SUCCESSFULLY:
      const removedClassIndex = state.classes.findIndex(
        (eachClass) => eachClass.id === action.classId,
      );
      return {
        ...state,
        classes: [
          ...state.classes.slice(0, removedClassIndex),
          ...state.classes.slice(removedClassIndex + 1),
        ],
      };

    case actionTypes.DELETE_POLICY_SUCCESSFULLY:
      const removalPolicies = `${action.policy.type}Policies`;
      const removedPolicyIndex = state[removalPolicies].findIndex(
        (policy) => policy.id === action.policy.id,
      );
      return {
        ...state,
        [removalPolicies]: [
          ...state[removalPolicies].slice(0, removedPolicyIndex),
          ...state[removalPolicies].slice(removedPolicyIndex + 1),
        ],
      };
    default:
      return state;
  }
}
