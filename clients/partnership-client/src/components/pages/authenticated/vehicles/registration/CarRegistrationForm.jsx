import { Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import React from 'react';
import HorizontalLabelInput from '../../../../commons/HorizontalLabelInput';

const carFields = [
  {
    label: 'Vehicle model',
    inputName: 'name',
    type: 'text',
  },
  {
    label: 'Luggage payload',
    inputName: 'luggagePayload',
    type: 'number',
  },
  {
    label: 'Guest quantity',
    inputName: 'guestQuantity',
    type: 'number',
  },
  {
    label: 'Standard price per km',
    inputName: 'standardPricePerKm',
    type: 'number',
  },
];

export default function CarRegistrationForm({
  errors,
  loading,
  register,
  onSubmit,
  dialogOpen,
}) {
  return (
    <Dialog open={dialogOpen} fullWidth={true} maxWidth='md'>
      <DialogTitle>Register your company's vehicle</DialogTitle>
      <form onSubmit={onSubmit} noValidate>
        <DialogContent>
          <Grid container direction='column' style={{ gap: 15 }}>
            {carFields.map((field, index) => (
              <Grid item key={index}>
                <HorizontalLabelInput
                  label={field.label}
                  inputName={field.inputName}
                  type={field.type}
                  register={register}
                  error={errors[field.inputName]?.message.length > 0}
                  helperText={errors[field.inputName]?.message}
                  loading={loading}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
}
