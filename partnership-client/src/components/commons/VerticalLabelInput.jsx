import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

export default function VerticalLabelInput({
  type,
  label,
  error,
  loading,
  register,
  inputName,
  maxLength,
  minLength,
  helperText,
}) {
  return (
    <Grid container direction='column' style={{ gap: 10 }}>
      <Grid item>
        <Typography variant='body2' style={{ fontWeight: 'bold' }}>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          size='small'
          type={type}
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

VerticalLabelInput.defaultProps = {
  type: 'text',
};

VerticalLabelInput.propTypes = {
  label: PropTypes.string,
  inputName: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};
