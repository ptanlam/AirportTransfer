import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import partnerActions from '../../../../redux/actions/partnerActions';
import Policies from './Policies';
import PoliciesRegistrationForm from './PoliciesRegistrationForm';
import PolicyEditForm from './PolicyEditForm';
import PolicyRemovalDialog from './PolicyRemovalDialog';

const addPoliciesSchema = yup.object().shape({
  vehicleClass: yup.string().required('Class name is required!'),
  condition: yup.string().required('Condition is required!'),
  lostPercentage: yup
    .number()
    .typeError('You must enter a positive number!')
    .min(0, 'Minimum lost percentage is 0')
    .max(100, 'Maximum lost percentage is 100')
    .required('Lost percentage is required!'),
});

const editPolicySchema = yup.object().shape({
  vehicleClass: yup
    .object()
    .shape({
      name: yup.string().required('Class name is required!'),
    })
    .typeError('You must select a specific class!'),
  condition: yup.string().required('Condition is required!'),
  lostPercentage: yup
    .number()
    .typeError('You must enter a positive number!')
    .min(0, 'Minimum lost percentage is 0')
    .max(100, 'Maximum lost percentage is 100')
    .required('Lost percentage is required!'),
});

function getSchema(schema) {
  switch (schema) {
    case 'add':
      return yupResolver(addPoliciesSchema);
    case 'edit':
      return yupResolver(editPolicySchema);
    default:
      break;
  }
}

function PoliciesManagement({
  loading,
  classes,
  patchPolicy,
  postPolicy,
  deletePolicy,
  exchangePolicies,
  cancellationPolicies,
}) {
  const [schema, setSchema] = useState('');
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [removalDialogOpen, setRemovalDialogOpen] = useState(false);
  const [editPolicy, setEditPolicy] = useState({});
  const [removalPolicyId, setRemovalPolicyId] = useState(null);
  const [chosenPolicyType, setChosenPolicyType] = useState(null);

  const { register, handleSubmit, errors, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: getSchema(schema),
  });

  const handleOpenRegistrationDialog = (policyType) => {
    setSchema('add');
    setChosenPolicyType(policyType);
    setRegistrationDialogOpen(true);
  };

  const handleCloseRegistrationDialog = () => {
    setChosenPolicyType(null);
    setRegistrationDialogOpen(false);
  };

  const handleOpenEditDialog = (editPolicy) => {
    setSchema('edit');
    setEditPolicy({ ...editPolicy });
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditPolicy({});
    setEditDialogOpen(false);
  };

  const handleOpenRemovalDialog = (policyId) => {
    setRemovalPolicyId(policyId);
    setRemovalDialogOpen(true);
  };

  const handleCloseRemovalDialog = () => {
    setRemovalPolicyId(null);
    setRemovalDialogOpen(false);
  };

  const onAddPolicySubmit = async (data) => {
    const classIndex = classes.findIndex(
      (eachClass) => eachClass.name === data.vehicleClass,
    );
    try {
      await postPolicy(chosenPolicyType, {
        ...data,
        classId: classes[classIndex].id,
      });
      handleCloseRegistrationDialog();
      toast.success('Add policies successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const isTheSamePolicy = (newPolicy) => {
    if (newPolicy.vehicleClass.id !== editPolicy.classId) return false;
    if (newPolicy.condition !== editPolicy.condition) return false;
    if (newPolicy.lostPercentage !== editPolicy.lostPercentage) return false;
    return true;
  };

  const filterNewPolicy = (newPolicy) => {
    if (newPolicy.vehicleClass.id === editPolicy.classId) {
      newPolicy.vehicleClass = '';
    } else {
      newPolicy.vehicleClass = JSON.stringify(newPolicy.vehicleClass);
    }
    if (newPolicy.condition === editPolicy.condition) newPolicy.condition = '';
    if (newPolicy.lostPercentage === editPolicy.lostPercentage)
      newPolicy.lostPercentage = '';
    return newPolicy;
  };

  const onEditPolicySubmit = async (data) => {
    if (isTheSamePolicy(data)) {
      toast.warning('You are not changing anything!');
      return;
    }
    try {
      await patchPolicy(filterNewPolicy(data), editPolicy.id);
      handleCloseEditDialog();
      toast.success('Edit policy successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const onDeletePolicy = async (policyId) => {
    try {
      await deletePolicy(policyId);
      handleCloseRemovalDialog();
      toast.success('Remove policy successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Policies
        classes={classes}
        exchangePolicies={exchangePolicies}
        cancellationPolicies={cancellationPolicies}
        handleOpenEditDialog={handleOpenEditDialog}
        handleOpenRemovalDialog={handleOpenRemovalDialog}
        handleOpenRegistrationDialog={handleOpenRegistrationDialog}
      />

      <PoliciesRegistrationForm
        errors={errors}
        loading={loading}
        control={control}
        classes={classes}
        register={register}
        chosenPolicyType={chosenPolicyType}
        dialogOpen={registrationDialogOpen}
        onClose={handleCloseRegistrationDialog}
        onSubmit={handleSubmit(onAddPolicySubmit)}
      />

      <PolicyEditForm
        errors={errors}
        loading={loading}
        classes={classes}
        control={control}
        register={register}
        editPolicy={editPolicy}
        dialogOpen={editDialogOpen}
        onClose={handleCloseEditDialog}
        onSubmit={handleSubmit(onEditPolicySubmit)}
      />

      <PolicyRemovalDialog
        loading={loading}
        dialogOpen={removalDialogOpen}
        onDeletePolicy={onDeletePolicy}
        removalPolicyId={removalPolicyId}
        onClose={handleCloseRemovalDialog}
      />
    </>
  );
}

function mapStateToProps(state) {
  const { classes } = state.partner;
  let exchangePolicies = [];
  let cancellationPolicies = [];
  if (state.partner.exchangePolicies.length) {
    exchangePolicies = state.partner.exchangePolicies.map((policy) => {
      const classIndex = classes.findIndex(
        (eachClass) => eachClass.id === policy.classId,
      );
      return { ...policy, className: classes[classIndex]?.name };
    });
  }
  if (state.partner.cancellationPolicies.length) {
    cancellationPolicies = state.partner.cancellationPolicies.map((policy) => {
      const classIndex = classes.findIndex(
        (eachClass) => eachClass.id === policy.classId,
      );
      return { ...policy, className: classes[classIndex]?.name };
    });
  }
  return {
    exchangePolicies,
    cancellationPolicies,
    classes: state.partner.classes,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  postPolicy: partnerActions.postPolicy,
  patchPolicy: partnerActions.patchPolicy,
  deletePolicy: partnerActions.deletePolicy,
};

export default connect(mapStateToProps, mapDispatchToProps)(PoliciesManagement);
