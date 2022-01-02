import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { BASE_API_URL } from '../../../../constants';
import NotificationDialog from '../../../commons/NotificationDialog';
import RedirectNotificationDialog from '../../../commons/RedirectNotificationDialog';
import ForgetPasswordForm from './ForgetPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import ValidateResetPasswordCodeForm from './ValidateResetPasswordCodeForm';

const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('You have to enter your email!')
    .test('checkEmailExists', 'Your email does not exist!', async (email) => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/auth/emails/${email}`,
        );
        return response.data.doesExist;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    })
    .required('Email is required'),
});

const validateResetPasswordCodeSchema = yup.object().shape({
  resetPasswordCode: yup.number().required('Reset password code is required'),
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password contains at least 8 characters, 1 uppercase letter, ' +
        '1 lowercase letter, 1 number and 1 special character!',
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match!'),
});

function getSchemaByStep(step) {
  switch (step) {
    case 0:
      return yupResolver(forgetPasswordSchema);
    case 1:
      return yupResolver(validateResetPasswordCodeSchema);
    case 2:
      return yupResolver(resetPasswordSchema);
    default:
      break;
  }
}

export default function ForgetPasswordManagement() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [step, setStep] = useState(0);
  const [notificationDialog, setNotificationDialog] = useState({
    open: false,
    notification: '',
  });
  const [redirectNotificationDialog, setRedirectNotificationDialog] = useState({
    open: false,
    notification: '',
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: getSchemaByStep(step),
  });

  const onEmailSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_API_URL}/auth/resetPasswordCode`,
        data,
      );
      setNotificationDialog({
        ...notificationDialog,
        open: true,
        notification: response.data.message,
      });
      setEmail(data.email);
      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      setNotificationDialog({
        ...notificationDialog,
        open: true,
        notification: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onResetPasswordCodeSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_API_URL}/auth/checkResetPasswordCode`,
        {
          resetPasswordCode: data.resetPasswordCode,
          email,
        },
      );
      if (!response.data.isValid) {
        toast.error('Your provided code is invalid!');
        return;
      }
      setNotificationDialog({
        ...notificationDialog,
        open: true,
        notification: response.data.message,
      });
      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      setNotificationDialog({
        ...notificationDialog,
        open: true,
        notification: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onResetPasswordSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.patch(`${BASE_API_URL}/auth/resetPassword`, {
        password: data.password,
        email,
      });
      setRedirectNotificationDialog({
        ...redirectNotificationDialog,
        open: true,
        notification: response.data.message,
      });
    } catch (error) {
      setNotificationDialog({
        ...notificationDialog,
        open: true,
        notification: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const getFormByStep = () => {
    switch (step) {
      case 0:
        return (
          <ForgetPasswordForm
            errors={errors}
            loading={loading}
            register={register}
            onSubmit={handleSubmit(onEmailSubmit)}
          />
        );
      case 1:
        return (
          <ValidateResetPasswordCodeForm
            errors={errors}
            loading={loading}
            register={register}
            onSubmit={handleSubmit(onResetPasswordCodeSubmit)}
          />
        );
      case 2:
        return (
          <ResetPasswordForm
            errors={errors}
            loading={loading}
            register={register}
            onSubmit={handleSubmit(onResetPasswordSubmit)}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      {getFormByStep()}
      {notificationDialog.open && (
        <NotificationDialog notification={notificationDialog.notification} />
      )}
      {redirectNotificationDialog.open && (
        <RedirectNotificationDialog
          redirect='/login'
          notification={redirectNotificationDialog.notification}
        />
      )}
    </>
  );
}
