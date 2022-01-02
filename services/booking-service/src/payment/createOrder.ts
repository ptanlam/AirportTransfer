import paypal from '@paypal/checkout-server-sdk';

let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

let request = new paypal.orders.OrdersCreateRequest();
request.requestBody({
  intent: 'CAPTURE',
  purchase_units: [
    {
      amount: {
        currency_code: 'USD',
        value: '100.00',
      },
    },
  ],
});
let createOrder = async function () {
  let response = await client.execute(request);
  console.log(`Response: ${JSON.stringify(response)}`);
  console.log(`Order: ${JSON.stringify(response.result)}`);
};

export default createOrder();
