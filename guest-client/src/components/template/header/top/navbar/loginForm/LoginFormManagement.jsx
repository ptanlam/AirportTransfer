import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Hidden from '@material-ui/core/Hidden';
import LoginForm from './LoginForm';
import userActions from '../../../../../../redux/actions/userActions';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
  flex: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  span: {
    marginLeft: 10,
  },
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Hãy nhập đúng email')
    .required('Vui lòng nhập email'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

function LoginFormManagement({ login }) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [responseErrors, setResponseErrors] = useState({});
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const mount = useRef(true);

  useEffect(() => {
    return () => {
      mount.current = false;
    };
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    if (loading) return;
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onForgetPasswordClick = () => history.push('/forget-password');

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      if (!mount.current) return;
      await login(email, password);
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      if (!mount.current) return;
      setResponseErrors({ message: error.message });
    } finally {
      if (!mount.current) return;
      setLoading(false);
    }
  };

  return (
    <Grid item xs container justify='center'>
      <Box className={classes.flex} onClick={handleClick}>
        <FontAwesomeIcon
          icon={faUserAlt}
          className='navbar__icon-6'
          style={{ marginRight: 8 }}
        />
        <Hidden smDown>
          <Typography>Đăng nhập</Typography>
        </Hidden>
      </Box>
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
          loading={loading}
          register={register}
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
          responseErrors={responseErrors}
          onForgetPasswordClick={onForgetPasswordClick}
        />
      </Popover>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  login: userActions.login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormManagement);
