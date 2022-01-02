import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

export default function VerticalLabelInputWithDefaultValue({
  type,
  error,
  label,
  loading,
  disabled,
  control,
  inputName,
  helperText,
  defaultValue,
}) {
  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        <Typography variant='body2' style={{ fontWeight: 'bold' }}>
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Controller
          name={inputName}
          control={control}
          defaultValue={defaultValue}
          render={(props) => (
            <TextField
              {...props}
              fullWidth
              type={type}
              size='small'
              error={error}
              variant='outlined'
              helperText={helperText}
              disabled={!!loading || disabled}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

VerticalLabelInputWithDefaultValue.defaultProps = {
  type: 'text',
  defaultValue: '',
  disabled: false,
};

VerticalLabelInputWithDefaultValue.propTypes = {
  error: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
  disabled: PropTypes.bool,
  inputName: PropTypes.string,
  helperText: PropTypes.string,
  defaultValue: PropTypes.string,
};
