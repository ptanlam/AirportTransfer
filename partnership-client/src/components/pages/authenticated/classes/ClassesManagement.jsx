import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Classes from './Classes';
import ClassesRegistrationForm from './ClassesRegistrationForm';
import { toast } from 'react-toastify';
import partnerActions from '../../../../redux/actions/partnerActions';
import ClassEditForm from './ClassEditForm';
import ClassRemovalDialog from './ClassRemovalDialog';

const classSchema = yup.object().shape({
  name: yup.string().required('Class name is required!'),
});

function ClassesManagement({
  classes,
  loading,
  postClass,
  partnerId,
  patchClass,
  deleteClass,
}) {
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [removalDialogOpen, setRemovalDialogOpen] = useState(false);
  const [removalClassId, setRemovalClassId] = useState(null);
  const [chosenEditClass, setChosenEditClass] = useState({});
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(classSchema),
  });

  const handleOpenRegistrationDialog = () => {
    setRegistrationDialogOpen(true);
  };

  const handleCloseRegistrationDialog = () => {
    setRegistrationDialogOpen(false);
  };

  const handleOpenEditDialog = (editClass) => {
    setChosenEditClass({ ...editClass });
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setChosenEditClass({});
    setEditDialogOpen(false);
  };

  const handleOpenRemovalDialog = (classId) => {
    setRemovalClassId(classId);
    setRemovalDialogOpen(true);
  };

  const handleCloseRemovalDialog = () => {
    setRemovalClassId(null);
    setRemovalDialogOpen(false);
  };

  const onAddClassesSubmit = async (data) => {
    try {
      await postClass({ ...data, partnerId });
      toast.success('Add classes successfully!');
      handleCloseRegistrationDialog();
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const onEditClassSubmit = async (data) => {
    if (data.name === chosenEditClass.name) {
      toast.error('You are not changing anything!');
      return;
    }

    try {
      await patchClass(chosenEditClass.id, data.name, partnerId);
      toast.success('Edit class successfully!');
      handleCloseEditDialog();
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const onDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
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
      <Classes
        classes={classes}
        handleOpenEditDialog={handleOpenEditDialog}
        handleOpenRemovalDialog={handleOpenRemovalDialog}
        handleOpenRegistrationDialog={handleOpenRegistrationDialog}
      />

      <ClassesRegistrationForm
        errors={errors}
        loading={loading}
        register={register}
        onSubmit={handleSubmit(onAddClassesSubmit)}
        dialogOpen={registrationDialogOpen}
        onClose={handleCloseRegistrationDialog}
      />

      <ClassEditForm
        errors={errors}
        loading={loading}
        register={register}
        dialogOpen={editDialogOpen}
        onClose={handleCloseEditDialog}
        editClassName={chosenEditClass.name}
        onSubmit={handleSubmit(onEditClassSubmit)}
      />

      <ClassRemovalDialog
        loading={loading}
        onDeleteClass={onDeleteClass}
        dialogOpen={removalDialogOpen}
        removalClassId={removalClassId}
        onClose={handleCloseRemovalDialog}
      />
    </>
  );
}

function mapStateToProps(state) {
  const { vehicles } = state;
  const { exchangePolicies, cancellationPolicies } = state.partner;
  const classes = state.partner.classes.map((eachClass) => {
    const hasExchangePolicy = exchangePolicies.some(
      (policy) => policy.classId === eachClass.id,
    );
    if (hasExchangePolicy)
      return { ...eachClass, canBeRemoved: hasExchangePolicy };
    const hasCancellationPolicy = cancellationPolicies.some(
      (policy) => policy.classId === eachClass.id,
    );
    if (hasCancellationPolicy)
      return { ...eachClass, canBeRemoved: hasCancellationPolicy };
    const hasVehicle = vehicles.some(
      (vehicle) => vehicle.classId === eachClass.id,
    );
    if (hasVehicle) return { ...eachClass, canBeRemoved: hasVehicle };
    return { ...eachClass, canBeRemoved: false };
  });
  return {
    classes,
    partnerId: state.partner.id,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  postClass: partnerActions.postClass,
  patchClass: partnerActions.patchClass,
  deleteClass: partnerActions.deleteClass,
};
export default connect(mapStateToProps, mapDispatchToProps)(ClassesManagement);
