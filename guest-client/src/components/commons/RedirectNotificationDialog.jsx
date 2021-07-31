import { DialogActions, DialogContent } from '@material-ui/core';
import { Typography, Button } from '@material-ui/core';
import { Dialog, DialogTitle } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function RedirectNotificationDialog({ notification, redirect }) {
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
    history.push(redirect);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent>
        <Typography>{notification}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='secondary' onClick={onClose}>
          Trở về
        </Button>
      </DialogActions>
    </Dialog>
  );
}
