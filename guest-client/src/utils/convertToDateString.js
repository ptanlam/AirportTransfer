export default function convertToDateString(data) {
    return `${new Date(data).toLocaleDateString()}`;
  }