import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import '@date-io/date-fns';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles({
  box: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 60,
  },
});

export default function StatisticsOfUsers({
  loading,
  users,
  chosenYear,
  handleChosenYear,
}) {
  const classes = useStyles();

  const data = {
    labels: users.map((user) => user.month),
    datasets: [
      {
        label: 'Total number of registered users',
        barPercentage: 0.5,
        minBarLength: 4,
        data: users.map((user) => user.numberOfUsers),
        backgroundColor: ['rgb(244,89,122, 0.2)'],
        borderColor: ['rgb(244,89,122, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Box component='div' className={classes.box}>
      <Container>
        <Grid container direction='column' spacing={3}>
          <Grid item container justify='center' spacing={2}>
            <Grid item xs container alignItems='center' justify='flex-end'>
              <Typography variant='h6'>
                Statistics registered users in
              </Typography>
            </Grid>
            <Grid item xs>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
                <KeyboardDatePicker
                  autoOk={true}
                  views={['year']}
                  disableToolbar
                  variant='inline'
                  format='yyyy'
                  margin='normal'
                  disableFuture
                  disablePast
                  id='date-picker-inline'
                  value={chosenYear}
                  onChange={handleChosenYear}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          {loading ? (
            <Grid item container justify='center' xs={12}>
              <CircularProgress style={{ color: 'black' }} />
            </Grid>
          ) : (
            <Grid item>
              <Bar data={data} options={options} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
