import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
  circle: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    backgroundColor: '#1ba0e2',
    borderRadius: '100%',
    border: '5px solid #ffc412',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});

export default function AirportTransferTransportationFeature(props) {
  const classes = useStyles();
  const { feature } = props;
  switch (feature) {
    case 'car':
      return (
        <Grid item xs={12} container>
          <Grid item xs={1}>
            <Box component='div' style={{ height: 130 }}>
              <Box component='div' className={classes.circle}>
                <img
                  src='https://ik.imagekit.io/tvlk/image/imageResource/2018/04/03/1522766064202-b8b3793ad92b75f10bc14588fc698697.png?tr=q-75'
                  alt='Xe ô tô'
                  style={{ width: 100, height: 100 }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={11}
            direction='row'
            justify='flex-start'
            alignContent='center'
            container
          >
            <Grid
              item
              xs={12}
              container
              style={{
                backgroundColor: '#1ba0e2',
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
              }}
            >
              <Grid item xs></Grid>
              <Grid item xs={4}>
                <Box component='div' className={classes.flex}>
                  <CheckIcon />
                  <Typography>Sẵn sàng phục vụ 24 giờ</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box component='div' className={classes.flex}>
                  <CheckIcon />
                  <Typography>Điểm đón tiện lợi</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box component='div' className={classes.flex}>
                  <CheckIcon />
                  <Typography>Giá đã bao gồm các loại phí</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    case 'bus':
      return (
        <Grid item xs={12} container>
          <Grid item xs={1}>
            <Box component='div' style={{ height: 130 }}>
              <Box component='div' className={classes.circle}>
                <img
                  src='https://ik.imagekit.io/tvlk/image/imageResource/2018/04/03/1522766071210-7a7e8aaea2d74a7d7437696869d6eb4f.png?tr=q-75'
                  alt='Xe bus'
                  style={{ width: 100, height: 100 }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={11}
            direction='row'
            justify='flex-start'
            alignContent='center'
            container
          >
            <Grid
              item
              xs={12}
              container
              style={{
                backgroundColor: '#1ba0e2',
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
              }}
            >
              <Grid item xs></Grid>
              <Grid item xs={4}>
                <Box component='div' className={classes.flex}>
                  <CheckIcon />
                  <Typography>Giá tiết kiệm</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box component='div' className={classes.flex}>
                  <CheckIcon />
                  <Typography>Tuyến đường hợp lý</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box component='div' className={classes.flex}>
                  <CheckIcon />
                  <Typography>Điểm dừng linh hoạt</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    case 'train':
      return (
        <Grid item xs={12} container>
          <Grid item xs={1}>
            <Box component='div' style={{ height: 130 }}>
              <Box component='div' className={classes.circle}>
                <img
                  src='https://ik.imagekit.io/tvlk/image/imageResource/2018/04/03/1522766078678-9ce0656e6a358c385caa56f347f06208.png?tr=q-75'
                  alt='Train'
                  style={{ width: 100, height: 100 }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={11}
            direction='row'
            justify='flex-start'
            alignContent='center'
            container
          >
            <Grid
              item
              xs={12}
              container
              style={{
                backgroundColor: '#1ba0e2',
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 20,
              }}
            >
              <Grid item xs></Grid>
              <Grid item xs={4}>
                <Box component='div' className={classes.flex}>
                  <CheckIcon />
                  <Typography>Không kẹt xe</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box component='div' className={classes.flex}>
                  <CheckIcon />
                  <Typography>Giờ khởi hành & giờ đến cố định</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box component='div' className={classes.flex}>
                  <CheckIcon />
                  <Typography>Lịch chạy thường xuyên</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    default:
      break;
  }
}
