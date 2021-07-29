import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import React, { Fragment } from 'react';
import HorizontalLabelAutocompleteInput from '../../../../commons/HorizontalLabelAutocompleteInput';
import HorizontalLabelInput from '../../../../commons/HorizontalLabelInput';
import HorizontalPhotoInput from '../../../../commons/HorizontalPhotoInput';
import HorizontalPlaceInput from '../../../../commons/HorizontalPlaceInput';

const carModelFields = [
  {
    label: 'Vehicle model',
    inputName: 'name',
    type: 'text',
    maxLength: 250,
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

const busFields = [
  {
    label: 'Vehicle model',
    inputName: 'name',
    type: 'text',
    maxLength: 250,
  },
  {
    label: 'Guest quantity',
    inputName: 'guestQuantity',
    type: 'number',
  },
  {
    label: 'Ticket price',
    inputName: 'ticketPrice',
    type: 'number',
  },
];

const trainFields = [
  {
    label: 'Vehicle model',
    inputName: 'name',
    type: 'text',
    maxLength: 250,
  },
  {
    label: 'Ticket price',
    inputName: 'ticketPrice',
    type: 'number',
  },
];

const flightFields = [
  {
    label: 'Plane model',
    inputName: 'name',
    type: 'text',
    maxLength: 250,
  },
  {
    label: 'Guest quantity',
    inputName: 'guestQuantity',
    type: 'number',
  },
];

function getVehicleFields(transportType) {
  switch (transportType) {
    case 'cars':
      return carModelFields;
    case 'buses':
      return busFields;
    case 'trains':
      return trainFields;
    case 'flights':
      return flightFields;
    default:
      return [];
  }
}

export default function VehicleRegistrationForm({
  errors,
  control,
  loading,
  classes,
  register,
  onSubmit,
  photoFile,
  dialogOpen,
  numberOfCars,
  toggleDialog,
  transportType,
  onPhotoChange,
  increaseNumberOfCarsChange,
  decreaseNumberOfCarsChange,
}) {
  return (
    <Dialog open={dialogOpen} fullWidth={true} maxWidth='md'>
      <DialogTitle>Register your company's vehicle</DialogTitle>
      <form onSubmit={onSubmit} noValidate>
        <DialogContent>
          <Grid container direction='column' style={{ gap: 15 }}>
            {getVehicleFields(transportType).map((field, index) => (
              <Grid item key={index}>
                <HorizontalLabelInput
                  loading={loading}
                  type={field.type}
                  register={register}
                  label={field.label}
                  maxLength={field.maxLength}
                  inputName={field.inputName}
                  helperText={errors[field.inputName]?.message}
                  error={errors[field.inputName]?.message.length > 0}
                />
              </Grid>
            ))}

            {transportType !== 'flights' && (
              <Grid item>
                <HorizontalLabelAutocompleteInput
                  inputName='class'
                  loading={loading}
                  register={register}
                  selections={classes}
                  label='Vehicle class'
                  defaultValue={classes[0]}
                  helperText={errors.class?.message}
                  error={errors.class?.message.length > 0}
                />
              </Grid>
            )}

            {transportType === 'cars' && (
              <Grid container item direction='column' style={{ gap: 20 }}>
                <Grid item>
                  <HorizontalPlaceInput
                    control={control}
                    loading={loading}
                    register={register}
                    label='Working place'
                    inputName='workingPlace'
                    transportType={transportType}
                  />
                </Grid>

                {[...Array(numberOfCars)].map((_, carIndex) => {
                  const car = `cars[${carIndex}]`;
                  return (
                    <Fragment key={car}>
                      <Grid container item justify='center'>
                        <Typography
                          variant='subtitle1'
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '5 30',
                            background: 'rgb(29, 128, 195)',
                            borderRadius: 5,
                          }}>
                          Car {carIndex + 1}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <HorizontalLabelInput
                          loading={loading}
                          register={register}
                          label='Licence plate (00-A0 0000 or 00-A0 00000)'
                          helperText={
                            errors.cars?.[carIndex]?.licencePlate?.message ||
                            errors.cars?.message
                          }
                          inputName={`${car}.licencePlate`}
                          error={
                            errors.cars?.[carIndex]?.licencePlate?.message
                              ?.length > 0 || errors.cars?.message?.length > 0
                          }
                        />
                      </Grid>
                      <Grid item>
                        <HorizontalLabelInput
                          loading={loading}
                          register={register}
                          label='Color'
                          helperText={errors.cars?.[carIndex]?.color?.message}
                          inputName={`${car}.color`}
                          error={
                            errors.cars?.[carIndex]?.color?.message?.length > 0
                          }
                        />
                      </Grid>
                    </Fragment>
                  );
                })}

                <Grid container item justify='center'>
                  <IconButton onClick={increaseNumberOfCarsChange}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <IconButton onClick={decreaseNumberOfCarsChange}>
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            )}

            <Grid item>
              <HorizontalPhotoInput
                register={register}
                photoFile={photoFile}
                onPhotoChange={onPhotoChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button size='large' onClick={toggleDialog} disabled={loading}>
            Back
          </Button>
          <Button
            size='large'
            type='submit'
            variant='contained'
            color='primary'
            disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
