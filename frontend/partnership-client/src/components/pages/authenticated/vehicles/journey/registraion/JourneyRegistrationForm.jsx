import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Remove';
import React from 'react';
import HorizontalPlaceInput from '../../../../../commons/HorizontalPlaceInput';

export default function JourneyRegistrationForm({
  errors,
  loading,
  control,
  onSubmit,
  dialogOpen,
  closeDialog,
  numberOfStations,
  increaseNumberOfStations,
  decreaseNumberOfStations,
}) {
  return (
    <Dialog open={dialogOpen} maxWidth='md' fullWidth={true}>
      <DialogTitle>Add your vehicle's journey</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container direction='column' spacing={1}>
            {[...Array(numberOfStations)].map((_, index) => {
              const station = `stations[${index}]`;

              return (
                <Grid item key={index}>
                  <HorizontalPlaceInput
                    label={`Station ${index + 1}`}
                    inputName={station}
                    errors={errors}
                    loading={loading}
                    control={control}
                    orderNumber={index + 1}
                  />
                </Grid>
              );
            })}
            <Grid item container justify='center'>
              <Grid item>
                <IconButton
                  disabled={loading}
                  onClick={increaseNumberOfStations}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  disabled={loading}
                  onClick={decreaseNumberOfStations}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
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
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
