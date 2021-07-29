import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '@date-io/date-fns';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function HorizontalLabelDatePicker({
  label,
  error,
  loading,
  register,
  inputName,
}) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <Grid container alignItems='center' spacing={1}>
      <Grid item xs={3}>
        <Typography variant='subtitle2'>{label}</Typography>
      </Grid>
      <Grid item xs={9}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
          <KeyboardDatePicker
            autoOk
            fullWidth
            ampm={false}
            disablePast
            value={date}
            onError={error}
            name={inputName}
            variant='dialog'
            disabled={loading}
            format='yyyy-MM-dd'
            inputRef={register}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
}
