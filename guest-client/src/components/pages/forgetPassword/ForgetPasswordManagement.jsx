import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BASE_API_URL } from '../../../constants';
import NotificationDialog from '../../commons/NotificationDialog';
import RedirectNotificationDialog from '../../commons/RedirectNotificationDialog';
import ForgetPasswordForm from './ForgetPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import ValidateResetPasswordCodeForm from './ValidateResetPasswordCodeForm';
import { toast } from 'react-toastify';

const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .test('checkEmailExists', 'Email không tồn tại', async (email) => {
      try {
        const response = await axios.post(`${BASE_API_URL}/auth/emails`, {
          email,
        });
        return response.data.doesExist;
      } catch (error) {
        console.error(error.response.data.message);
      }
    })
    .required('Vui lòng nhập Email'),
});

const validateResetPasswordCodeSchema = yup.object().shape({
  resetPasswordCode: yup.number().required('Vui lòng nhập mã reset password'),
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Mật khẩu phải có ít nhất 8 ký tự, trong đó bao gồm' +
        '1 chữ in hoa, 1 chữ in thường, 1 chữ số và 1 ký tự đặc biệt'
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Không trùng khớp'),
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
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: getSchemaByStep(step),
  });

  const onEmailSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_API_URL}/auth/resetPasswordCode`, data);
      setNotificationDialog({
        ...notificationDialog,
        open: true,
        notification: 'Đã gửi bảng hướng dẫn thông qua email của bạn',
      });
      setEmail(data.email);
      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      setNotificationDialog({
        ...notificationDialog,
        open: true,
        notification: 'Đã xảy ra lỗi',
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
        }
      );
      if (!response.data.isValid) {
        toast.error('Mã không hợp lệ');
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
        notification: 'Đã xảy ra lỗi',
      });
    } finally {
      setLoading(false);
    }
  };

  const onResetPasswordSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.patch(`${BASE_API_URL}/auth/resetPassword`, {
        password: data.password,
        email,
      });
      setRedirectNotificationDialog({
        ...redirectNotificationDialog,
        open: true,
        notification: 'Đặt lại mật khẩu thành công',
      });
    } catch (error) {
      setNotificationDialog({
        ...notificationDialog,
        open: true,
        notification: 'Đã xảy ra lỗi',
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
          redirect='/'
          notification={redirectNotificationDialog.notification}
        />
      )}
    </>
  );
}
