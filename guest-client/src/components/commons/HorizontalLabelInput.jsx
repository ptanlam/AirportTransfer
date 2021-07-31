import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

export default function HorizontalLabelInput({
  label,
  inputName,
  type,
  register,
  value,
  error,
  helperText,
  maxLength,
  minLength,
}) {
  return (
    <Grid container alignItems='center' spacing={2}>
      <Grid item xs={3}>
        <Typography variant='subtitle2'>{label}</Typography>
      </Grid>
      <Grid item xs={9}>
        <TextField
          name={inputName}
          variant='outlined'
          size='small'
          type={type}
          value={value}
          inputRef={register}
          error={error}
          helperText={helperText}
          inputProps={{ minLength: minLength, maxLength: maxLength }}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

HorizontalLabelInput.defaultProps = {
  type: 'text',
};

HorizontalLabelInput.propTypes = {
  label: PropTypes.string,
  inputName: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};
