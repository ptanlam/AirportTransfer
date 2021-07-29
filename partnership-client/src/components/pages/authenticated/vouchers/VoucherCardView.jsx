import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import convertToCurrency from '../../../../utils/convertToCurrency';

const useStyles = makeStyles({
  root: {
    padding: '0 10',
  },
});

const additionalInformationFields = [
  { label: 'Code', inputName: 'Code' },
  { label: 'Expires at', inputName: 'ExpDate' },
  { label: 'Point cost', inputName: 'PointCost' },
  { label: 'Discount', inputName: 'Discount' },
  { label: 'Remaining quantity', inputName: 'Quantity' },
  { label: 'Voucher note', inputName: 'VoucherNote' },
];

export default function VoucherCardView({ voucher, toggleVoucher }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={`${voucher.Name} ${voucher.Status ? '' : '[disabled]'}`}
        subheader={voucher.PreContent}
        action={
          <Button onClick={() => toggleVoucher(voucher._id, voucher.Status)}>
            {voucher.Status ? 'Disable' : 'Enable'}
          </Button>
        }
      />
      <img
        src={`${voucher.ImageLink}`}
        alt={voucher.Name}
        style={{ width: '100%' }}
      />
      <CardContent>
        <Grid container direction='column' style={{ gap: 15 }}>
          <Grid item>
            <Typography variant='h4' align='center'>
              {voucher.ContentHeader}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' align='center'>
              {voucher.Contents}
            </Typography>
          </Grid>
          <Grid container item spacing={1}>
            {additionalInformationFields.map((field, index) => (
              <Grid container item xs={12} md={6} key={index}>
                <Grid item xs={6}>
                  <Typography variant='caption'>{field.label}:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='caption'>
                    {voucher[field.inputName]}
                  </Typography>
                </Grid>
              </Grid>
            ))}
            <Grid container item xs={12} md={6}>
              <Grid item xs={6}>
                <Typography variant='caption'>Money discount</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption'>
                  {convertToCurrency(voucher.MoneyDiscount)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
