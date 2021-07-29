import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { BASE_API_URL } from '../../../../constants';
import RedirectNotificationDialog from '../../../commons/RedirectNotificationDialog';
import ResendVerificationEmailForm from './ResendVerificationEmailForm';

const resendVerificationEmailSchema = yup.object().shape({
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
        console.error(error.response.data.message);
      }
    })
    .required('Email is required'),
});

export default function ResendVerificationEmailManagement() {
  const [notificationDialog, setNotificationDialog] = useState({
    open: false,
    notification: '',
  });
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(resendVerificationEmailSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_API_URL}/auth/resendVerificationEmail`,
        data,
      );
      setNotificationDialog({
        ...notificationDialog,
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

  return (
    <>
      <ResendVerificationEmailForm
        errors={errors}
        loading={loading}
        register={register}
        onSubmit={handleSubmit(onSubmit)}
      />
      {notificationDialog.open && (
        <RedirectNotificationDialog
          redirect='/login'
          notification={notificationDialog.notification}
        />
      )}
    </>
  );
}
