import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import VoucherCardView from './VoucherCardView';

export default function VouchersList({ loading, vouchers, onBuyVoucherClick }) {
  return (
    <Grid container direction='column' style={{ gap: 20 }}>
      {loading ? (
        <Grid container item justify='center'>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid container item justify='center'>
            <Button
              variant='contained'
              onClick={onBuyVoucherClick}
              style={{
                background: '#ff660b',
                color: 'white',
                fontWeight: 'bold',
              }}>
              Mua voucher
            </Button>
          </Grid>
          {vouchers.length === 0 ? (
            <Grid container item justify='center'>
              <Typography variant='h5' style={{ color: 'black' }}>
                Bạn đang không có voucher nào
              </Typography>
            </Grid>
          ) : (
            vouchers.map((voucher) => (
              <Grid item key={voucher.id}>
                <VoucherCardView voucher={voucher} />
              </Grid>
            ))
          )}
        </>
      )}
    </Grid>
  );
}
