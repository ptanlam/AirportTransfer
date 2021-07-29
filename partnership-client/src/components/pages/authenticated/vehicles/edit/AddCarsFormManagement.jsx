import React, { useState } from 'react';
import AddCarsForm from './AddCarsForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import vehicleActions from '../../../../../redux/actions/vehicleActions';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_API_URL } from '../../../../../constants';

yup.addMethod(yup.array, 'unique', function (message, mapper = (a) => a) {
  return this.test('unique', message, function (list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});

const addCarsSchema = yup.object().shape({
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

function AddCarsFormManagement({
  vehicleId,
  dialogOpen,
  closeDialog,
  addCars,
}) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(addCarsSchema),
  });
  const [numberOfCars, setNumberOfCars] = useState(1);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await addCars(vehicleId, data.cars);
      closeDialog();
      toast.success('Add car successfully!');
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.warning('Please login to continue!');
      } else {
        toast.error(error?.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const changeNumberOfCars = (operation) => {
    switch (operation) {
      case 'add':
        setNumberOfCars(numberOfCars + 1);
        break;
      case 'subtract':
        setNumberOfCars(numberOfCars - 1);
        break;
      default:
        break;
    }
  };

  return (
    <AddCarsForm
      errors={errors}
      loading={loading}
      register={register}
      dialogOpen={dialogOpen}
      closeDialog={closeDialog}
      numberOfCars={numberOfCars}
      onSubmit={handleSubmit(onSubmit)}
      changeNumberOfCars={changeNumberOfCars}
    />
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  addCars: vehicleActions.addCars,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCarsFormManagement);
