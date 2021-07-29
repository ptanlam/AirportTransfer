import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

export default function HorizontalLabelInput({
  label,
  inputName,
  type,
  register,
  error,
  helperText,
  maxLength,
  minLength,
  loading,
}) {
  return (
    <Grid container alignItems='center' spacing={2}>
      <Grid item xs={12} md={3}>
        <Typography variant='subtitle2'>{label}</Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <TextField
          fullWidth
          type={type}
          size='small'
          error={error}
          name={inputName}
          variant='outlined'
          disabled={loading}
          inputRef={register}
          helperText={helperText}
          inputProps={{ minLength: minLength, maxLength: maxLength }}
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
