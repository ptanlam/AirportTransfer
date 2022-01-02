import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import React from 'react';
import HorizontalLabelAutocompleteInput from '../../../commons/HorizontalLabelAutocompleteInput';
import HorizontalLabelInput from '../../../commons/HorizontalLabelInput';
import HorizontalLabelTimePicker from '../../../commons/HorizontalLabelTimePicker';

export default function PoliciesRegistrationForm({
  errors,
  loading,
  classes,
  onClose,
  register,
  onSubmit,
  dialogOpen,
  chosenPolicyType,
}) {
  return (
    <Dialog open={dialogOpen} maxWidth='sm' fullWidth>
      <DialogTitle>Add {chosenPolicyType} policies</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container direction='column' style={{ gap: 20 }}>
            <Grid item>
              <HorizontalLabelTimePicker
                loading={loading}
                label='Perform before'
                register={register}
                inputName='condition'
                helperText={errors?.condition?.message}
                error={errors?.condition?.message.length > 0}
              />
            </Grid>
            <Grid item>
              <HorizontalLabelInput
                label='Lost percentage'
                loading={loading}
                register={register}
                inputName='lostPercentage'
                helperText={errors?.lostPercentage?.message}
                error={errors?.lostPercentage?.message.length > 0}
              />
            </Grid>
            <Grid item>
              <HorizontalLabelAutocompleteInput
                label='Class'
                loading={loading}
                register={register}
                inputName='vehicleClass'
                selections={classes}
                helperText={errors?.vehicleClass?.message}
                error={errors?.vehicleClass?.message.length > 0}
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
