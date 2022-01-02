import React from 'react';
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import '@date-io/date-fns';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import TableReport from '../../../commons/TableReport';

const useStyles = makeStyles({
  box: {
    overflow: 'hidden',
    height: '86vh',
    paddingTop: 100,
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
  },
});

export default function Reports({
  loading,
  headers,
  reports,
  chosenMonth,
  chosenYear,
  handleChosenYear,
  handleChosenMonth,
}) {
  const classes = useStyles();

  return (
    <Box component='div' className={classes.box}>
      <Container>
        <Grid container direction='column' spacing={3}>
          <Grid item container>
            <Grid item xs={4} container alignItems='center'>
              <Typography variant='h6'>
                The company's revenue and profit of
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
                <KeyboardDatePicker
                  autoOk={true}
                  views={['month']}
                  format='MM'
                  disableToolbar
                  variant='inline'
                  value={chosenMonth}
                  onChange={handleChosenMonth}
                  label='Month'
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
                <KeyboardDatePicker
                  autoOk={true}
                  views={['year']}
                  disableToolbar
                  variant='inline'
                  format='yyyy'
                  disableFuture
                  disablePast
                  id='date-picker-inline'
                  label='Year'
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
              <TableReport reports={reports} headers={headers} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
