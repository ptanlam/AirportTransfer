import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import accountActions from '../../../../redux/actions/accountActions';
import LoginForm from './LoginForm';
import { toast } from 'react-toastify';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Your email must be longer than 3 and lower than 320 characters!!')
    .required('Your email is required!'),

  password: yup.string().required('Your password is required!'),
});

function LoginFormManagement({ isAuthenticated, loading, login }) {
  const history = useHistory();
  const redirectUrl = history.location.state?.from.pathname || '/';
  const [responseErrors, setResponseErrors] = useState({});
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push(!redirectUrl ? '/' : redirectUrl);
    }
  }, [history, isAuthenticated, redirectUrl]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await login(email, password);
      toast.success('Login successfully!');
      history.push('/');
    } catch (error) {
      setResponseErrors({ message: error.message });
    }
  };

  const onForgetPasswordClick = () => history.push('/forget-password');
  const onResendEmailVerification = () =>
    history.push('/resend-email-verification');

  return (
    <LoginForm
      errors={errors}
      loading={loading}
      register={register}
      responseErrors={responseErrors}
      onSubmit={handleSubmit(onSubmit)}
      onForgetPasswordClick={onForgetPasswordClick}
      onResendEmailVerification={onResendEmailVerification}
    />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.account.isAuthenticated,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  login: accountActions.login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormManagement);
