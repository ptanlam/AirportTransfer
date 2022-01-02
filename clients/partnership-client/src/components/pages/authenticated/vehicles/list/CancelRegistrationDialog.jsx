import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';

export default function CancelRegistrationDialog({
  loading,
  onClose,
  onConfirm,
  dialogOpen,
}) {
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        <Typography>Do you really want to unregister this vehicle?</Typography>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Back
        </Button>
        <Button
          disabled={loading}
          onClick={onConfirm}
          color='secondary'
          variant='contained'>
          {loading ? 'Cancelling...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
