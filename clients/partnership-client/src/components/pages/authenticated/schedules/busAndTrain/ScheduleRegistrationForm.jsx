import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import React from 'react';
import HorizontalLabelInput from '../../../../commons/HorizontalLabelInput';
import HorizontalLabelTimePicker from '../../../../commons/HorizontalLabelTimePicker';

const registrationFields = [
  {
    label: 'Start time',
    inputName: 'startTime',
  },
  {
    label: 'End time',
    inputName: 'endTime',
  },
  {
    label: 'Gap between schedules',
    inputName: 'gap',
  },
];

export default function ScheduleRegistrationForm({
  errors,
  loading,
  register,
  onSubmit,
  dialogOpen,
  closeDialog,
  transportType,
}) {
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Add schedule</DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container direction='column' style={{ gap: 20 }}>
            {registrationFields.map((field, index) => (
              <Grid item key={index}>
                <HorizontalLabelTimePicker
                  loading={loading}
                  label={field.label}
                  register={register}
                  inputName={field.inputName}
                  helperText={errors?.[field.inputName]?.message}
                  error={errors?.[field.inputName]?.message.length > 0}
                />
              </Grid>
            ))}

            {transportType === 'buses' && (
              <Grid item>
                <HorizontalLabelInput
                  type='number'
                  loading={loading}
                  register={register}
                  label='Number of vehicles'
                  inputName='numberOfVehicles'
                  error={errors?.numberOfVehicles?.message.length > 0}
                  helperText={errors?.numberOfVehicles?.message}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog} disabled={loading}>
            Back
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
