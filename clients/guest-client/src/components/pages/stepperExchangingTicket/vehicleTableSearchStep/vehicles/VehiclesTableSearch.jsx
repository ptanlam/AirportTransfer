import '@date-io/date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import VerticalPlaceInput from '../../../../commons/VerticalPlaceInput';
import VerticalDatePicker from '../../../../commons/VerticalDatePicker';
import VerticalTimePicker from '../../../../commons/VerticalTimePicker';
import traCuu from '../../../../../assets/images/tra-cuu.png';

const useStyles = makeStyles({
  padding: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  block: {
    background: 'rgba( 255, 255, 255, 0.75 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.45 )',
    backdropFilter: 'blur( 2.0px )',
    borderRadius: 10,
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
  },
});

export default function VehiclesTableSearch({
  register,
  errors,
  control,
  onSubmit,
}) {
  const classes = useStyles();

  return (
    <Container>
      <Box component='img' src={traCuu} width='100%' />
      <form onSubmit={onSubmit}>
        <Box
          component='div'
          className={classnames(classes.block, classes.padding)}
        >
          <Grid container spacing={3}>
            {/* Searching */}
            <Grid item container spacing={2}>
              <Grid item container xs={4}>
                {/* Google Map place */}
                <VerticalPlaceInput
                  label='Điểm đi'
                  name='departure'
                  control={control}
                />
              </Grid>
              <Grid item container xs={4}>
                {/* Google Map place */}
                <VerticalPlaceInput
                  label='Điểm đến'
                  name='destination'
                  control={control}
                />
              </Grid>
              {/* Date picker */}
              <Grid item xs={2} container>
                <VerticalDatePicker
                  label='Ngày đón'
                  name='date'
                  register={register}
                  errors={errors.message}
                />
              </Grid>
              <Grid item xs={2} container>
                <VerticalTimePicker
                  label='Giờ đón'
                  name='time'
                  register={register}
                  errors={errors.message}
                />
              </Grid>
            </Grid>
            {/* Button Search */}
            <Grid item container justify='flex-end'>
              <Grid item>
                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                  color='secondary'
                  startIcon={<SearchIcon />}
                >
                  <Typography variant='body2' className={classes.color}>
                    Tìm kiếm
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}
