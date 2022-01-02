import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { Controller } from 'react-hook-form';
import VerticalLabelTimePicker from '../../../commons/VerticalLabelTimePicker';

export default function PolicyEditForm({
  errors,
  onClose,
  loading,
  control,
  classes,
  register,
  onSubmit,
  dialogOpen,
  editPolicy,
}) {
  return (
    <Dialog open={dialogOpen} maxWidth='sm' fullWidth>
      <DialogTitle>Edit policy</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container direction='column' style={{ gap: 10 }}>
            <Grid container item direction='column' style={{ gap: 5 }}>
              <Grid item>
                <Typography variant='body2' style={{ fontWeight: 'bold' }}>
                  Lost percentage
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  size='small'
                  type='number'
                  variant='outlined'
                  disabled={loading}
                  inputRef={register}
                  name='lostPercentage'
                  defaultValue={editPolicy.lostPercentage}
                  helperText={errors.lostPercentage?.message}
                  error={errors.lostPercentage?.message.length > 0}
                />
              </Grid>
            </Grid>

            <Grid item>
              <VerticalLabelTimePicker
                loading={loading}
                register={register}
                inputName='condition'
                label='Perform before'
                defaultValue={editPolicy.condition}
                helperText={errors?.condition?.message}
                error={errors?.condition?.message.length > 0}
              />
            </Grid>

            <Grid container item direction='column' style={{ gap: 5 }}>
              <Grid item>
                <Typography variant='body2' style={{ fontWeight: 'bold' }}>
                  Class
                </Typography>
              </Grid>
              <Grid item>
                <Controller
                  name='vehicleClass'
                  control={control}
                  defaultValue={() => {
                    const classIndex = classes.findIndex(
                      (eachClass) => eachClass.id === editPolicy.classId,
                    );
                    return classes[classIndex];
                  }}
                  render={({ onChange, ...props }) => (
                    <Autocomplete
                      fullWidth
                      {...props}
                      options={classes}
                      disabled={loading}
                      filterSelectedOptions
                      getOptionSelected={(option, value) => {
                        return option.id === value.id;
                      }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          size='small'
                          variant='outlined'
                          helperText={errors.vehicleClass?.message}
                          error={errors.vehicleClass?.message.length > 0}
                        />
                      )}
                      onChange={(e, data) => onChange(data)}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={onClose}>
            Back
          </Button>
          <Button
            type='submit'
            disabled={loading}
            color='primary'
            variant='contained'>
            {loading ? 'Editing...' : 'Edit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
