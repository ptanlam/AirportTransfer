export default function populatePartnerInformationForPost(data, transportType) {
  let formData = new FormData();
  formData.append('email', data.email);
  formData.append('logo', data.logo[0]);
  formData.append('password', data.password);
  formData.append('companyName', data.companyName);
  formData.append('companyEmail', data.companyEmail);
  formData.append('transportType', data.transportType);
  formData.append('companyHotline', data.companyHotline);
  formData.append('presenterLastName', data.presenterLastName);
  formData.append('presenterFirstName', data.presenterFirstName);
  formData.append('presenterPhoneNumber', data.presenterPhoneNumber);
  formData.append('classes', JSON.stringify(data.classes));
  formData.append('exchangePolicies', JSON.stringify(data.exchangePolicies));
  formData.append(
    'cancellationPolicies',
    JSON.stringify(data.cancellationPolicies),
  );
  return formData;
}
