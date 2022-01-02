/* eslint-disable no-use-before-define */
import React from 'react';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import VerticalPlaceInput from '../../../../commons/VerticalPlaceInput';
import VerticalDatePicker from '../../../../commons/VerticalDatePicker';
import { Search } from '@material-ui/icons';
import traCuu from '../../../../../assets/images/tra-cuu.png';

const useStyles = makeStyles({
  form: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
  },
  padding: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  block: {
    backgroundColor: 'rgba( 255, 255, 255, 0.75 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.45 )',
    backdropFilter: 'blur( 2.0px )',
    borderRadius: 10,
    border: '1px solid rgba( 255, 255, 255, 0.18 )',
  },
});

const typeOfSeat = [
  {
    value: 'Economy Class',
    label: 'Phổ thông',
  },
  {
    value: 'Business Class',
    label: 'Thương gia',
  },
  {
    value: 'First Class',
    label: 'Hạng nhất',
  },
];

export default function FlightTableSearch({
  register,
  errors,
  control,
  onSubmit,
  handleChangeValueOfSeatType,
  handleChangeChecked,
  checked,
}) {
  const classes = useStyles();
  return (
    <Container>
      <Box component='img' src={traCuu} width='100%' />
      <form className={classes.form} onSubmit={onSubmit}>
        <Box className={classnames(classes.block, classes.padding)}>
          <Grid container spacing={3}>
            <Grid item container xs={6}>
              <VerticalPlaceInput
                name='departure'
                label='Điểm khởi hành'
                control={control}
              />
            </Grid>
            <Grid item container xs={6}>
              <VerticalPlaceInput
                name='destination'
                label='Điểm đến'
                control={control}
              />
            </Grid>
            <Grid item container xs={12} spacing={2}>
              <Grid item container xs={6} direction='column' spacing={1}>
                <Grid item>
                  <Typography variant='subtitle2'>Hạng ghế</Typography>
                </Grid>
                <Grid item>
                  <Autocomplete
                    id='combo-box-demo'
                    options={typeOfSeat}
                    fullWidth
                    getOptionLabel={(option) => option.label}
                    onChange={(event, value) =>
                      handleChangeValueOfSeatType(value.value)
                    }
                    renderInput={(params, option) => (
                      <Controller
                        defaultValue={{}}
                        as={
                          <TextField
                            {...params}
                            name='seatType'
                            fullWidth
                            variant='outlined'
                            inputRef={register}
                            error={errors.message}
                            helperText={errors.seatType?.message}
                            inputProps={{
                              ...params.inputProps,
                              style: { paddingLeft: 10 },
                            }}
                          />
                        }
                        name='seatType'
                        rules={{
                          required: 'Thông tin chưa được điền',
                        }}
                        control={control}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container xs>
                <VerticalDatePicker
                  label='Ngày đi'
                  name='date'
                  register={register}
                  errors={errors.message}
                />
              </Grid>
              <Grid item container xs>
                <Checkbox
                  checked={checked}
                  onChange={handleChangeChecked}
                  style={{ height: 20 }}
                />
                <Typography variant='subtitle2'>Khứ hồi</Typography>
                {checked ? (
                  <VerticalDatePicker
                    label=''
                    name='return'
                    register={register}
                    errors={errors.message}
                  />
                ) : null}
              </Grid>
            </Grid>

            <Grid item container justify='flex-end'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                startIcon={<Search />}>
                Tìm chuyến bay
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}
