import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
    textAlign: 'center',
  },
});

export default function NoVehicle({ vehicleType }) {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.box}>
      {vehicleType === 'flight' ? (
        <>
          <Box
            component='img'
            src='https://ik.imagekit.io/tvlk/image/imageResource/2016/10/31/1477887699241-8f62d1a17a450584b92f0b0d90eaa65c.png?tr=dpr-2,h-140,q-75,w-240%202x'
            width='50%'
          />
          <Box component='div' style={{ marginTop: 10, marginBottom: 10 }}>
            <Typography variant='h6'>Không có chuyến bay</Typography>
            <Typography variant='body1'>
              Hiện không có phương tiện cho ngày này. Vui lòng chọn ngày khác.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box
            component='img'
            src='https://ik.imagekit.io/tvlk/image/imageResource/2019/05/16/1557986595543-4493323f6806832a954adcb3ae9c4ce1.png?tr=q-75'
            width='50%'
          />
          <Box component='div' style={{ marginTop: 10, marginBottom: 10 }}>
            <Typography variant='h6'>
              Không có phương tiện giao thông
            </Typography>
            <Typography variant='body1'>
              Hiện không có phương tiện giao thông cho ngày này. Vui lòng chọn
              ngày khác.
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
