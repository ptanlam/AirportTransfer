import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { BASE_API_URL } from '../../../../../constants';
import vehicleActions from '../../../../../redux/actions/vehicleActions';
import VehicleRegistrationForm from './VehicleRegistrationForm';

yup.addMethod(yup.array, 'unique', function (message, mapper = (a) => a) {
  return this.test('unique', message, function (list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});

const busSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
      'Vehicle name must not contain too many white spaces, ' +
        'be longer than 3 and lower than 250 characters!',
    )
    .required('Vehicle name is required!'),
  class: yup.string().required('Class is required!'),
  guestQuantity: yup
    .number('Guest quantity must be a number!')
    .typeError('Guest quantity is required!')
    .moreThan(0, 'Guest quantity must be a positive value!')
    .required('Guest quantity is required!'),
  ticketPrice: yup
    .number('Ticket price quantity must be a number!')
    .typeError('Ticket price is required!')
    .moreThan(0, 'Ticket price must be a positive value!')
    .required('Ticket price is required!'),
});

const basedVehicleSchema = yup.object({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$/,
      'Vehicle name must not contain too many white spaces, ' +
        'be longer than 3 and lower than 250 characters!',
    )
    .required('Vehicle name is required!'),
});

const carSchema = basedVehicleSchema.shape({
  guestQuantity: yup
    .number('Guest quantity must be a number!')
    .typeError('Guest quantity is required!')
    .moreThan(0, 'Guest quantity must be a positive value!')
    .required('Guest quantity is required!'),
  luggagePayload: yup
    .number('Luggage payload must be a number!')
    .typeError('Luggage payload is required!')
    .moreThan(0, 'Luggage payload must be a positive value!')
    .required('Luggage payload is required!'),
  standardPricePerKm: yup
    .number('Standard price per km must be a number!')
    .typeError('Standard price per km is required!')
    .moreThan(0, 'Standard price per km must be a positive value!')
    .required('Standard price per km is required!'),
  class: yup.string().required('Class is required!'),
  cars: yup
    .array()
    .of(
      yup.object().shape({
        licencePlate: yup
          .string()
          .matches(
            /^(?:\d{2}-[A-Z]{1}\d{1}\s\d{4,5})*$/,
            'Licence plate is required!',
          )
          .test(
            'testLicencePlateExists',
            'Licence plate exists!',
            async (licencePlate) => {
              if (!licencePlate) return true;
              try {
                const response = await axios.get(
                  `${BASE_API_URL}/cars/licencePlates/${licencePlate}`,
                );
                return !response.data.exists;
              } catch (error) {
                toast.error(error.response.data.message);
              }
            },
          )
          .required('Licence plate is required!'),
        color: yup.string().required('Color is required'),
      }),
    )
    .unique('Licence plate must be unique', (value) => value.licencePlate),
});

const trainSchema = basedVehicleSchema.shape({
  class: yup.string().required('Class is required!'),
  ticketPrice: yup
    .number('Ticket price quantity must be a number!')
    .typeError('Ticket price is required!')
    .moreThan(0, 'Ticket price must be a positive value!')
    .required('Ticket price is required!'),
});

const flightSchema = basedVehicleSchema.shape({
  guestQuantity: yup
    .number('Guest quantity must be a number!')
    .typeError('Guest quantity is required!')
    .moreThan(0, 'Guest quantity must be a positive value!'),
});

function getSchema(transportType) {
  if (transportType === 'buses') return yupResolver(busSchema);
  if (transportType === 'cars') return yupResolver(carSchema);
  if (transportType === 'trains') return yupResolver(trainSchema);
  if (transportType === 'flights') return yupResolver(flightSchema);
}

function VehicleRegistrationFormManagement({
  classes,
  partnerId,
  dialogOpen,
  postVehicle,
  toggleDialog,
  transportType,
}) {
  const [photoFile, setPhotoFile] = useState();
  const [loading, setLoading] = useState(false);
  const [numberOfCars, setNumberOfCars] = useState(1);

  const { register, handleSubmit, control, errors } = useForm({
    resolver: getSchema(transportType),
  });

  const onPhotoChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPhotoFile(undefined);
    }
    setPhotoFile(e.target.files[0]);
  };

  const increaseNumberOfCarsChange = () => {
    setNumberOfCars((prevState) => prevState + 1);
  };

  const decreaseNumberOfCarsChange = () => {
    if (numberOfCars === 1) {
      toast.error('Number of cars must be larger than 1!');
      return;
    }
    setNumberOfCars((prevState) => prevState - 1);
  };

  const onSubmit = async (data) => {
    let information = { ...data };
    if (transportType !== 'flights') {
      const classIndex = classes.findIndex(
        (eachClass) => eachClass.name === data.class,
      );
      information = { ...data, class: classes[classIndex].id };
    }
    setLoading(true);
    try {
      await postVehicle(transportType, {
        ...information,
        partnerId,
      });
      setPhotoFile(undefined);
      toggleDialog();
      toast.success('Add vehicle successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <VehicleRegistrationForm
      errors={errors}
      classes={classes}
      loading={loading}
      control={control}
      register={register}
      photoFile={photoFile}
      dialogOpen={dialogOpen}
      numberOfCars={numberOfCars}
      toggleDialog={toggleDialog}
      transportType={transportType}
      onPhotoChange={onPhotoChange}
      onSubmit={handleSubmit(onSubmit)}
      increaseNumberOfCarsChange={increaseNumberOfCarsChange}
      decreaseNumberOfCarsChange={decreaseNumberOfCarsChange}
    />
  );
}

function mapStateToProps(state) {
  return {
    classes: state.partner.classes,
  };
}

const mapDispatchToProps = {
  postVehicle: vehicleActions.postVehicle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehicleRegistrationFormManagement);
