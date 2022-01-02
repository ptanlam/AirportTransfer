export default function convertToDateTimeString(data) {
  return `${new Date(data).toLocaleTimeString()}`;
}

