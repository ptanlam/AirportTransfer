import { makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import Paypal from '../../commons/Paypal';

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    height: '100vh',
    marginTop: 100,
    padding: 30,
    background: '#e6eaed',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30,
  },
});



export default function CheckoutForm({
  totalPrice,
  handlePayment,
}) {
  const classes = useStyles();
  const usd = parseFloat(totalPrice / 23000).toFixed(2);
  return (
    <Grid item container spacing={5}>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Thanh toán bằng Paypal</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.flex}>
            <Paypal value={usd} handlePayment={handlePayment} />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}
