import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import accountActions from '../../../../redux/actions/accountActions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_API_URL } from '../../../../constants';

const fields = [
  {
    label: 'First name',
    inputName: 'firstName',
  },
  {
    label: 'Last name',
    inputName: 'lastName',
  },
  {
    label: 'Phone number',
    inputName: 'phoneNumber',
  },
];

const editProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      'Your first name must be longer than 2 and lower than 40 characters!',
    ),
  lastName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      'Your last name must be longer than 2 and lower than 40 characters!',
    ),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
      'Your phone number must be longer than 10 and lower than ' +
        '15 numeric characters!',
    )
    .test(
      'checkPhoneNumberExists',
      'Phone number exists!',
      async (phoneNumber) => {
        if (phoneNumber === '') return false;
        try {
          const response = await axios.get(
            `${BASE_API_URL}/auth/phoneNumbers/${phoneNumber}`,
          );
          return !response.data.doesExist;
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    ),
});

function AccountEditForm({ account, onClose, dialogOpen, updateProfile }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(editProfileSchema),
  });

  const onSubmit = async (data) => {
    const hasChange = Object.keys(data).some(
      (key) => data[key] !== account[key],
    );
    if (!hasChange) {
      toast.warning('You are not changing anything!');
      return;
    }
    const updatedInfo = {};
    Object.keys(data).forEach((key) =>
      data[key] !== account[key]
        ? (updatedInfo[key] = data[key])
        : (updatedInfo[key] = null),
    );
    setLoading(true);
    try {
      await updateProfile(updatedInfo, account.id);
      onClose();
      toast.success('Update profile successfully!');
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.warning('Please login to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} maxWidth='sm' fullWidth>
      <DialogTitle>Update your profile</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container direction='column' style={{ gap: 15 }}>
            {fields.map((field, index) => (
              <Grid container item direction='column' key={index}>
                <Grid item>
                  <Typography
                    variant='caption'
                    style={{
                      fontWeight: 'bold',
                    }}>
                    {field.label}
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    size='small'
                    variant='outlined'
                    disabled={loading}
                    inputRef={register}
                    name={field.inputName}
                    defaultValue={account[field.inputName]}
                    helperText={errors[field.inputName]?.message}
                    error={!!errors[field.inputName]?.message.length}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={onClose}>
            Back
          </Button>
          <Button
            disabled={loading}
            type='submit'
            color='primary'
            variant='contained'>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  updateProfile: accountActions.updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountEditForm);
