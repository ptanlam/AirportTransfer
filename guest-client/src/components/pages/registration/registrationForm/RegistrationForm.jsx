import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Alert } from '@material-ui/lab';

import VerticalLabelInput from '../../../commons/VerticalLabelInput';
import { CircularProgress } from '@material-ui/core';

export default function RegistrationForm({
  register,
  onSubmit,
  errors,
  responseErrors,
  loading,
}) {
  return (
    <form onSubmit={onSubmit}>
      <DialogTitle>Đăng ký tài khoản</DialogTitle>
      <DialogContent>
        <VerticalLabelInput
          loading={loading}
          inputName='firstName'
          label='Họ'
          type='text'
          register={register}
          error={errors?.firstName?.message.length > 0}
          helperText={errors?.firstName?.message}
          maxLength={40}
          minLength={2}
        />
        <VerticalLabelInput
          loading={loading}
          inputName='lastName'
          label='Tên'
          type='text'
          register={register}
          error={errors?.lastName?.message.length > 0}
          helperText={errors?.lastName?.message}
          maxLength={40}
          minLength={2}
        />
        <VerticalLabelInput
          loading={loading}
          inputName='phoneNumber'
          label='Số điện thoại'
          type='number'
          register={register}
          error={errors?.phoneNumber?.message.length > 0}
          helperText={errors?.phoneNumber?.message}
          maxLength={15}
          minLength={10}
        />
        <VerticalLabelInput
          loading={loading}
          inputName='email'
          label='Email'
          type='text'
          register={register}
          error={errors.email?.message.length > 0}
          helperText={errors.email?.message}
        />
        <VerticalLabelInput
          loading={loading}
          inputName='password'
          label='Mật khẩu'
          type='password'
          register={register}
          error={errors.password?.message.length > 0}
          helperText={errors.password?.message}
        />
        <VerticalLabelInput
          loading={loading}
          inputName='passwordConfirmation'
          label='Xác nhận lại mật khẩu'
          type='password'
          register={register}
          error={errors.passwordConfirmation?.message.length > 0}
          helperText={errors.passwordConfirmation?.message}
        />
      </DialogContent>
      <DialogContent>
        {Object.keys(responseErrors).length > 0 && (
          <Grid item container>
            <Alert variant='filled' severity='error' style={{ width: '100%' }}>
              <strong>{responseErrors.message}</strong>
            </Alert>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button type='submit' color='primary'>
            Đăng ký
          </Button>
        )}
      </DialogActions>
    </form>
  );
}
