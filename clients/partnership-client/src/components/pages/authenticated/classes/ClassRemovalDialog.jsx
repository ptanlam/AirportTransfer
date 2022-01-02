import { Button, DialogTitle, Typography } from '@material-ui/core';
import { DialogActions, DialogContent } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import React from 'react';

export default function ClassRemovalDialog({
  loading,
  onClose,
  dialogOpen,
  onDeleteClass,
  removalClassId,
}) {
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        <Typography>Do you really want to remove this class?</Typography>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Back
        </Button>
        <Button
          disabled={loading}
          color='secondary'
          onClick={() => onDeleteClass(removalClassId)}>
          {loading ? 'Removing...' : 'Remove'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
