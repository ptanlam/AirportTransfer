import { Button, DialogTitle, Typography } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import React from 'react';

export default function PolicyRemovalDialog({
  onClose,
  loading,
  dialogOpen,
  onDeletePolicy,
  removalPolicyId,
}) {
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Warning</DialogTitle>
      <DialogContent>
        <Typography>Do you really want to remove this policy?</Typography>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Back
        </Button>
        <Button
          disabled={loading}
          color='secondary'
          onClick={() => onDeletePolicy(removalPolicyId)}>
          {loading ? 'Removing...' : 'Remove'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
