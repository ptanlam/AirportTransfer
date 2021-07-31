import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '@date-io/date-fns';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

export default function VerticalTimePicker({ label, register, errors }) {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Typography variant='subtitle2'>{label}</Typography>
      </Grid>
      <Grid item>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
          <KeyboardTimePicker
            autoOk
            name='time'
            variant='dialog'
            ampm={false}
            value={date}
            onChange={handleDateChange}
            inputRef={register}
            onError={errors}
            minDateMessage
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
}
