import { CircularProgress, Container } from '@material-ui/core';
import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';
import BigNotification from '../../../commons/BigNotification';
import VoucherCardView from './VoucherCardView';

export default function Vouchers({
  loading,
  vouchers,
  toggleVoucher,
  openRegistrationDialog,
}) {
  const hasVouchers = vouchers.length > 0;

  return (
    <Box
      position='absolute'
      top={0}
      width='100%'
      minHeight='100vh'
      bgcolor='#1D80C3'>
      <Container style={{ paddingTop: 110, marginBottom: 30 }}>
        {loading ? (
          <Grid
            container
            justify='center'
            alignItems='center'
            style={{ height: 'calc(100vh - 150px)' }}>
            <CircularProgress style={{ color: 'white' }} />
          </Grid>
        ) : (
          <Grid container direction='column' style={{ gap: 20 }}>
            {hasVouchers ? (
              <Grid container item spacing={2}>
                {vouchers.map((voucher) => (
                  <Grid item key={voucher._id} xs={12} md={6}>
                    <VoucherCardView
                      voucher={voucher}
                      toggleVoucher={toggleVoucher}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid item>
                <BigNotification message='You are not having any voucher at the present' />
              </Grid>
            )}
            <Grid container item justify='center'>
              <Button
                variant='contained'
                onClick={openRegistrationDialog}
                style={{ background: 'rgb(255, 94, 31)', color: 'white' }}>
                Add voucher
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
