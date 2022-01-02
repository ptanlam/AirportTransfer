import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

export default function VerticalLabelInput({
  loading,
  label,
  inputName,
  type,
  register,
  error,
  helperText,
  maxLength,
  minLength,
}) {
  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        <Typography variant='body2' style={{ fontWeight: 'bold' }}>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          name={inputName}
          variant='outlined'
          size='small'
          type={type}
          inputRef={register}
          error={error}
          helperText={helperText}
          inputProps={{ minLength: minLength, maxLength: maxLength }}
          fullWidth
          disabled={loading ? true : false}
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
