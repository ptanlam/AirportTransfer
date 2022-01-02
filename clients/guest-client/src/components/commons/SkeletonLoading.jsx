import { Box, Container, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

export default function SkeletonLoading() {
  return (
    <Container maxWidth='md'>
      <Box minHeight='50vh' width='100%'>
        <Grid container direction='column' style={{ gap: 30 }}>
          {[...Array(3)].map((_, index) => (
            <Grid container item spacing={3} key={index}>
              <Grid item xs>
                <Box style={{ width: '100%', height: '100%' }}>
                  <Skeleton
                    variant='rect'
                    height='100%'
                    style={{ borderRadius: 20 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box style={{ width: '100%', height: '100%' }}>
                  <Skeleton width='100%' height={30} />
                  <Skeleton width='100%' height={15} />
                  <Skeleton width='80%' height={25} />
                  <Skeleton width='50%' height={20} />
                </Box>
              </Grid>
              <Grid item xs>
                <Box style={{ width: '100%', height: '100%' }}>
                  <Skeleton
                    variant='rect'
                    height='100%'
                    style={{ borderRadius: 20 }}
                  />
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
