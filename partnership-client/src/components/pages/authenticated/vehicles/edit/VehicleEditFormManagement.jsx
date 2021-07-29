import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import VehicleEditForm from './VehicleEditForm';
import { toast } from 'react-toastify';
import vehicleActions from '../../../../../redux/actions/vehicleActions';

const editBusSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
      'Vehicle name must not contain too many white spaces, ' +
        'be longer than 3 and lower than 250 characters!',
    )
    .required('Vehicle name is required!'),
  guestQuantity: yup
    .number('Guest quantity must be a number!')
    .moreThan(0, 'Guest quantity must be a positive value!')
    .required('Guest quantity is required!'),
  class: yup.string().required('Class is required!'),
  ticketPrice: yup
    .number('Ticket price quantity must be a number!')
    .moreThan(0, 'Ticket price must be a positive value!')
    .required('Ticket price is required!'),
});

const editTrainSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
      'Vehicle name must not contain too many white spaces, ' +
        'be longer than 3 and lower than 250 characters!',
    )
    .required('Vehicle name is required!'),
  class: yup.string().required('Class is required!'),
  ticketPrice: yup
    .number('Ticket price quantity must be a number!')
    .moreThan(0, 'Ticket price must be a positive value!')
    .required('Ticket price is required!'),
});

const editCarSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
      'Vehicle name must not contain too many white spaces, ' +
        'be longer than 3 and lower than 250 characters!',
    )
    .required('Vehicle name is required!'),
  guestQuantity: yup
    .number('Guest quantity must be a number!')
    .moreThan(0, 'Guest quantity must be a positive value!')
    .required('Guest quantity is required!'),
  class: yup.string().required('Class is required!'),
  luggagePayload: yup
    .number('Luggage payload must be a number!')
    .moreThan(0, 'Luggage payload must be a positive value!')
    .required('Luggage payload is required!'),
  standardPricePerKm: yup
    .number('Standard price per km must be a number!')
    .moreThan(0, 'Standard price per km must be a positive value!')
    .required('Standard price per km is required!'),
});

const editFlightSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
      'Vehicle name must not contain too many white spaces, ' +
        'be longer than 3 and lower than 250 characters!',
    )
    .required('Vehicle name is required!'),
  guestQuantity: yup
    .number('Guest quantity must be a number!')
    .moreThan(0, 'Guest quantity must be a positive value!')
    .required('Guest quantity is required!'),
});

function getSchema(transportType) {
  switch (transportType) {
    case 'buses':
      return yupResolver(editBusSchema);
    case 'flights':
      return yupResolver(editFlightSchema);
    case 'trains':
      return yupResolver(editTrainSchema);
    case 'cars':
      return yupResolver(editCarSchema);
    default:
      break;
  }
}

function VehicleEditFormManagement({
  loading,
  classes,
  vehicle,
  vehicleId,
  dialogOpen,
  closeDialog,
  transportType,
  updateVehicle,
}) {
  const [photoFile, setPhotoFile] = useState();
  const { register, handleSubmit, control, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: getSchema(transportType),
  });

  const onPhotoChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPhotoFile(undefined);
      return;
    }
    setPhotoFile(e.target.files[0]);
  };

  const carWorkingPlaceChangesCheck = (
    updatedWorkingPlace,
    oldWorkingPlace,
  ) => {
    let newWorkingPlace = { city: null, country: null };
    if (Object.keys(updatedWorkingPlace).length > 0) {
      const { city, country } = updatedWorkingPlace;
      newWorkingPlace = {
        city: city === oldWorkingPlace.city ? null : city,
        country: country === oldWorkingPlace.country ? null : city,
      };
    }
    return { ...newWorkingPlace };
  };

  const isChanged = (data) => {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      if (key === 'photo')
        data[key] = data[key].length === 0 ? null : data[key];
      data[key] = data[key] === vehicle[key] ? null : data[key];
    });
    return Object.values(data).some((each) => each !== null);
  };

  const onSubmit = async (data) => {
    const classIndex = classes.findIndex(
      (eachClass) => eachClass.name === data.class,
    );

    if (transportType === 'cars') {
      const { workingPlace } = data;
      const newWorkingPlace = carWorkingPlaceChangesCheck(workingPlace, {
        city: vehicle.city,
        country: vehicle.country,
      });
      data.city = newWorkingPlace.city;
      data.country = newWorkingPlace.country;
      delete data.workingPlace;
    }

    let editInformation = { ...data };
    if (transportType !== 'flights') {
      const newClassId = classes[classIndex].id;
      editInformation = {
        ...data,
        class: newClassId === vehicle.classId ? null : newClassId,
      };
    }

    if (!isChanged(editInformation)) {
      toast.warning('You are not changing anything!');
      return;
    }
    const photoUrlSections = vehicle.photoUrl.split('/');
    try {
      await updateVehicle(transportType, {
        ...editInformation,
        vehicleId,
        oldPhotoKey: photoUrlSections[photoUrlSections.length - 1],
      });
      setPhotoFile(undefined);
      closeDialog();
      toast.success('Update vehicle successfully!');
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.warning('Please login to continue!');
      } else if (error?.response?.status === 503) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {dialogOpen && (
        <VehicleEditForm
          errors={errors}
          classes={classes}
          control={control}
          loading={loading}
          vehicle={vehicle}
          register={register}
          photoFile={photoFile}
          dialogOpen={dialogOpen}
          closeDialog={closeDialog}
          transportType={transportType}
          onPhotoChange={onPhotoChange}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
    </>
  );
}

function mapStateToProps(state, ownProps) {
  const { vehicleId, dialogOpen } = ownProps;
  if (!dialogOpen) return {};
  return {
    classes: state.partner.classes,
    loading: state.apiCallsInProgress > 0,
    vehicle: state.vehicles.find((vehicle) => vehicle.id === vehicleId),
  };
}

const mapDispatchToProps = {
  updateVehicle: vehicleActions.patchVehicle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehicleEditFormManagement);
