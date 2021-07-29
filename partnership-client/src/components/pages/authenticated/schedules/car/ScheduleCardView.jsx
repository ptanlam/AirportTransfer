import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import React from 'react';

export default function ScheduleCardView({
  schedule,
  loading,
  handleOpenDialog,
}) {
  const isCancellable =
    new Date().setHours(0, 0, 0, 0) <
    new Date(schedule.date).setHours(0, 0, 0, 0);

  return (
    <Paper style={{ padding: '3 20' }}>
      <Grid container direction='column' alignItems='center'>
        <Grid item>
          <Timeline align='alternate'>
            {schedule.details.map((journey, index) => (
              <TimelineItem key={journey.id}>
                <TimelineOppositeContent>
                  <Typography variant='caption'>
                    {index === 0 ? schedule.startTime : schedule.endTime}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  {index < schedule.details.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant='subtitle2'>
                    {journey.description}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Grid>

        <Grid container item justify='flex-end' spacing={1}>
          <Grid item>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                color='secondary'
                disabled={!isCancellable}
                onClick={() => handleOpenDialog(schedule.id)}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
