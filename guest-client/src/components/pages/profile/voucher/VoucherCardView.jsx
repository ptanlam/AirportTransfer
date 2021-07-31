import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 250,
  },
}));

export default function VoucherCardView({ voucher }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={voucher.ImageLink}
        title={voucher.TenVoucher}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            component='h4'
            variant='h5'
            color={voucher.Status ? 'textPrimary' : 'textSecondary'}>
            {voucher.TenVoucher} {voucher.Status ? '' : '[đã sử dụng]'}
          </Typography>
          <Typography variant='subtitle2'>
            Code:{' '}
            <Typography
              variant='caption'
              style={{
                backgroundColor: '#30c5f7',
                padding: '5px 20px',
                borderRadius: '5px',
                color: 'white',
                fontWeight: 'bold',
              }}>
              {voucher.Code}
            </Typography>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
