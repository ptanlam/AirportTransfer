import DateFnsUtils from '@date-io/date-fns';
import { Grid, Typography } from '@material-ui/core';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function HorizontalLabelDateTimePicker({
  label,
  control,
  inputName,
  orderNumber,
  selectedDate = new Date(),
}) {
  return (
    <Grid container alignItems='center' spacing={2}>
      <Grid item xs={12} md={3}>
        <Typography variant='subtitle2'>{label}</Typography>
      </Grid>

      <Grid item xs={12} md={9}>
        <Controller
          name={inputName}
          control={control}
          defaultValue={new Date(selectedDate)}
          render={({ ref, ...props }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <KeyboardDatePicker
                    fullWidth
                    {...props}
                    ampm={false}
                    inputRef={ref}
                    disableToolbar
                    margin='normal'
                    required={true}
                    variant='inline'
                    format='MM/dd/yyyy'
                    minDate={selectedDate}
                    disabled={
                      orderNumber === 0 && !inputName.includes('arrival')
                    }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <KeyboardTimePicker
                    {...props}
                    fullWidth
                    ampm={false}
                    inputRef={ref}
                    margin='normal'
                    required={true}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          )}
        />
      </Grid>
    </Grid>
  );
}
