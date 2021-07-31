import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CountDownTimer from "../../../commons/CountDownTimer";
import Paypal from '../../../commons/Paypal';


export default function PaymentForm({ handlePayment, totalPrice }) {
  const usd = parseFloat(totalPrice / 23000).toFixed(2);
  return (
    <Container maxWidth='md'>
      <Typography>Thanh toán bằng Paypal</Typography>
      <CountDownTimer/>
      <Paypal value={usd} handlePayment={handlePayment} />
    </Container>
  );
}
