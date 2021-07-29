import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import React from 'react';
import HorizontalLabelInput from '../../../commons/HorizontalLabelInput';

export default function ClassesRegistrationForm({
  errors,
  loading,
  onClose,
  onSubmit,
  register,
  dialogOpen,
}) {
  return (
    <Dialog open={dialogOpen} maxWidth='sm' fullWidth>
      <DialogTitle>Add classes</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container direction='column' style={{ gap: 20 }}>
            <Grid item>
              <HorizontalLabelInput
                label='Name'
                loading={loading}
                register={register}
                inputName='name'
                helperText={errors.name?.message}
                error={errors.name?.message.length > 0}
              />
            </Grid>
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
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
