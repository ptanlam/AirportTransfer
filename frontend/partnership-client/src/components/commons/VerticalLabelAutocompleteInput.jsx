import { Grid, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

export default function VerticalLabelAutocompleteInput({
  label,
  error,
  loading,
  register,
  inputName,
  selections,
  helperText,
  defaultValue,
}) {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='caption' style={{ fontWeight: 'bold' }}>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Autocomplete
          fullWidth
          filterSelectedOptions
          defaultValue={defaultValue}
          disabled={loading}
          options={selections}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              size='small'
              error={error}
              name={inputName}
              variant='outlined'
              inputRef={register}
              helperText={helperText}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
