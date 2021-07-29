import DateFnsUtils from '@date-io/date-fns';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

export default function Reports({
  loading,
  reports,
  chosenYear,
  handleChosenYearChange,
}) {
  const ticketsData = {
    labels: reports.map((report) => report.month),
    datasets: [
      {
        label: 'Number of sold tickets',
        data: reports.map((report) => report.numberOfSoldTickets),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Number of cancelled tickets',
        data: reports.map((report) => report.numberOfCancelledTickets),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const salesData = {
    labels: reports.map((report) => report.month),
    datasets: [
      {
        label: 'Ticket sale',
        data: reports.map((report) => report.monthSale),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Cancellation profit',
        data: reports.map((report) => report.cancellationProfit),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Cancellation lost',
        data: reports.map((report) => report.cancellationLost),
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  return (
    <Box
      position='absolute'
      top={0}
      width='100%'
      minHeight='100vh'
      bgcolor='#1D80C3'>
      <Container maxWidth='lg' style={{ paddingTop: 110, marginBottom: 30 }}>
        <Grid container justify='center' style={{ gap: 20 }}>
          <Grid item>
            <Paper style={{ padding: '5 20' }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  views={['year']}
                  disableToolbar
                  variant='inline'
                  format='yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='Choose year'
                  value={chosenYear}
                  onChange={handleChosenYearChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Paper>
          </Grid>
          {loading ? (
            <Grid container item justify='center' xs={12}>
              <CircularProgress style={{ color: 'white' }} />
            </Grid>
          ) : (
            <Grid container item direciton='column' style={{ gap: 15 }} xs={12}>
              <Grid container item direction='column'>
                <Paper style={{ padding: '5 20' }}>
                  <Grid item>
                    <Typography variant='h4' align='center'>
                      Tickets report
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Bar data={ticketsData} />
                  </Grid>
                </Paper>
              </Grid>
              <Grid container item direction='column'>
                <Paper style={{ padding: '5 20' }}>
                  <Grid item>
                    <Typography variant='h4' align='center'>
                      Sales report
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Line data={salesData} />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
