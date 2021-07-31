import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AccountManagement from './account/AccountManagement';
import MyBookingManagement from './myBooking/MyBookingManagement';
import { useLocation } from 'react-router-dom';
import VouchersManagement from './voucher/VouchersManagement';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'center',
    height: 'auto',
    marginTop: 120,
    padding: 10,
  },
});

export default function Profile() {
  const { pathname } = useLocation();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabPanel = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return (
          <Box p={3} minHeight='80vh'>
            <AccountManagement />
          </Box>
        );
      case 1:
        return (
          <Box p={3} minHeight='80vh'>
            <MyBookingManagement />
          </Box>
        );
      case 2:
        return (
          <Box p={3} minHeight='80vh'>
            <VouchersManagement />
          </Box>
        );
      default:
        return <Box p={3} height='80vh'></Box>;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box component='div' className={classes.box}>
      <Container>
        <Grid container>
          <Grid item xs={3}>
            <Tabs orientation='vertical' value={value} onChange={handleChange}>
              <Tab label='Tài khoản' />
              <Tab label='Đặt chỗ của tôi' />
              <Tab label='Voucher của tôi' />
            </Tabs>
          </Grid>
          <Grid item xs={9}>
            {renderTabPanel(value)}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
