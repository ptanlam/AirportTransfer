export default function populateVehicleDataForPost(transportType, data) {
  let formData = new FormData();
  formData.append('photo', data.photo[0]);
  formData.append('name', data.name);
  formData.append('partnerId', data.partnerId);
  formData.append('classId', data.class);

  if (transportType === 'cars') {
    formData.append('luggagePayload', data.luggagePayload);
    formData.append('guestQuantity', data.guestQuantity);
    formData.append('standardPricePerKm', data.standardPricePerKm);
    formData.append('city', data.workingPlace.city);
    formData.append('country', data.workingPlace.country);
    formData.append('details', JSON.stringify(data.cars));
  } else if (transportType === 'buses') {
    formData.append('ticketPrice', data.ticketPrice);
    formData.append('guestQuantity', data.guestQuantity);
  } else if (transportType === 'flights') {
    formData.append('guestQuantity', data.guestQuantity);
  } else {
    formData.append('ticketPrice', data.ticketPrice);
  }

  return formData;
}
