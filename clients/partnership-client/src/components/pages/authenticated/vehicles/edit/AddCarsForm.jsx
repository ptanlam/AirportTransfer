import { DialogContent, Grid, IconButton } from '@material-ui/core';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import VerticalLabelInput from '../../../../commons/VerticalLabelInput';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Remove';

export default function AddCarsForm({
  errors,
  loading,
  register,
  onSubmit,
  dialogOpen,
  closeDialog,
  numberOfCars,
  changeNumberOfCars,
}) {
  return (
    <Dialog open={dialogOpen} maxWidth='sm' fullWidth>
      <DialogTitle>Add car</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container item direction='column' style={{ gap: 20 }}>
            {[...Array(numberOfCars)].map((_, index) => {
              const car = `cars[${index}]`;
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
                      Car {index + 1}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <VerticalLabelInput
                      loading={loading}
                      register={register}
                      label='Licence plate (00-A0 0000 or 00-A0 00000)'
                      helperText={
                        errors.cars?.[index]?.licencePlate?.message ||
                        errors.cars?.message
                      }
                      inputName={`${car}.licencePlate`}
                      error={
                        errors.cars?.[index]?.licencePlate?.message?.length >
                          0 || errors.cars?.message?.length > 0
                      }
                    />
                  </Grid>
                  <Grid item>
                    <VerticalLabelInput
                      loading={loading}
                      register={register}
                      label='Color'
                      helperText={errors.cars?.[index]?.color?.message}
                      inputName={`${car}.color`}
                      error={errors.cars?.[index]?.color?.message?.length > 0}
                    />
                  </Grid>
                </Fragment>
              );
            })}
            <Grid container item justify='center'>
              <IconButton onClick={() => changeNumberOfCars('add')}>
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton onClick={() => changeNumberOfCars('subtract')}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={closeDialog}>
            Back
          </Button>
          <Button
            size='large'
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
