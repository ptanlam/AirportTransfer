import React from 'react';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import RegistrationFeatures from './RegistrationFeatures';
import RegistrationFormManagement from './registrationForm/RegistrationFormManagement';

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    justify: 'center',
    alignItems: 'center',
  },
  main: {
    background: 'linear-gradient(180deg, #1ba0e2 0%, #1ba0e2 50%, #0770cd 80%)',
    marginTop: 100,
    padding: 50,
  },
  form: {
    minHeight: 350,
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(8px)',
    borderRadius: 30,
    border: '1px solid #1ba0e2',
    padding: 30,
  },
});

export default function Registration() {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Đăng ký thành viên Traveloka!</title>
      </Helmet>
      {/* ========== Main ========== */}
      <Box component='div' className={classnames(classes.main, classes.flex)}>
        <Container>
          <Grid container spacing={5}>
            {/* Features */}
            <RegistrationFeatures />
            {/* Registration */}
            <Grid item xs container alignItems='center'>
              <Box
                component='div'
                className={classnames(classes.flex, classes.form)}
              >
                <Grid container direction='column' justify='center' spacing={5}>
                  <Grid item xs container justify='center'>
                    <Typography variant='h6'>
                      Đăng ký thành viên Traveloka!
                    </Typography>
                    {/* Registration Form */}
                    <RegistrationFormManagement />
                    <Typography>
                      Bằng việc đăng ký, tôi đồng ý với các{' '}
                      <NavLink to='' style={{ color: 'white' }}>
                        Điều khoản & Điều kiện
                      </NavLink>{' '}
                      và{' '}
                      <NavLink to='' style={{ color: 'white' }}>
                        Chính sách về quyền riêng tư
                      </NavLink>{' '}
                      của traveloka
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
