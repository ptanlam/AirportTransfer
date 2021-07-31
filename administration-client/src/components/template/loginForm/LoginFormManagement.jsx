import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import LoginForm from './LoginForm';
import { toast } from 'react-toastify';
import userActions from '../../../redux/actions/userActions';

const loginSchema = yup.object({
  email: yup
    .string()
    .min(6, 'Email minimum length is 6')
    .email('You have to input correct email!')
    .required('Your email is required!'),
  password: yup.string().required('Your password is required!'),
});

function LoginFormManagement({ loading, login }) {
  const history = useHistory();
  const [responseErrors, setResponseErrors] = useState({});
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await login(email, password);
      toast.success('Log In Successfully');
      history.push('/');
    } catch (error) {
      setResponseErrors({ message: error.message });
    }
  };

  return (
    <Box component='div'>
      <Button aria-describedby={id} onClick={handleClick}>
        <Box component='span'>Sign In</Box>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <LoginForm
          errors={errors}
          loading={loading}
          register={register}
          responseErrors={responseErrors}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Popover>
    </Box>
  );
}

function mapStateToProps(state) {
  return { loading: state.apiCallsInProgress > 0 };
}

const mapDispatchToProps = {
  login: userActions.login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormManagement);
