import { Grid, Typography } from '@material-ui/core';
import React from 'react';

export default function HorizontalLabelFileInput({
  label,
  register,
  inputName,
  flightId,
}) {
  return (
    <Grid container alignItems='center'>
      <Grid item xs={3}>
        <Typography variant='subtitle2'>{label}</Typography>
      </Grid>
      <Grid container item xs={9} style={{ gap: 10 }} direction='column'>
        <Grid item>
          <input
            id={flightId}
            type='file'
            name={inputName}
            ref={register}
            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
