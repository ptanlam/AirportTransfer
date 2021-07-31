import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import bookingActions from '../../redux/actions/bookingActions';

const PayPalButton = window.paypal.Buttons.driver('react', {
  React,
  ReactDOM,
});

function Paypal({ value, handlePayment }) {
  const total = parseFloat(value);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: 'Payment',
          amount: {
            value: total,
          },
        },
      ],
    });
  };
  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      const captureId = order.purchase_units[0].payments.captures[0].id;
      await handlePayment(captureId);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  fillBookingForm: bookingActions.fillBookingForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Paypal);
