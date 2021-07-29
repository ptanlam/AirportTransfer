import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import getJourneyFromStations from '../../../../../../utils/getJourneyFromStations';

export default function JourneyDetails({
  loading,
  journeys,
  dialogOpen,
  closeDialog,
  manipulating,
  onJourneyClick,
}) {
  const getColor = (isActive) => {
    return isActive ? 'textPrimary' : 'textSecondary';
  };

  return (
    <Dialog open={dialogOpen} maxWidth='md' fullWidth>
      <DialogTitle>Vehicle's journeys</DialogTitle>
      <DialogContent>
        <Grid container style={{ gap: 15 }} direction='column'>
          {loading ? (
            <Grid item container justify='center'>
              <CircularProgress />
            </Grid>
          ) : journeys.length === 0 ? (
            <Typography>
              Please add journey for this vehicle in order to be shown on our
              website for guests!
            </Typography>
          ) : (
            journeys.map((journey) => (
              <Grid
                container
                item
                key={journey.id}
                direction='column'
                style={{ gap: 10 }}>
                <Grid container item spacing={1}>
                  <Grid item xs={12} md={10}>
                    <Typography variant='h6' color={getColor(journey.isActive)}>
                      {journey.id}
                    </Typography>
                  </Grid>
                  <Grid container item justify='flex-end' xs={12} md={2}>
                    <Tooltip
                      disableFocusListener
                      title={
                        <Typography
                          align='center'
                          variant='subtitle2'
                          style={{ fontWeight: 'bold' }}>
                          {journey.stillHasSchedule
                            ? 'Cannot deactivate this journey due to it ' +
                              'still has schedule!'
                            : 'Deactivate this schedule'}
                        </Typography>
                      }>
                      <span>
                        <Button
                          variant='outlined'
                          disabled={journey.stillHasSchedule || manipulating}
                          onClick={() =>
                            onJourneyClick(journey.id, journey.isActive)
                          }>
                          {journey.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </span>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={12} md={3}>
                    <Typography color={getColor(journey.isActive)}>
                      Created at:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography color={getColor(journey.isActive)}>
                      {new Date(journey.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={12} md={3}>
                    <Typography color={getColor(journey.isActive)}>
                      Estimated time:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography color={getColor(journey.isActive)}>
                      {journey.travelTime}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs={12} md={3}>
                    <Typography color={getColor(journey.isActive)}>
                      Journey:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Typography color={getColor(journey.isActive)}>
                      {getJourneyFromStations(journey.stations)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ width: 150 }}
          disabled={manipulating}
          onClick={closeDialog}
          variant='contained'
          color='primary'>
          {manipulating ? (
            <CircularProgress style={{ color: 'white' }} />
          ) : (
            'Back'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
