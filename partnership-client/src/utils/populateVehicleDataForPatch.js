export default function populateVehicleDataForPatch(transportType, data) {
  let formData = new FormData();
  formData.append('name', checkNull(data.name));
  formData.append('photo', data.photo?.[0] || null);
  formData.append('oldPhotoKey', data.oldPhotoKey);
  formData.append('classId', checkNull(data.class));

  if (transportType === 'buses') {
    formData.append('ticketPrice', checkNull(data.ticketPrice));
    formData.append('guestQuantity', checkNull(data.guestQuantity));
  } else if (transportType === 'cars') {
    formData.append('luggagePayload', checkNull(data.luggagePayload));
    formData.append('guestQuantity', checkNull(data.guestQuantity));
    formData.append('standardPricePerKm', checkNull(data.standardPricePerKm));
    formData.append('city', checkNull(data.city));
    formData.append('country', checkNull(data.country));
  } else if (transportType === 'flights') {
    formData.append('guestQuantity', checkNull(data.guestQuantity));
  } else {
    formData.append('ticketPrice', checkNull(data.ticketPrice));
  }

  return formData;
}

function checkNull(data) {
  if (data !== null) return data;
  return '';
}
