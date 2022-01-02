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
  helperText,
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
          fullWidth
          type={type}
          size='small'
          error={error}
          name={inputName}
          variant='outlined'
          disabled={loading}
          inputRef={register}
          helperText={helperText}
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
  loading: PropTypes.bool,
};
