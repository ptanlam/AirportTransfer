import { Box, Grid, Typography } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box bgcolor='#1D80C3' minHeight='100vh' position='absolute' top={0} clone>
      <Grid container justify='center' alignItems='center' direction='column'>
        <Grid item>
          <Typography
            variant='h3'
            style={{ color: 'white', fontWeight: 'bold' }}>
            Working on it...
          </Typography>
        </Grid>
        <Grid item>
          <NavLink to='/' style={{ textDecoration: 'none' }}>
            <Grid container spacing={2}>
              <Grid item>
                <Home
                  style={{
                    color: 'white',
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Back to home
                </Typography>
              </Grid>
            </Grid>
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
}
