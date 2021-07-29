import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { BASE_API_URL } from '../../../../constants';
import accountActions from '../../../../redux/actions/accountActions';
import Account from './Account';
import ChangePasswordForm from './ChangePasswordForm';
import AccountEditForm from './AccountEditForm';

const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password contains at least 8 characters, 1 uppercase letter, ' +
        '1 lowercase letter, 1 number and 1 special character!',
    ),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password contains at least 8 characters, 1 uppercase letter, ' +
        '1 lowercase letter, 1 number and 1 special character!',
    )
    .notOneOf(
      [yup.ref('currentPassword'), null],
      'Your new password must be different from the current!',
    ),
  newPasswordConfirmation: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Password must match!'),
});

function AccountManagement({ account, logout, updateProfile }) {
  const [changePassFormVisibility, setChangePassFormVisibility] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [announcementDialog, setAnnouncementDialog] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(changePasswordSchema),
  });

  const toggleChangePassForm = () =>
    setChangePassFormVisibility(!changePassFormVisibility);

  const toggleEditDialog = () => setEditDialogOpen(!editDialogOpen);

  const onChangePassSubmit = async (data) => {
    const { currentPassword, newPassword } = data;
    try {
      setLoading(true);
      await axios.patch(`${BASE_API_URL}/auth/${account.id}/password`, {
        currentPassword,
        newPassword,
      });
      setAnnouncementDialog(true);
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

  const onConfirmClick = async () => {
    try {
      setAnnouncementDialog(false);
      await logout();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Box
      position='absolute'
      top={0}
      width='100%'
      minHeight='100vh'
      bgcolor='#1D80C3'>
      <Container style={{ paddingTop: 110, paddingBottom: 20 }} maxWidth='sm'>
        <Grid container direction='column' style={{ gap: 20 }}>
          <Grid item>
            <Account account={account} openEditDialog={toggleEditDialog} />
          </Grid>
          <Grid container item justify='center'>
            <Button onClick={toggleChangePassForm} variant='contained'>
              Change password
            </Button>
          </Grid>
          {changePassFormVisibility && (
            <Grid item>
              <ChangePasswordForm
                loading={loading}
                errors={errors}
                register={register}
                onSubmit={handleSubmit(onChangePassSubmit)}
              />
            </Grid>
          )}
        </Grid>

        <Dialog open={announcementDialog}>
          <DialogTitle>Announcement</DialogTitle>
          <DialogContent>
            <Typography>
              Change password successfully! Regarding security concerns, please
              login again!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onConfirmClick}>Confirm</Button>
          </DialogActions>
        </Dialog>

        <AccountEditForm
          account={account}
          onClose={toggleEditDialog}
          dialogOpen={editDialogOpen}
        />
      </Container>
    </Box>
  );
}

function mapStateToProps(state) {
  const { isActive, isAuthenticated, role, ...account } = state.account;
  return { account };
}

const mapDispatchToProps = {
  logout: accountActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);
