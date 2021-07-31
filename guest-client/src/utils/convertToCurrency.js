module.exports = function convertToCurrency(number) {
  return number.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};
