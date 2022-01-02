import { Container } from '@material-ui/core';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import RemoveIcon from '@material-ui/icons/Remove';
import React from 'react';
import HorizontalLabelDateTimePicker from '../../../../commons/HorizontalLabelDateTimePicker';
import HorizontalPlaceInput from '../../../../commons/HorizontalPlaceInput';

const fields = [
  {
    label: 'Departure airport',
    inputName: 'departureAirport',
  },
  {
    label: 'Arrival airport',
    inputName: 'arrivalAirport',
  },
];

export default function ScheduleRegistrationForm({
  errors,
  control,
  loading,
  register,
  onSubmit,
  dialogOpen,
  closeDialog,
  selectedDate,
  numberOfStations,
  increaseNumberOfStations,
  decreaseNumberOfStations,
}) {
  return (
    <Dialog open={dialogOpen} maxWidth='lg' fullWidth>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container direction='column' style={{ gap: 25 }}>
            {[...Array(numberOfStations)].map((_, index) => {
              const journey = `journeys[${index}]`;

              return (
                <Container key={journey}>
                  <Grid container item direction='column' style={{ gap: 20 }}>
                    <Grid
                      container
                      item
                      justify='center'
                      alignItems='center'
                      direction='column'>
                      <Typography
                        variant='h4'
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          padding: '5px 25px',
                          background: 'rgb(29, 128, 195)',
                          borderRadius: '5px',
                        }}>
                        Transit {index + 1}
                      </Typography>
                    </Grid>

                    <Grid container item justify='center' alignItems='center'>
                      <FlightLandIcon />
                    </Grid>

                    <Grid container item direction='column' style={{ gap: 15 }}>
                      {fields.map((field, stationIndex) => {
                        const station = `stations[${stationIndex}]`;
                        return (
                          <Grid item key={`${station}.${field.inputName}`}>
                            <HorizontalPlaceInput
                              errors={errors}
                              loading={loading}
                              control={control}
                              label={field.label}
                              register={register}
                              orderNumber={stationIndex}
                              inputName={`${journey}.${station}`}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>

                    <Grid item>
                      <HorizontalLabelDateTimePicker
                        control={control}
                        orderNumber={index}
                        label='Departure at'
                        selectedDate={selectedDate}
                        inputName={`${journey}.departureAt`}
                      />
                    </Grid>
                    <Grid item>
                      <HorizontalLabelDateTimePicker
                        control={control}
                        label='Arrival at'
                        orderNumber={index}
                        selectedDate={selectedDate}
                        inputName={`${journey}.arrivalAt`}
                      />
                    </Grid>
                  </Grid>
                </Container>
              );
            })}
          </Grid>

          <Grid item container justify='center'>
            <Grid item>
              <IconButton disabled={loading} onClick={increaseNumberOfStations}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton disabled={loading} onClick={decreaseNumberOfStations}>
                <RemoveIcon />
              </IconButton>
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
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
