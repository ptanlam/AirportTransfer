import { Typography } from '@material-ui/core';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

export default function HorizontalLabelAutocompleteInput({
  label,
  error,
  loading,
  register,
  inputName,
  selections,
  helperText,
}) {
  return (
    <Grid container alignItems='center' spacing={2}>
      <Grid item xs={12} md={3}>
        <Typography variant='subtitle2'>{label}</Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <Autocomplete
          fullWidth
          filterSelectedOptions
          options={selections}
          getOptionSelected={(option, value) => {
            return option.id === value.id;
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              size='small'
              error={error}
              name={inputName}
              variant='outlined'
              disabled={loading}
              inputRef={register}
              helperText={helperText}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
