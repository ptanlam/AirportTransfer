import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';

export default function ClassEditForm({
  errors,
  loading,
  onClose,
  register,
  onSubmit,
  dialogOpen,
  editClassName,
}) {
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Edit vehicle class</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Grid container direction='column'>
            <Grid container item direction='column' style={{ gap: 10 }}>
              <Grid item>
                <Typography variant='body2' style={{ fontWeight: 'bold' }}>
                  Name
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  name='name'
                  size='small'
                  disabled={loading}
                  variant='outlined'
                  inputRef={register}
                  defaultValue={editClassName}
                  helperText={errors.name?.message}
                  error={errors.name?.message.length > 0}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={onClose}>
            Back
          </Button>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            disabled={loading}>
            {loading ? 'Editing...' : 'Edit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
