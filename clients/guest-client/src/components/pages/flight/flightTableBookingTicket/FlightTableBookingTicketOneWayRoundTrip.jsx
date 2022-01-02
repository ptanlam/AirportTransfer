/* eslint-disable no-use-before-define */
import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Popover from '@material-ui/core/Popover';
import Checkbox from '@material-ui/core/Checkbox';
import ToggleClick from '../../../commons/ToggleClick';
import VerticalPlaceInput from '../../../commons/VerticalPlaceInput';
import VerticalDatePicker from '../../../commons/VerticalDatePicker';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles({
  form: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
  },
  block: {
    background: 'rgba( 255, 255, 255, 0.75 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.45 )',
    backdropFilter: 'blur( 2.0px )',
    borderRadius: 10,
    margin: '40px 0px',
    padding: '0px 30px',
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

export default function FlightTableBookingTicketOneWayRoundTrip({
  checked,
  handleChangeChecked,
  id,
  open,
  anchorEl,
  handleOpenAnchorEl,
  handleCloseAnchorEl,
  register,
  errors,
  control,
  onSubmit,
  valueOfSeatType,
  handleChangeValueOfSeatType,
  numberOfGuests,
  handleIncreaseNumberOfGuests,
  handleDecreaseNumberOfGuests,
}) {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.block}>
      <form className={classes.form} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item container alignItems='flex-start' xs={6} spacing={1}>
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
            <Grid item container xs={6}>
              <VerticalDatePicker
                label='Ngày đi'
                name='date'
                register={register}
                errors={errors.message}
              />
            </Grid>
            <Grid item container xs={6}>
              <Checkbox
                checked={checked}
                onChange={handleChangeChecked}
                style={{ height: 20 }}
              />
              <Typography variant='subtitle2'>Khứ hồi</Typography>
              {checked ? (
                <VerticalDatePicker
                  name='return'
                  register={register}
                  errors={errors.message}
                />
              ) : null}
            </Grid>
          </Grid>
          <Grid item container xs={6} spacing={1}>
            <Grid item container direction='column' spacing={1}>
              <Grid item>
                <Typography variant='subtitle2'>Số lượng hành khách</Typography>
              </Grid>
              <Grid item container>
                <Button
                  aria-describedby={id}
                  variant='outlined'
                  fullWidth
                  onClick={handleOpenAnchorEl}
                  style={{ height: 55 }}>
                  <Typography>
                    {numberOfGuests[0]} người lớn, {numberOfGuests[1]} trẻ em,{' '}
                    {numberOfGuests[2]} em bé
                  </Typography>
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleCloseAnchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}>
                  <ToggleClick
                    label='Người lớn'
                    sublabel='Từ 12 tuổi'
                    number={numberOfGuests[0]}
                    handleClickIncrease={() =>
                      handleIncreaseNumberOfGuests('adults')
                    }
                    handleClickDecrease={() =>
                      handleDecreaseNumberOfGuests('adults')
                    }
                  />
                  <ToggleClick
                    label='Trẻ em'
                    sublabel='Từ 2-11 tuổi'
                    number={numberOfGuests[1]}
                    handleClickIncrease={() =>
                      handleIncreaseNumberOfGuests('children')
                    }
                    handleClickDecrease={() =>
                      handleDecreaseNumberOfGuests('children')
                    }
                  />
                  <ToggleClick
                    label='Em bé'
                    sublabel='Dưới 2 tuổi'
                    number={numberOfGuests[2]}
                    handleClickIncrease={() =>
                      handleIncreaseNumberOfGuests('babies')
                    }
                    handleClickDecrease={() =>
                      handleDecreaseNumberOfGuests('babies')
                    }
                  />
                </Popover>
              </Grid>
            </Grid>
            <Grid item container direction='column' spacing={1}>
              <Grid item>
                <Typography variant='subtitle2'>Hạng ghế</Typography>
              </Grid>
              <Grid item>
                <Autocomplete
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
      </form>
    </Box>
  );
}
