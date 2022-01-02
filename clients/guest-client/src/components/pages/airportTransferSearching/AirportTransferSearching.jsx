import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import TrainIcon from '@material-ui/icons/Train';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AirportTransferTransportationFeature from './AirportTransferTransportationFeature';
import NoVehicle from '../../commons/NoVehicle';
import SkeletonLoading from '../../commons/SkeletonLoading';
import VehiclesListManagement from '../../vehicles/VehiclesListManagement';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    marginTop: 100,
    paddingBottom: 30,
    backgroundColor: '#e5e9ed',
  },
  banner: {
    backgroundColor: '#1ba0e2',
    marginBottom: 20,
  },
  typography: {
    color: '#fff',
    marginBottom: 10,
    fontWeight: 700,
  },
  containerTabs: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 20,
  },
  block: {
    backgroundImage:
      'url(https://ik.imagekit.io/tvlk/image/imageResource/2018/10/08/1538999958318-bb50c036ab44378f08d0d3b8020366c1.png?tr=q-75)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% !important',
  },
});

function Heading() {
  const classes = useStyles();
  return (
    <Container maxWidth='xl' className={classes.banner}>
      <Container maxWidth='md' className={classes.block}>
        <Grid
          container
          direction='column'
          justify='center'
          alignContent='flex-start'
          spacing={5}>
          <Grid item xs={3} />
          <Grid item xs={7}>
            <Typography variant='h4' className={classes.typography}>
              Đến sân bay không còn mệt mỏi
            </Typography>
            <Typography variant='body1' className={classes.typography}>
              Biến chuyến đi đến và từ sân bay đi trở nên tiện lợi nhất có thể!
              Với nhiều lựa chọn phương tiện phù hợp với nhu cầu của bạn, hãy
              đặt ngay xe đưa đón sân bay hôm nay để bớt đi một nỗi lo nhé.
            </Typography>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Container>
    </Container>
  );
}

function TabPanel(props) {
  const { value, index } = props;
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === 0 && (
        <Grid container spacing={2}>
          <AirportTransferTransportationFeature feature='car' />
          <Grid item container>
            <VehiclesListManagement vehicleType='cars' />
          </Grid>
        </Grid>
      )}
      {value === 1 && (
        <Grid container spacing={2}>
          <AirportTransferTransportationFeature feature='bus' />
          <Grid item container>
            <VehiclesListManagement vehicleType='buses' />
          </Grid>
        </Grid>
      )}
      {value === 2 && (
        <Grid container spacing={2}>
          <AirportTransferTransportationFeature feature='train' />
          <Grid item container>
            <VehiclesListManagement vehicleType='trains' />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default function AirportTransferSearching({
  tab,
  day,
  time,
  cars,
  buses,
  trains,
  loading,
  departure,
  handleChangeTab,
}) {
  const classes = useStyles();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Helmet>
        <title>Đặt xe đưa đón sân bay tại Traveloka</title>
      </Helmet>
      {/* ========== Main ========== */}
      <Box component='div' className={classes.main}>
        {/* Call from function Heading above */}
        <Heading />

        {loading ? (
          <SkeletonLoading />
        ) : (
          <>
            {/* Content */}
            <Container maxWidth='md' style={{ marginBottom: 50 }}>
              <Grid container spacing={3}>
                <Grid item container>
                  {/* Information after Searching */}
                  <Grid item>
                    {!!departure && (
                      <Typography variant='h5'>Từ {departure}</Typography>
                    )}

                    <Typography variant='body1'>
                      {day} {time}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
            </Container>

            {/* Three types of transportation */}
            <Container maxWidth='sm' className={classes.containerTabs}>
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                aria-label='simple tabs example'
                centered
                scrollButtons='on'>
                <Tab
                  id='tab-car'
                  aria-controls='tabpanel-car'
                  label='Ô tô'
                  icon={<LocalTaxiIcon />}
                  selected
                  disabled={cars.length === 0}
                />
                <Tab
                  id='tab-bus'
                  aria-controls='tabpanel-bus'
                  label='Buýt trung chuyển'
                  icon={<DirectionsBusIcon />}
                  disabled={buses.length === 0}
                  focusRipple
                />
                <Tab
                  id='tab-train'
                  aria-controls='tabpanel-train'
                  label='Tàu ra sân bay'
                  icon={<TrainIcon />}
                  disabled={trains.length === 0}
                />
              </Tabs>
            </Container>

            {cars.length === 0 && buses.length === 0 && trains.length === 0 ? (
              <NoVehicle />
            ) : (
              <Container maxWidth='md'>
                <TabPanel value={tab} index={0} />
                <TabPanel value={tab} index={1} />
                <TabPanel value={tab} index={2} />
              </Container>
            )}
          </>
        )}
      </Box>
    </>
  );
}
