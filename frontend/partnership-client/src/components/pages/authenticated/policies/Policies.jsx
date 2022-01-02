import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import PolicyCardView from './PolicyCardView';
import BigNotification from '../../../commons/BigNotification';

const useStyles = makeStyles({
  title: {
    padding: 5,
    background: 'white',
    fontWeight: 'bold',
    borderRadius: 50,
  },
});

export default function Policies({
  classes,
  exchangePolicies,
  cancellationPolicies,
  handleOpenEditDialog,
  handleOpenRemovalDialog,
  handleOpenRegistrationDialog,
}) {
  const uiClasses = useStyles();

  return (
    <Box
      position='absolute'
      top={0}
      width='100%'
      minHeight='100vh'
      bgcolor='#1D80C3'>
      <Container style={{ paddingTop: 110, marginBottom: 30 }} maxWidth='md'>
        {classes.length > 0 ? (
          <Grid container spacing={2}>
            <Grid
              container
              item
              xs={12}
              md={6}
              direction='column'
              style={{ gap: 20 }}>
              <Grid item>
                <Typography
                  className={uiClasses.title}
                  align='center'
                  variant='h5'>
                  EXCHANGE POLICIES
                </Typography>
              </Grid>
              <Grid container item direction='column' style={{ gap: 10 }}>
                {exchangePolicies.map((policy) => (
                  <Grid item key={policy.id}>
                    <PolicyCardView
                      policy={policy}
                      handleOpenEditDialog={handleOpenEditDialog}
                      handleOpenRemovalDialog={handleOpenRemovalDialog}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid container item justify='center'>
                <Button
                  onClick={() => handleOpenRegistrationDialog('exchange')}
                  variant='contained'
                  style={{
                    background: '#FF5E1F',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Add exchange policy
                </Button>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              md={6}
              direction='column'
              style={{ gap: 20 }}>
              <Grid item>
                <Typography
                  className={uiClasses.title}
                  align='center'
                  variant='h5'>
                  CANCELLATION POLICIES
                </Typography>
              </Grid>
              <Grid container item direction='column' style={{ gap: 10 }}>
                {cancellationPolicies.map((policy) => (
                  <Grid item key={policy.id}>
                    <PolicyCardView
                      policy={policy}
                      handleOpenEditDialog={handleOpenEditDialog}
                      handleOpenRemovalDialog={handleOpenRemovalDialog}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid container item justify='center'>
                <Button
                  onClick={() => handleOpenRegistrationDialog('cancellation')}
                  variant='contained'
                  style={{
                    background: '#FF5E1F',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Add cancellation policy
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <BigNotification message='Please add at least 1 class before adding policies!' />
        )}
      </Container>
    </Box>
  );
}
