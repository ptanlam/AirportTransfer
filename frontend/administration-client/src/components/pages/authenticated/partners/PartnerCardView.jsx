import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
  box: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    background:
      'linear-gradient(72.05deg, #2492FF -10.71%, rgba(45, 54, 252, 0.76) 36.95%, rgba(86, 93, 255, 0.87) 49.03%, #FFFFFF 50.78%, #FFFFFF 115.88%)',
    padding: 20,
    marginBottom: 10,
    color: 'white',
    boxShadow: '5px 5px 20px #888888',
  },
  logo: {
    position: 'absolute',
    top: 0,
    right: 10,
    height: '100%',
    borderRadius: 10,
  },
});

export default function Partners({
  loading,
  name,
  email,
  hotline,
  partnerId,
  logoUrl,
  dialog,
  handleOpenDialog,
  handleCloseDialog,
  handleClickActivate,
}) {
  const classes = useStyles();

  return (
    <Grid item container className={classes.box}>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Typography variant='h5' style={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant='caption'>{email}</Typography>
          <Typography>Hotline : {hotline}</Typography>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => handleOpenDialog()}
          >
            Activate
          </Button>
        </Grid>
      </Grid>
      <Box component='img' src={logoUrl} className={classes.logo} />

      <Dialog open={dialog} onClose={handleCloseDialog}>
        <DialogTitle>Want to activate this partner ?</DialogTitle>
        <DialogActions>
          <Button disabled={loading} onClick={handleCloseDialog}>
            Back
          </Button>
          <Button
            disabled={loading ? true : false}
            variant='contained'
            color='secondary'
            onClick={() => {
              handleClickActivate(partnerId);
            }}
          >
            {loading ? 'In Process' : 'Agree'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
