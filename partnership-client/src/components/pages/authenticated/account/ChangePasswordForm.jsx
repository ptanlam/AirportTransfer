import { Button, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import VerticalLabelInput from '../../../commons/VerticalLabelInput';

const useStyles = makeStyles({
  paper: {
    padding: 30,
  },
});

const fields = [
  {
    label: 'Enter your current password',
    inputName: 'currentPassword',
    type: 'password',
  },
  {
    label: 'Enter your new password ',
    inputName: 'newPassword',
    type: 'password',
  },
  {
    label: 'Enter your new password again',
    inputName: 'newPasswordConfirmation',
    type: 'password',
  },
];

export default function ChangePasswordForm({
  errors,
  loading,
  register,
  onSubmit,
}) {
  const classes = useStyles();

  return (
    <form onSubmit={onSubmit}>
      <Paper className={classes.paper}>
        <Grid container direction='column' style={{ gap: 10 }}>
          {fields.map((field) => (
            <Grid item key={field.inputName}>
              <VerticalLabelInput
                type={field.type}
                loading={loading}
                register={register}
                label={field.label}
                inputName={field.inputName}
                helperText={errors?.[field.inputName]?.message}
                error={errors?.[field.inputName]?.message.length > 0}
              />
            </Grid>
          ))}

          <Grid container item justify='flex-end'>
            <Button
              disabled={loading}
              type='submit'
              variant='contained'
              color='primary'>
              {loading ? 'Changing...' : 'Change'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}
